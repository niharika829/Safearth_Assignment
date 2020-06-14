import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand"><b>ExcerTaskTracker</b></Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
        <Link to="/directlogin" className="nav-link"><b>Login</b></Link>
        </li>
        </ul>
        </div>
      </nav>
    );
  }
}
