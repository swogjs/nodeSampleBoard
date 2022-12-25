import Component from "../core/Compnent.js";
import Header from "./Header.js";
import Posts from "./Posts.js";

export default class Board extends Component {
    setup() {
        this.$state = {posts: ['item1', 'item2']};
    }

    template() {
        return `
        <header data-component="header"></header>
        <p></p>
        <div class="container-fluid">
            <div class="accordion" id="boardList" data-component="posts"></div>
        </div>
        `
    }
    // mounted에서 자식 컴포넌트를 마운트 해줘야 한다.
    mounted() {
        const $header = this.$el.querySelector('[data-component="header"]');
        const $posts = this.$el.querySelector('[data-component="posts"]');

        new Header($header);
        new Posts($posts, this.$state);
    }
    setEvent() {}

}
