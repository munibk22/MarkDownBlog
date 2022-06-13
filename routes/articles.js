const express = require('express');
const article = require('./../models/article');
const router = express.Router();
const Article = require('./../models/article');

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
});
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    // let article = new Article({
    //     title: req.body.title,
    //     description: req.body.description,
    //     markdown: req.body.markdown
    // })
    if (article == null) res.redirect('/');
    res.render('articles/shows', { article: article });
    // res.send(req.params.id);
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        article = await article.save();
        res.redirect(`/articles/${article.slug}`);
    } catch (error) {
        console.log(error);
        res.render('articles/new', { article: article });
    }

})

router.delete('/:id', async (req, res) => {
    const deletePost = await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

module.exports = router;