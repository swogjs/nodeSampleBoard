const lokijs = require('lokijs');
const db = new lokijs('db/board.json', {
    autoload: true,
    autoloadCallback: databaseInit,
    autosave: true,
    autosaveInterval: 4000
})

function databaseInit() {
    let collection;
    if(db.getCollection('board')) {
        collection = db.getCollection('board');
    } else {
        collection = db.addCollection('board');
    }
}

boardService = {
    getPosts: (req, res) => {
        const {page=1, pageSize=5} = req.body;
        const collection = db.addCollection('board');
        let totalPage = parseInt(collection.data.length/pageSize);
        if(parseInt(collection.data.length%pageSize) > 0) {
            totalPage++;
        }
        const startIndex = (page -1) * pageSize;
        const endIndex = (startIndex + pageSize) -1 < pageSize ? pageSize: (startIndex + pageSize);
        res.json({
            status:200, 
            payload: collection.chain().simplesort('$loki', true).data().slice(startIndex, endIndex), 
            page: page, 
            pageSize: pageSize, 
            totalPage: totalPage
        });
    },

    addPost: (req, res) => {
        const {subject, contents} = req.body;
        const collection = db.addCollection('board');
        collection.insert({subject: subject, contents: contents});
        res.json({status:200, msg: 'ok'});
    },

    editPost: (req, res) => {
        const collection = db.addCollection('board');
        collection.update(req.body);
        res.json({status:200, msg: 'ok'});
    },

    deletePost: (req, res) => {
        const collection = db.addCollection('board');
        collection.remove(req.body);
        res.json({status:200, msg: 'ok'});
    },
}

module.exports = boardService;