const app = require('./app');
const winston = require('./config/winston');

app.listen(app.get('port'), ()=>{
    winston.info(`${app.get('port')} 포트에서 대기중`);
});