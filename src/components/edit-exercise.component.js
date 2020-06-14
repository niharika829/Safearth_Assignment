import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import Jumbotron from 'react-bootstrap/Jumbotron';
export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangeTaskname = this.onChangeTaskname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeStatus= this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      taskname:'',
      description: '',
      duration: 0,
      date: new Date(),
      time:'',
      status:'',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
            taskname: response.data.taskname,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
          time: response.data.time,
          status: response.data.status
        })
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
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
      username: e.target.value
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

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      taskname: this.state.taskname,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
      time: this.state.time,
      status: this.state.status
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

  window.location = '/task/'+this.props.match.params.users+'/'+this.props.match.params.id;
  }

  render() {
    return (
    <div>
    <Link className="btn btn-danger" to={"/task/"+this.props.match.params.users+"/"+this.props.match.params.id}><b>Go Back</b></Link>

      <h3><b>Edit Task Log</b></h3>
        <Jumbotron>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label><b>Username: </b></label>
          <select ref="userInput"
              disabled
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
              className="form-control"
              value={this.state.taskname}
              onChange={this.onChangeTaskname}
              />
        </div>
        <div className="form-group">
          <label><b>Project Name: </b></label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label><b>Duration (in minutes): </b></label>
          <input
              type="text"
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
                 <label><b>Status: </b></label>
                 <input
                     type="text"
                     placeholder="type 'finished' if completed"
                     className="form-control"
                     value={this.state.status}
                     onChange={this.onChangeStatus}
                     />
               </div>
        <div className="form-group">
          <input type="submit" value="Edit Task Log" className="btn btn-primary" />
        </div>
      </form>
        </Jumbotron>
    </div>
    )
  }
}
