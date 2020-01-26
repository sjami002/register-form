import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import FormsList from "./components/form-list.component";
import EditForm from "./components/edit-form.component";
import CreateForm from "./components/create-form.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={FormsList} />
        <Route path="/edit/:id" component={EditForm} />
        <Route path="/create" component={CreateForm} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
