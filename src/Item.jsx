import React from 'react';

// BEGIN (write your solution here)
export default class Item extends React.Component{
  render() {
    const { id, text } = this.props.task;
    return (
      <div className="row">
        <div className="col-1">{id}</div>
        <div className="col">
          <a href="#" className="todo-task">{text}</a>
        </div>
      </div>
    )
  }
}