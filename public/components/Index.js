import Component from "../core/Compnent.js";
export default class Index extends Component {
    setup() {
        this.$state = {
            menus:[
                {name: '로그인폼', url:'/loginForm'},
                {name: '게시판', url:'/board'}
            ]
        }
    }
    async template() {
        return `
        <div class="container">
            <div class="container-fluid">
                <div class="row text-center">
                    <h1>메뉴</h1>
                </div>
                <div class="row">
                    <div class="list-group list-group-flush">
                    ${this.$state.menus.map((menu)=>{
                        return `
                        <a href="${menu.url}" class="list-group-item list-group-item-action">
                            ${menu.name}
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </span>                    
                        </a>
                        `
                    }).join('')}
                    </div>
                </div>
            <div>
        </div>
        `;
    }
    setEvent() {

    }
}