const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const signupSchema = new Schema({
  username: { type: String, required: true ,unique: true,trim: true,minlength: 3},
  email: { type: String, required: true ,unique: true},
  password: { type: String, required: true ,minlength: 3},
  telephone: { type: String, required: true ,minlength: 10,maxlength: 10},

}, {
  timestamps: true,
});

const Signup = mongoose.model('Signup', signupSchema);

module.exports = Signup;
