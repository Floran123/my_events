import logo from "./logo.svg";
import "./App.css";
import "./styles/nav.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Categorie from "./Components/Categorie";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";
import Meetups from "./Components/Meetups/MeetUpIndex";
import Register from "./Components/Login/Register";
import Profile from "./Components/User/Profile";
import MeetUpPage from "./Components/Meetups/MeetUpPage";
import EventPage from "./Components/Events/EventPage";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/categorie">Categorie</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/meetups">Meetups</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <Switch>
          <Route path="/categorie">
            <Categorie />
          </Route>
          <Route path="/events/:id">
            <EventPage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/meetups" exact>
            <Meetups />
          </Route>
          <Route path="/meetups/:id">
            <MeetUpPage />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
