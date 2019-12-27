const router = require('express').Router();
let User = require('../models/user.model');


var RandomUser = require('node-randomuser');
var randomUser = new RandomUser();

var http = require('http');



router.route('/:page/:size').get((req, res) => {

  var data = {
    "page": req.params.page,
    "size": req.params.size
  };

  User.find().skip(data.page *10).limit(10)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});




router.route('/').post((req, res) => {
  const username = req.body.username;
  const gender = req.body.gender;
  const dob = req.body.dob;
  const news = req.body.news;
  const email = req.body.email;
  const photos = req.body.photos;

  console.log(req.body);

  const newUser = new User({username,
  gender,
  dob,
  news,
  email,
  photos});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/').post((req, res) => {
  const username = req.body.username;
  const gender = req.body.gender;
  const dob = Date.parse(req.body.dob);
  const news = req.body.news;
  const email = req.body.email;
  const photos = req.body.photos;

  const newUser = new User({username,
    gender,
    dob,
    news,
    email,
    photos});

  newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
  User.findById(req.params.id)
      .then(user => {
        console.log(user);
        user.username = req.body.username;
        user.gender = req.body.gender;
        user.dob = req.body.dob;
        user.news = req.body.news;
        user.email = req.body.email;
        user.photos = req.body.photos;

        user.save()
            .then(() => res.json('user updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/randomUsers').get((req, res) => {
    /*r.getUsers(function(data) {
        res.json({data});
    });*/
    var options = {
        host: 'https://randomuser.me/api/?results=100',
        port:80,
        method: 'GET'
    };
   http.request(options,(response)=>{
       res.json({response});
   })
});


router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
});





module.exports = router;
