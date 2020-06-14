import React, { Component } from 'react';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
export default class Login extends Component {

  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);

    this.onChangePassword = this.onChangePassword.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',

      password: '',

    users: []
    }
  }


  componentDidMount() {
          this.setState({
            username: this.props.match.params.username

          })

   }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();//this will prevent the default html form submit behaviour from tking place

    const existinguser = {
      username: this.state.username,

      password: this.state.password,

    }

    console.log(existinguser);

  axios.post('http://localhost:5000/signups/find', existinguser)
     .then(res =>{
       if(res.data.length > 0){
         this.setState({
           users: res.data[0]
         })
         // console.log("here is the result:-");
         // console.log(this.state.users);
        window.location = '/task/'+this.state.users.username+'/'+this.state.users._id+'/'+this.state.users.email;
       }
       else{
         alert("not a user,please sign up to continue or check your credentials");
       }
     })
     .catch((error) => {
       console.log(error);
     })


 }
  render() {
    return (
    <div>
    <Jumbotron>
  <div className="container">
    <form onSubmit={this.onSubmit}>
      <div className="form-group">
        <label><b>Username: </b></label>
         <input
         required
         type="text"

            placeholder="enter your username"
            className="form-control"
            value={this.props.match.params.username}
            onChange={this.onChangeUsername}
            />
      </div>
      <div className="form-group">
        <label><b>Password: </b></label>
        <input
        required
          placeholder="enter your password"
            type="password"
            className="form-control"
            value={this.state.password}
            onChange={this.onChangePassword}
            />
      </div>
      <div className="form-group">
        <input type="submit" value="Submit" className="btn btn-primary" />
      </div>
      <div className="form-group">
        <b>not a member?</b><a href="/signup">sign up here</a>      </div>
</form>
</div>
</Jumbotron>
      </div>
    )
  }
}
