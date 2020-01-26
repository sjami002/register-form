import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Form = props => (
  <tr>
    <td>{props.form.username}</td>
    <td>{props.form.description}</td>
    <td>{props.form.plan}</td>
    <td>{props.form.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.form._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteForm(props.form._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class FormsList extends Component {
  constructor(props) {
    super(props);

    this.deleteForm = this.deleteForm.bind(this);

    this.state = { forms: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/forms/")
      .then(response => {
        this.setState({ forms: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteForm(id) {
    axios.delete("http://localhost:5000/forms/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      forms: this.state.forms.filter(el => el._id !== id)
    });
  }

  formList() {
    return this.state.forms.map(currentform => {
      return (
        <Form
          form={currentform}
          deleteForm={this.deleteForm}
          key={currentform._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Forms</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Plan</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.formList()}</tbody>
        </table>
      </div>
    );
  }
}
