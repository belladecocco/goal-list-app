import React, { Component } from "react";

class Goal extends Component {
  render() {
    return (
      <div>
        {this.props.goals.map(goal => (
          <div
            key={goal._id}
            className="card text-white bg-dark mb-3 m-2"
            style={{ width: 200, fontFamily: "Times New Roman" }}
          >
            <span>Title: {goal.name}</span>
            <span>Why do it?: because {goal.why}</span>
            <span>Resources: {goal.resource}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default Goal;
