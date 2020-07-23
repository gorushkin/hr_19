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
    this.state = { items: [], value: '', activeList: [], finishedList: [] };
  }


  getData = async (path) => {
    const res = await axios.get(path);
    this.setState({ items: res.data})
  }

  componentDidMount() {
    const items = [
      {"id":1,"text":"asdf","state":"active"},
      {"id":2,"text":"asdasd","state":"finished"},
      {"id":3,"text":"qweqwe","state":"active"},
    ];
    this.setState({ items });
  //   this.getData(routes.tasksPath());
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

  renderTaskList = (type) => {
    const types = {
      activeList: {
        class: 'todo-active-tasks',
        handler: () => {},
        filter: (item) => item.state === "active",
      },
      finishedList: {
        class: 'todo-finished-tasks',
        handler: () => {},
        filter: (item) => item.state === "finished",
      },
    }
    
    // const list = this.state[type];
    const { items } = this.state;
    const list = items.filter(types[type].filter);

    if (list.length === 0) return null;
    return (
      <div className={types[type].class}>
        {list.sort((a, b) => (b.id - a.id)).map(item => {
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
        {this.renderTaskList('activeList')}
        {this.renderTaskList('finishedList')}
      </div>
    )
  }
};
// END
