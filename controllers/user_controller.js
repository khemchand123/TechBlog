const bcrypt = require('bcryptjs')

const User = require('../models/User')
const Blog = require('../models/Blog')

module.exports.user_profile = async function (req, res){ 
    
    console.log(req.cookies.user_id)
    const user = await User.findOne({
        where: {
            id: req.cookies.user_id
        }
    })
    //const {name, email} = user.dataValues;
    console.log(user.dataValues.name)
    return res.render('user_profile',{
         name: user.dataValues.name,
         email: user.dataValues.email
    });
}

module.exports.user_sign_up = function(req, res){
    console.log(parseInt(req.cookies.user_id))
    if(isNaN(req.cookies.user_id)){
        return res.render('user_sign_up')
    }
    if(parseInt(req.cookies.user_id) != 0){
        return res.redirect('/user/profile')
    }
    return res.render('user_sign_up')
}

module.exports.user_create = async function (req, res) {
   
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt);
       
    const user = await User.create({
        name: username,
        email,
        password: hashPassword
    });
    console.log(user)
    res.redirect('/user/sign_in')
}


module.exports.user_sign_in = function(req, res){
    if(isNaN(req.cookies.user_id)){
        return res.render('user_sign_in')
    }
    if(parseInt(req.cookies.user_id) != 0){
        return res.redirect('/user/profile')
    }
   
    return res.render('user_sign_in')
}

//after login
module.exports.user_login = async function(req, res){
    console.log(req.path)
    
    const {email ,password} = req.body;
    
    try {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if(user == null){
            console.log('unregister email id')
            return res.redirect('back')
        }
        
        const isCorrectPassword = await bcrypt.compareSync(password, user.dataValues.password);
        if(isCorrectPassword == false){
            console.log('incorrect password')
            return res.redirect('back')
        }
        res.cookie('user_id' ,user.dataValues.id)
        res.cookie('email_id' ,user.dataValues.email)
        console.log(user.dataValues)
        res.redirect('/user/profile')
    } catch (error) {
        console.log('Server Error', error)
        res.redirect('back')
    }
}


module.exports.user_logout = async function(req, res){
     res.cookie('user_id', 0)
     res.cookie('email_id', 0)
     res.redirect('/user/index')
}


module.exports.user_index = async function(req, res){
    console.log(req.query)
    const offset = req.query.offset;
    const limit = req.query.limit;
    console.log(offset, limit)
    const blogs = (await Blog.findAll({
        offset,
        limit
    }));
    
    return res.render('index', {
        blogs
    })
}


module.exports.user_blog = async function(req, res){
    const title = req.params.title;
    const id = req.params.id;

    const blog = await Blog.findOne({
        where:{
            id
        }
    })
    let blogs = [];
    blogs.push(blog);

    res.render('user_read_more',{
        blogs
    })
}