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
                        ${post.contents.replace(/\n/gi, '<br>')}
                    </div>
                    <div class="container">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end fixed_layout_btn">
                            <button class="btn btn-outline-warning me-md-2 btn-sm" type="button" id="btnEdit" data-bs-toggle="modal" data-bs-target="#writeModal" data-bs-whatever="글수정" data-board-key="${post.$loki}">수정</button>
                            <button type="button" class="btn btn-outline-secondary btn-sm" id="btnDelete" data-board-key="${post.$loki}">삭제</button>
                        </div>
                    </div>
                    <p></p>
                </div>
            </div>
            `;
        }).join('')}
        `;
    }
    setEvent() {
        this.addEvent('click', '#btnDelete' , async ({target})=>{
            const response = await fetch('/api/board/deletePost', {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ '$loki': target.dataset.boardKey}),
            });
            if(response.ok) {
                board.getPosts();
            }else{
                board.alert(response.text());
            }
        })
    }
}