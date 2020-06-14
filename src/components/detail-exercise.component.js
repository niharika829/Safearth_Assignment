import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Timer from 'react-compound-timer'
import Jumbotron from 'react-bootstrap/Jumbotron';
export default class DetailExercise extends Component {
  constructor(props) {
    super(props);
   this.timer = this.timer.bind(this);
    this.state = {
      username: '',
      taskname:'',
      description: '',
      duration: 0,
      date: new Date(),
      time:'',
      status:''
        }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
            taskname: response.data.taskname,
          description: response.data.description,
          duration: Number(response.data.duration),
          date: new Date(response.data.date),
          time: response.data.time,
          status: response.data.status
        })

      })
      .catch(function (error) {
        console.log(error);
      })


  }
  timer() {
    if(this.props.match.params.status === "in progress")
      return  Number(this.props.match.params.duration)*60000;
    else
    return 0;
  }
  render() {
    return (
    <div >
    <Jumbotron>
    <Link className="btn btn-danger" to={"/task/"+this.props.match.params.users+"/"+this.props.match.params.id}><b>Go Back</b></Link>

      <form>
      <div className="form-group">
        <label><b>Username: </b></label>
        <input disabled
            className="form-control"
            value={this.state.username}
            />
      </div>
      <div className="form-group">
        <label><b>Task Category: </b></label>
        <input disabled
            className="form-control"
            value={this.state.taskname}
            />
      </div>
      <div className="form-group">
        <label><b>Project Name: </b></label>
        <input disabled
            className="form-control"
            value={this.state.description}
            />
      </div>
      <div className="form-group">
        <label><b>Time Allocated: </b></label>
        <input disabled
            className="form-control"
            value={this.state.duration}
            />
      </div>
      <div className="form-group">
        <label><b>End Date: </b></label>
        <br/>
          <DatePicker
              className="form-control"
             selected={this.state.date}
             disabled
           />
           </div>
           <div className="form-group">
             <label><b>End Time: </b></label>
             <input disabled
                 className="form-control"
                 value={this.state.time}
                 />
           </div>
           <div className="form-group">
             <label><b>Status: </b></label>
             <input disabled
                 className="form-control"
                 value={this.state.status}
                 />
           </div>

<center>
      <div className="form-group btn btn-primary">
        <label><b>  Time Left(from allocated time):- </b></label>

      <Timer
    initialTime={this.timer()}
    direction="backward"
    >
    {() => (
      <React.Fragment>

          <Timer.Days /> days
          <Timer.Hours /> hours
          <Timer.Minutes /> minutes
          <Timer.Seconds /> seconds
          <Timer.Milliseconds /> milliseconds
      </React.Fragment>
    )}
    </Timer>

</div>
</center>
</form></Jumbotron>
    </div>
    )
  }
}
