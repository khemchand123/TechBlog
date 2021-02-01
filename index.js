const path = require('path')
const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//database
const db = require('./database/db')

const User = require('./routes/user')
const Admin = require('./routes/admin')

const app = express();
const PORT = process.env.PORT || 5000;


//middleware
app.use(cookieParser())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressEjsLayouts)

app.use(express.static(path.join(__dirname,'/assists')))

//template set
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

//routes
app.use('/user', User)
app.use('/admin', Admin)

//default route
app.get('/' , (req, res)=>{
    res.redirect('/user/index')
})
//searching here
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Blog = require('./models/Blog')
app.get('/result', async (req, res)=>{
    const title = req.query.search;
    const blogs = await Blog.findAll({
        where:{
            title: {
                [Op.like]: '%'+title+'%',
            }
        }
    })
    console.log(blogs)
    res.render('index', {
        blogs
    })
})
//

app.listen(PORT, () => { console.log(`Server is running at port : ${PORT}`)})



