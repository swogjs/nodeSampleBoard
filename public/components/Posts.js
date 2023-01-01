import Component from "../core/Compnent.js";

export default class Posts extends Component {
    template() {
        const { posts } = this.props;
        if(posts.length === 0) {
            return `
            <p></p>
            <figure class="text-center">
                <blockquote class="blockquote">
                    <p>등록된 게시글이 없습니다.</p>
                </blockquote>
            </figure>
            `
        }
        return `<p></p>
        ${posts.map((post, index)=>{
            return `            
            <div class="accordion-item">
                <h2 class="accordion-header" id="heading_${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#item_${index}" aria-expanded="true" aria-controls="item_${index}">
                    ${post.subject}
                </button>
                </h2>
                <div id="item_${index}" class="accordion-collapse collapse" aria-labelledby="heading_${index}" data-bs-parent="#boardList">
                <div class="accordion-body">
                    ${post.contents}
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