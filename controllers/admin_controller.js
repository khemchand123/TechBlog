const bcrypt = require('bcryptjs')

const User = require('../models/User')
const Blog = require('../models/Blog')

module.exports.admin_dashboard = async function(req, res){
    const counter_users = await User.count({});
    const counter_blogs = await Blog.count({});
    return res.render('admin_dashboard', {
        counter_users,
        counter_blogs
    })
}

module.exports.admin_create_blog = async function(req, res){
    return res.render('admin_create_blog')
}


module.exports.admin_post_blog = async function(req, res){
     const {category, title, description, content} = req.body;
     console.log(req.body)

     try {
         const blog = await Blog.create({
             category,
             title,
             description,
             content
         })
         res.redirect('/user/index')
     } catch (error) {
         res.status(500).send('Server error: blog doesnot created', error)         
     }
}


module.exports.admin_update_blog = async function(req, res){
    const id = req.params.id;
    const blog = await Blog.findOne({
        where: {
            id
        }
    })
    res.render('admin_update_blog', {
        blog
    })
}

module.exports.admin_update_blog_save = async function(req, res){
    const id = req.params.id;
    const {category, title, description, content} = req.body;
    await Blog.update({ 
         category,
         title,
         description,
         content,
    }, {
        where: {
          id
        }
      });
      res.redirect('/user/index')
}



module.exports.admin_delete_blog = async function(req, res){
    const id = req.params.id;

    await Blog.destroy({
        where: {
          id
        }
      });

      res.redirect('/user/index')
}