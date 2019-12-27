import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/users-list.component";
import EditExercise from "./components/edit-users.component";
import createUsers from "./components/create-users.component";
import mock from "./components/mock.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={createUsers} />
      <Route path="/mock" component={mock} />
      </div>
    </Router>
  );
}

export default App;
