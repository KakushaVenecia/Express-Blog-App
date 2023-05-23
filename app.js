const express = require('express');
const morgan = require ('morgan');
const mongoose = require ('mongoose')
const blogRoutes = require('./routes/blogRoutes')
require('dotenv').config();

const app = express();
const port = process.env.PORT

// connect to mongo db
mongoose.connect
(process.env.dbURI, 
    {useNewUrlParser: true, 
    useUnifiedTopology:true, 
    dbName:process.env.dbNAME })
.then((result)=> app.listen (port, ()=>{
    console.log(`Server is listening on port ${port}`);
}))
.catch((err)=> console.log(err));

// register view engine 
app.set('view engine', 'ejs');


// MIDDLEWARE AND STATIC FILES
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true}));
app.use(morgan('dev'));

app.get('/', (req, res)=>{
   res.render('about', { title:'About This App' });
});
    
app.get('/all-blogs', (req, res)=>{
    res.redirect('/blogs')
});

// blog routes
app.use('/blogs', blogRoutes)

// 404 
app.use((req, res)=>{
    res.status(404).render('404', { title:'404' });
});

