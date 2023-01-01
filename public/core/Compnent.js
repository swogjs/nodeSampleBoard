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
        const toastHtml = `
        <div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center align-items-center w-100"
          style="top: 0;position: absolute;height: 100%;left: 0;z-index: 9999;opacity: 0.7;background-color: #b1b1b1;"
        >
            <!-- Then put toasts within -->
            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                    <strong class="me-auto">Alert</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body text-center">
                    ${msg}
                </div>
            </div>
        </div>        
        `;
        const toastEl = document.querySelector('.toast');
        if(!toastEl) {
          document.querySelector('body').insertAdjacentHTML('afterbegin' , toastHtml);
          document.querySelector('.toast').addEventListener('hidden.bs.toast', function ({target}) {
            document.querySelector('.toast').parentNode.remove();
            // document.querySelector('.toast').parentNode.setAttribute('style', 'top: 0;position: absolute;height: 100%;left: 0;z-index: -1;')
          })
          bootstrap.Toast.getOrCreateInstance(document.querySelector('.toast')).show();
        } 
        
      }
  }