const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 8001);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, 'public')
    });
});

module.exports = app;