const router = require('express').Router();//we need express router
let User = require('../models/user.model');
// routing willbe like localhost:5000/users/
router.route('/').get((req, res) => {
  //find wll get the list of all the user from the mongobd atlas database ,find fxn always returns a promise so the data will be returned in the form of json format
  //then will return all the data andif there comes an error,catch will be triggred
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});
// routing willbe like localhost:5000/users/add
router.route('/add').post((req, res) => {
  //given name by the user will be stored in username then we willl create a instance of username that is newUser
  //save function  will save the new user and then return a successfull jdson format..but if an error occurs it will trigger catch
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
