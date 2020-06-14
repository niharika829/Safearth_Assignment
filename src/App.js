import React from 'react';
import ParticlesBg from "particles-bg";
//import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import CurrentList from "./components/current-exercises-list.component";
import FinishedList from "./components/finished-exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import DetailExercise from "./components/detail-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import Signup from "./components/signup.component";
import Login from "./components/login.component";
function App() {
  return (
    <Router>
      <div className="container">
       <ParticlesBg type="cobweb" bg={true}/>
      <Navbar />

      <br/>
      <Route path="/signup" component={Signup} />
      <Route path="/directlogin" component={Login} />
      <Route path="/login/:username" component={Login} />
      <Route path="/task/:users/:id" component={ExercisesList} />
      <Route path="/current/:users/:id" component={CurrentList} />
      <Route path="/finished/:users/:id" component={FinishedList} />
      <Route path="/details/:id/:users/:duration/:status" component={DetailExercise} />
      <Route path="/edit/:id/:users" component={EditExercise} />
      <Route path="/create/:users/:id" component={CreateExercise} />

      </div>
    </Router>
  );
}

export default App;
