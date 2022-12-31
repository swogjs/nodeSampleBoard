const express = require('express');
const path = require('path');
const routes = require('./routes/page.js');
const app = express();
app.set('port', process.env.PORT || 8001);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', routes);

// 404
app.use((req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, 'public')
    });
});

// error handler
app.use((err, req, res, next) => {
    res.status = 200;
    res.json({status: res.status, msg: err.massage});
})

module.exports = app;