const express = require('express');
const app = express();
const articleRouter = require('./routes/articles');
const mongoose = require('mongoose');
const Article = require('./models/article')

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.get('/', async (req, res) => {
    // res.send('Hello Munib')
    // const articles = [{
    //     title: 'Test Article Title',
    //     data: new Date,
    //     description: "loremOfficia minim minim adipisicing ex minim. Tempor labore veniam mollit aliqua cillum est incididunt nulla quis. Incididunt occaecat magna eiusmod veniam anim do. Do esse eu laborum pariatur irure deserunt minim commodo minim. Minim aliqua ipsum labore aliquip aliqua."
    // },
    // {
    //     title: 'Test Article Title 2',
    //     data: new Date,
    //     description: 'Ea enim cillum elit ex excepteur. Fugiat commodo aliquip voluptate incididunt aliquip sint. Exercitation eu cillum ex anim elit labore ullamco labore magna. Description 2'
    // }
    // ];
    const articles = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: articles });
})

app.use('/articles', articleRouter);

app.listen(5000);