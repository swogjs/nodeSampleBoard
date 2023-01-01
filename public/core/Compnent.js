import { observable, observe } from './observer.js';

export default class Component {
    $target;
    $props;
    $state;
    constructor ($el, props) {
      this.$el = $el;
      this.props = props; // $props 할당
      this.setup();
      this.setEvent();
      this.render();
      window.app = this;
    }
    setup () {
        this.state = observable(this.initState()); // state를 관찰한다.
        observe(() => { // state가 변경될 경우, 함수가 실행된다.
        this.render();
        this.mounted();
        });
    };
    initState() { return {} }
    mounted () {};
    template () { return ''; }
    async render () {
      this.$el.innerHTML = await this.template();
      this.mounted(); // render 후에 mounted가 실행 된다.
    }
    setEvent () {}
    setState (newState) {
        this.$state = { ...this.$state, ...newState };
        this.render();
      }
    addEvent (eventType, selector, callback) {
        const children = [ ...this.$el.querySelectorAll(selector) ]; 
        // selector에 명시한 것 보다 더 하위 요소가 선택되는 경우가 있을 땐
        // closest를 이용하여 처리한다.
        const isTarget = (target) => children.includes(target) || target.closest(selector);

        const fnEvent = event => {
        if (!isTarget(event.target)) return false;
            callback(event);
        }
        this.$el.addEventListener(eventType, fnEvent);
      }
      alert(msg) {
        const alertModalHtml = `
        <!-- Modal -->
        <div class="modal fade" id="alertModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="alertModalLabel">
                  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                  <strong class="me-auto">Alert</strong>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                ${msg}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        `;
        const alertModal = document.querySelector('#alertModal');
        if(!alertModal) {
          document.querySelector('body').insertAdjacentHTML('afterbegin' , alertModalHtml);
          document.querySelector('#alertModal').addEventListener('hidden.bs.modal', function ({target}) {
            document.querySelector('#alertModal').remove();
          })
          bootstrap.Modal.getOrCreateInstance(document.querySelector('#alertModal')).show();
        } 
        
      }
  }