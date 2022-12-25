import Component from "../core/Compnent.js";
export default class LoginForm extends Component {
    async template() {
        const html = await fetch('/views/auth/loginForm.html');
        return html.text();
    }
    setEvent() {

    }
}