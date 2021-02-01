const User = require('../models/User')

module.exports = async function(req, res, next){
    let user_id = parseInt(req.cookies.user_id);
    
    try {
          const user = await User.findOne({
                where:{
                      id: user_id
                }
          })
          if(user.dataValues.email != "admin@example.com"){
              return res.redirect('/user/profile')
          }
              
    } catch (error) {
          return res.status(500).send('Server Error: '+ error)
    }
    next();

}