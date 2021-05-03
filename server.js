const express=require('express');
const path=require('path');
const hbs=require('hbs');
const mongoose=require('mongoose');
const Article=require('./models/article')
const articleRoute=require('./routes/articles')
const app=express();
    mongoose.connect('mongodb://localhost/blogs',
    { useNewUrlParser: true,useUnifiedTopology: true});

const connection=mongoose.connection;
connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
}).on('error',()=>{
      console.error('error here');
})

app.use(express.urlencoded({extended:false}))
app.use('/articles',articleRoute);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
hbs.registerPartials(path.join(__dirname,'views/partials'))
// Article.collection.deleteMany();
app.get('/',async (req,res)=>{
    let article= await Article.find({});
    console.log(article);
    res.render('index',{text:article})
})

app.listen(process.env.PORT||3000,()=>{
});