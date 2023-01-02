import Component from "../core/Compnent.js";

export default class Pagination extends Component {
    template() {
        const { page, totalPage } = this.props;
        const blockPage = [];
        const currentPage = page;
        const startPage = parseInt(page) - (totalPage == page ? 2 : 1) > 1 ? parseInt(page) - (totalPage == page ? 2 : 1) : 1;
        const endPage = parseInt(page) + (page == 1 ? 2 : 1) >  parseInt(totalPage)? parseInt(totalPage) : parseInt(page)+(page == 1 ? 2 : 1);
        for(let i = startPage; i <= endPage; i++) {
            blockPage.push(i)
        }
        return `
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous" >
                        <span aria-hidden="true" data-page="1">&laquo;</span>
                    </a>
                </li>
                <!-- <li class="page-item"><a class="page-link" href="#" tabindex="-1" aria-disabled="true">...</a></li> -->
                ${blockPage.map(page=>{
                return `
                    <li class="page-item ${page == currentPage ? 'active': ''}" ${page == currentPage ? 'aria-current="page"': ''}>
                        <a class="page-link" href="#" data-page="${page}">${page}</a>
                    </li>
                    `
                }).join('\n')}
                <!-- <li class="page-item"><a class="page-link" href="#" tabindex="-1" aria-disabled="true">...</a></li> -->
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next" >
                        <span aria-hidden="true" data-page="${totalPage}">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>        
        `
    }

    setEvent() {
        this.addEvent('click', 'li.page-item', ({target})=>{
            board.getPosts(target.dataset.page);
        })
    }
}