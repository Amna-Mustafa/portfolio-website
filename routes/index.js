var express = require('express');
var router = express.Router();
const User = require('../models').User;
//console.log(User);
const bcrypt = require('bcrypt');
const { loginValidation } = require('../validation/validation');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//LOGIN

// router.post('/login123', async (req, res) => {
//   // console.log(User);
//   // return res.json({"user":User});
  
//   const { error } = loginValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
 
//   try{
//     const user = await User.findOne({where:{email:req.body.email}});
//     return res.json({"user":user});
//   }
//   catch(e){
//     return res.json({"message":e.message});
//   }


//   if(!user) return res.status(400).send('Invalid email!');
//   const validPass = await bcrypt.compare(req.body.password, user.password);
//   if(!validPass) return res.status(400).send('Invalid password!')
// });
module.exports = router;
