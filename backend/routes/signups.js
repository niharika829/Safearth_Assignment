const router = require('express').Router();
let Signup = require('../models/signup.model');


router.route('/add').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const telephone = Number(req.body.telephone);

  const newsignup = new Signup({
    username,
    email,
    password,
    telephone,
  });

  newsignup.save()
  .then(() => res.json('processing!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/find').post((req, res) => {
  Signup.find({$and:[{"username":req.body.username},{"password": req.body.password}]})
    .then(signups => res.json(signups))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/name').post((req, res) => {
console.log(req);
  Signup.find({"username":req.body.users})
    .then(signups => res.json(signups))
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;
