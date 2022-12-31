import Component from "../core/Compnent.js";
import Header from "./Header.js";
import Posts from "./Posts.js";

export default class Board extends Component {
    setup() {
        this.$state = {posts: []};
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
    setEvent() {}

}
