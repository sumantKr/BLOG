const express = require('express');
const article = require('../models/article');
const router = express.Router();
const Article = require('../models/article');
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})
router.get('/:id/edit', (req, res) => {

    article.findById(req.params.id, (err, docs) => {
        if (!err) {
            let edited = {
                id: docs.id,
                title: docs.title,
                description: docs.description,
                markdown: docs.markdown
            }
            res.render('articles/new', { article: edited });
        }
        else {
            console.log(err);
        }

    })
})
router.get('/:id/delete', (req, res) => {

    article.deleteOne({_id:req.params.id}, (err, docs) => {
        if (!err) {
            res.render('index', { article: docs });
            res.redirect('/');
        }
        else {
            console.log(err);
        }

    })
})
router.get('/:id', (req, res) => {
    article.findById(req.params.id, (err, docs) => {
        if (!err) {
            console.log(docs);
            res.render('articles/show', { article: docs });

        }
        else {
            console.log(err);
        }

    })
})
router.post('/', async (req, res) => {

    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,

    })
    try {

        article.save();

        res.redirect('/');
    }
    catch (e) {
        // console.log(e)
        res.render('articles/new', { article: article });
    }
});

module.exports = router;