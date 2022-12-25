import Component from "../core/Compnent.js";

export default class Posts extends Component {
    template() {
        const { posts } = this.props;

        return `
        ${posts.map((post, index)=>{
            return `
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading_${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#item_${index}" aria-expanded="true" aria-controls="item_${index}">
                    게시글 ${post}
                </button>
                </h2>
                <div id="item_${index}" class="accordion-collapse collapse" aria-labelledby="heading_${index}" data-bs-parent="#boardList">
                <div class="accordion-body">
                    게시글 내용
                </div>
                </div>
            </div>
            `;
        }).join('')}
        `;
    }
    setEvent() {

    }
}