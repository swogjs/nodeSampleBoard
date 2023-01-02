import Component from "../core/Compnent.js";
import Header from "./Header.js";
import Posts from "./Posts.js";
import Pagination from "./PagiNation.js";

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
        const $pagination = this.$el.querySelector('[data-component="pagination"]');


        new Header($header);
        new Posts($posts, this.$state);
        new Pagination($pagination, this.$state);
    }
    async getPosts(page=1) {
        const response = await fetch('/api/board/getPosts', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({page: page, pageSize: 5}),
        });
        const data = await response.json();
        this.setState({posts: data.payload , page: data.page, totalPage: data.totalPage});
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
        // Edit
        if(target.dataset.boardKey != -1) {
            const post = board.$state.posts.find(post=>post.$loki==target.dataset.boardKey);
            post.subject = subject.value;
            post.contents = contents.value;
            const response = await fetch('/api/board/editPost', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });
            if(response.ok) {
                const modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#writeModal'));
                modal.hide();
                board.getPosts();
            } else {
                board.alert(response.text());
            }
        } 
        // Add
        else {
            const post = { 'subject': subject.value, contents: contents.value};
            const response = await fetch('/api/board/addPost', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });
            if(response.ok) {
                const modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#writeModal'));
                modal.hide();
                board.getPosts();
            } else {
                board.alert(response.text());
            }
        }
        

    }
    setEvent() {
        this.addEvent('click', '#btnSave', this.save.bind(this));

        this.addEvent('show.bs.modal', '#writeModal', (event) => {
            // Button that triggered the modal
            const button = event.relatedTarget
            // Extract info from data-bs-* attributes
            const recipient = button.getAttribute('data-bs-whatever')
            const modalTitle = document.querySelector('#writeModal').querySelector('.modal-title');
            const subject = document.querySelector('#writeModal').querySelector('.modal-body input');
            const contents = document.querySelector('#writeModal').querySelector('.modal-body textarea');
            const btnSave = document.querySelector('#writeModal').querySelector('#btnSave');
            
            modalTitle.textContent = recipient;
            if(recipient == '글수정') {
                const post = this.$state.posts.find(post=>post.$loki==button.dataset.boardKey);
                subject.value = post.subject;
                contents.value = post.contents;
                btnSave.dataset['boardKey'] = button.dataset.boardKey;
            } else {
                subject.value = '';
                contents.value = '';
                btnSave.dataset['boardKey'] = -1;
            }
          })
    }

}
