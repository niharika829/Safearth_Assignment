import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeTelephone = this.onChangeTelephone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      email: '',
      password: '',
      telephone:'',
    }
  }
onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onChangeTelephone(e) {
    this.setState({
      telephone: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();//this will prevent the default html form submit behaviour from tking place

    const newuser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      telephone: this.state.telephone
    }

    console.log(newuser);

    axios.post('http://localhost:5000/signups/add', newuser)
      .then(res =>   window.location = '/login/'+this.state.username )
      .catch((error) => {
        alert("telephone number should of exact 10 digits,password should of atleast 3 alphabets,email address and username should be unique");
      })
      axios.post('http://localhost:5000/users/add', newuser)
        .then(res => console.log(res.data));


  }

  render() {
    return (
    <div>
    <Jumbotron>
      <Link to="/directlogin" className="btn btn-danger"><b>Go To Login Page</b></Link>
      <h3><b>Create New Account</b></h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label><b>Username: </b></label>
           <input  type="text"
              required
              placeholder="type your unique username,of atleast three alphabets"
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
              />
        </div>
        <div className="form-group">
          <label><b>Email: </b></label>
          <input  type="email"
              required
              placeholder="type your unique email ID"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
              />
        </div>
        <div className="form-group">
          <label><b>Password: </b></label>
          <input
              type="password"
                required
                placeholder="type your unique password,of atleast three alphabets"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
              />
        </div>
        <div className="form-group">
          <label><b>Telephone: </b></label>
          <input
              type="number"
              required
              placeholder="type your unique telephone number,of 10 numbers"
              className="form-control"
              value={this.state.telephone}
              onChange={this.onChangeTelephone}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Add New User" className="btn btn-primary" />
        </div>
      </form>
      </Jumbotron>
    </div>
    )
  }
}
