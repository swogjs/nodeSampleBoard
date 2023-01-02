const express = require('express');
const router = express.Router();
const boardServie = require('../service/boardService');

router.post('/board/getPosts', boardServie.getPosts);
router.post('/board/addPost', boardServie.addPost);
router.put('/board/editPost', boardServie.editPost);
router.delete('/board/deletePost', boardServie.deletePost);

module.exports = router;