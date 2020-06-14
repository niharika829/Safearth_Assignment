const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/current/filterex').post((req, res) => {
  console.log(req.body.username);
  Exercise.find({$and:[{"username":req.body.username},{"status": "in progress"}]})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/finished/filterex').post((req, res) => {
  console.log(req.body.username);
  Exercise.find({$and:[{"username":req.body.username},{"status": "finished"}]})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/filterex').post((req, res) => {
  console.log(req.body.username);
  Exercise.find({"username":req.body.username})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const taskname = req.body.taskname;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const time = req.body.time;
 const status = "in progress";
 const users = req.body.users;
  const newExercise = new Exercise({
    username,
    taskname,
    description,
    duration,
    date,
    time,
    status,
    users,
  });
if(users === username){
  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
}
});

// find info of particular entry from its id
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete a particular entry from its id
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.taskname = req.body.taskname;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);
      exercise.time = req.body.time;
      exercise.status = req.body.status;
      if(req.body.status=="finished" || req.body.status=="in progress"){
      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
