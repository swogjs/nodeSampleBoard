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
                    Accordion ${post}
                </button>
                </h2>
                <div id="item_${index}" class="accordion-collapse collapse" aria-labelledby="heading_${index}" data-bs-parent="#boardList">
                <div class="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
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