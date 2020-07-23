import React from "react";

// @ts-check

import axios from 'axios';
import update from 'immutability-helper';
import Item from './Item.jsx';
// import routes from './routes.js';

// BEGIN (write your solution here)
export default class TodoBox extends React.Component{
  constructor(props) {
    super(props);
    this.state = { items: [], value: '' };
  }

  getData = async (path) => {
    console.log('getData');
    const res = await axios.get(path);
    this.setState({ items: res.data})
  }

  componentDidMount() {
    console.log('mount');
    const items = [
      {"id":1,"text":"asdf","state":"finished"},
      {"id":2,"text":"asdasd","state":"active"},
      {"id":3,"text":"qweqwe","state":"active"},
    ]
  //   this.getData(routes.tasksPath());
    this.setState({ items });
  }

  submitHandler = (e) => {
    e.preventDefault();
    const { value } = this.state;
    const { items } = this.state;
    const id = items.length + 1;
    const updatedList = update(items, {$push: [{id: id, text: value, state: "active"}]});
    this.setState({ items: updatedList });
    this.setState({ value: '' });
  }

  changeHandler = (e) => {
    const { value } = e.target;
    this.setState({ value });
  }

  renderTaskList = () => {
    const { items } = this.state
    if (items.length === 0) return null;
    return (
      <div className="todo-active-tasks">
        {items.sort((a, b) => (b.id - a.id)).map(item => {
          return <Item key={item.id} task ={item} />
        })}
      </div>
    )
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <div className="mb-3">
          <form onSubmit={this.submitHandler} className="todo-form form-inline mx-3">
            <div className="form-group">
              <input onChange={this.changeHandler} type="text" value={value} required="" className="form-control mr-3" placeholder="I am going..." />
            </div>
            <button type="submit" className="btn btn-primary">add</button>
          </form>
        </div>
        {this.renderTaskList()}
      </div>
    )
  }
};
// END
