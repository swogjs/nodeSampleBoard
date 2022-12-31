import Index from './components/Index.js';
import Board from './components/Board.js';
import LoginForm from './components/LoginForm.js';

const app = document.querySelector('#app');

console.log('location.pathname : ', location.pathname);

switch(location.pathname) {
    case '/loginForm':
        new LoginForm(app);
        break;
    case '/board':
    case '/board/':
        new Board(app);
        break;
    default:
        new Index(app);
}