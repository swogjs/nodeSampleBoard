import Component from "../core/Compnent.js";
import Header from "./Header.js";
import Posts from "./Posts.js";

export default class Board extends Component {
    setup() {
        this.$state = {posts: []};
        window.board = this;
        this.getPosts();
    }

    async template() {
        const html = await fetch('/views/board/board.html');
        return html.text();
    }
    // mounted에서 자식 컴포넌트를 마운트 해줘야 한다.
    mounted() {
        const $header = this.$el.querySelector('[data-component="header"]');
        const $posts = this.$el.querySelector('[data-component="posts"]');

        new Header($header);
        new Posts($posts, this.$state);
    }
    async getPosts() {
        const response = await fetch('/api/board/getPosts');
        const data = await response.json();
        console.log(data.payload)
        this.setState({posts: data.payload});
        console.log(this.$state)
    }
    async save({target}) {
        const subject = target.parentNode.parentNode.querySelector('#subject');
        const contents = target.parentNode.parentNode.querySelector('#contents');
        if(subject.value.trim().length == 0) {
            board.alert('제목을 입력해주세요');
            subject.focus();
            return;
        }
        if(contents.value.trim().length == 0) {
            board.alert('내용을 입력해주세요');
            contents.focus();
            return;
        }
        const response = await fetch('/api/board/addPost', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'subject': subject.value, contents: contents.value}),
        });
        if(response.ok) {
            const modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#writeModal'));
            modal.hide();
            board.getPosts()
        } else {
            board.alert(response.text());
        }

    }
    setEvent() {
        this.addEvent('click', '#btnSave', this.save.bind(this));

        this.addEvent('show.bs.modal', '#writeModal', (event) => {
            // Button that triggered the modal
            var button = event.relatedTarget
            // Extract info from data-bs-* attributes
            var recipient = button.getAttribute('data-bs-whatever')
            // If necessary, you could initiate an AJAX request here
            // and then do the updating in a callback.
            //
            // Update the modal's content.
            var modalTitle = document.querySelector('#writeModal').querySelector('.modal-title')
            var subject = document.querySelector('#writeModal').querySelector('.modal-body input')
            var contents = document.querySelector('#writeModal').querySelector('.modal-body textarea')
          
            modalTitle.textContent = recipient;
            subject.value = '';
            contents.value = '';
          })
    }

}
