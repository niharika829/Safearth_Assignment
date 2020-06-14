import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.taskname}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.createdAt.substring(0,10)}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
      <td>{props.exercise.time}</td>
    <td>{props.exercise.status}</td>
    <td>
      <Link to={"/details/"+props.exercise._id+"/"+props.exercise.username+"/"+props.exercise.duration+"/"+props.exercise.status}>details</Link> | <Link to={"/edit/"+props.exercise._id+"/"+props.exercise.username}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  componentDidMount() {
    const userid={
     id: this.props.match.params.id,
     username: this.props.match.params.users,
     email: this.props.match.params.email
   }
      //  console.log(userid);
        axios.post('http://localhost:5000/exercises/filterex', userid)
        .then(response => {
            this.setState({ exercises: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
      <Link   className="btn btn-success" to="/directlogin" ><b>logout</b></Link>
<br/><br/>
      <Link className="btn btn-success" to={"/current/"+this.props.match.params.users+"/"+this.props.match.params.id}><b>show current tasks</b></Link>

      <Link className="btn btn-success" to={"/finished/"+this.props.match.params.users+"/"+this.props.match.params.id}><b>show finished tasks</b></Link>

      <Link  className="btn btn-success" to={"/create/"+this.props.match.params.users+"/"+this.props.match.params.id}><b>create new task</b></Link>

            <Jumbotron>
        <h3><b>{this.props.match.params.users}</b></h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th><b>Username</b></th>
              <th><b>TaskCategory</b></th>
              <th><b>Project</b></th>
              <th><b>Duration(mins)</b></th>
              <th><b>Starting Date</b></th>
              <th><b>Ending Date</b></th>
              <th><b>Ending Time</b></th>
              <th><b>Status</b></th>
              <th><b>Actions</b></th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
          </Jumbotron>
      </div>
    )
  }
}
