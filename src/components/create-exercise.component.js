import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeTaskname = this.onChangeTaskname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      taskname: '',
      description: '',
      duration: 0,
      date: new Date(),
      time: '10:00',
      users: []
    }
  }
//react lifecycle method
  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeTaskname(e) {
    this.setState({
      taskname: e.target.value
    })
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onChangeTime = time => this.setState({ time })
  onSubmit(e) {
    e.preventDefault();//this will prevent the default html form submit behaviour from tking place

    const exercise = {
      username: this.state.username,
      taskname: this.state.taskname,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
      time: this.state.time,
      users: this.props.match.params.users
    }
    const userinfo = {
      users: this.props.match.params.users,
      id: this.props.match.params.id

    }
    //
    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));
    const signup= exercise;
    axios.post('http://localhost:5000/signups/name', userinfo)
    .then(response => {

     window.location = '/task/'+  response.data[0].username +'/'+  response.data[0]._id +'/'+  response.data[0].email;

    })
    }

  render() {
    return (
    <div>
      <Jumbotron>
    <Link className="btn btn-danger" to={"/task/"+this.props.match.params.users+"/"+this.props.match.params.id}><b>Go Back</b></Link>

      <h3><b>Create New Task Log</b></h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label><b>Username: </b></label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label><b>Task Category: </b></label>
          <input  type="text"
              required
              placeholder="enter your task category"
              className="form-control"
              value={this.state.taskname}
              onChange={this.onChangeTaskname}
              />
        </div>
        <div className="form-group">
          <label><b>Project Name: </b></label>
          <input  type="text"
              required
              placeholder="enter your project name"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label><b>Time Allocated/Duration (in minutes): </b></label>
          <input
              type="numbers"
              required
              placeholder="enter time allocated to complete the task"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label><b>End Date: </b></label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>
        <div className="form-group">
          <label><b>End Time: </b></label>
          <div>
        <TimePicker
                 onChange={this.onChangeTime}
                 value={this.state.time}
               />
               </div>
             </div>
        <div className="form-group">
          <input type="submit" value="Create Task Log" className="btn btn-primary" />
        </div>
      </form>
        </Jumbotron>
    </div>
    )
  }
}
