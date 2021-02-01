const express = require('express')

const router = express.Router();
const user_controller = require('../controllers/user_controller');
const User = require('../models/User')
const Blog = require('../models/Blog')
const auth = require('../middleware/auth')

router.get('/profile', auth, user_controller.user_profile)

router.get('/sign_up', user_controller.user_sign_up)

router.post('/create', user_controller.user_create);

router.get('/sign_in', user_controller.user_sign_in)

router.post('/login', user_controller.user_login);

router.get('/logout', user_controller.user_logout)

router.get('/index', user_controller.user_index)

//html
router.get('/index/html', async(req, res)=>{
    const blogs = await Blog.findAll({
        where:{
            category: 'HTML'
        }
    })
    res.render('index', {blogs})
})

//css
router.get('/index/css', async(req, res)=>{
    const blogs = await Blog.findAll({
        where:{
            category: 'CSS'
        }
    })
    res.render('index', {blogs})
})

//javascript
router.get('/index/javascript', async(req, res)=>{
    const blogs = await Blog.findAll({
        where:{
            category: 'JavaScript'
        }
    })
    res.render('index', {blogs})
})

//nodejs
router.get('/index/nodejs', async(req, res)=>{
    const blogs = await Blog.findAll({
        where:{
            category: 'NodeJs'
        }
    })
    res.render('index', {blogs})
})

//postgresql
router.get('/index/postgresql', async(req, res)=>{
    const blogs = await Blog.findAll({
        where:{
            category: 'PostgreSQL'
        }
    })
    res.render('index', {blogs})
})

//react
router.get('/index/react', async(req, res)=>{
    const blogs = await Blog.findAll({
        where:{
            category: 'React'
        }
    })
    res.render('index', {blogs})
})

//java
router.get('/index/java', async(req, res)=>{
    const blogs = await Blog.findAll({
        where:{
            category: 'Java'
        }
    })
    res.render('index', {blogs})
})


router.get('/:title/:id', auth, user_controller.user_blog)

module.exports = router;