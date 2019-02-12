import React, { Component } from "react";
import Goal from "./components/goal";
import Form from "./components/form";
import "./App.css";
import * as request from "request";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  apiUrl = {
    url: "http://localhost:8000/goals",
    json: true
  };
  componentDidMount() {
    request.get(this.apiUrl, (error, response, body) => {
      console.log("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body); // Print the HTML for the Google homepage.
      this.setState({ goals: body });
    });
  }
  handleSubmit(goal) {
    const goals = [...this.state.goals];
    goals.push(goal);
    this.setState({ goals: goals });
    request.post({...this.apiUrl, body: this.state.goals});
  }
  render() {
    return (
      <div>
        <Goal goals={this.state.goals} />
        <Form onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
