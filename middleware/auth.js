const User = require('../models/User')

module.exports = async function(req, res, next){
      let user_id = parseInt(req.cookies.user_id);
      console.log(user_id)
      try {
            if(isNaN(user_id)){
                  console.log('this route is acessiable by only authenticate user')
                  return res.redirect('/user/sign_in')
            }    

            const user = await User.findOne({
                  where:{
                        id: user_id
                  }
            })
            console.log(user)
            if(user == null){
                  console.log('This route is acessiable by only authenticate user')
                  return res.redirect('/user/sign_in')
            }      
      } catch (error) {
            return res.status(500).send('Server Error: '+ error)
      }
      next();
}