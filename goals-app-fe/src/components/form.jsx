import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      why: "",
      resource: ""
    };

    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(event) {
    event.preventDefault();
    const target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({ [name]: value });
  }
  render() {
    console.log("props", this.props);
    return (
      <div>
        name:
        <input
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.handleInput}
        />
        resource:
        <input
          name="resource"
          type="text"
          value={this.state.resource}
          onChange={this.handleInput}
        />
        why:
        <input
          name="why"
          type="text"
          value={this.state.why}
          onChange={this.handleInput}
        />
        <button onClick={() => this.props.onSubmit(this.state)}>Create</button>
      </div>
    );
  }
}

export default Form;
