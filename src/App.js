import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.btnClass = this.btnClass.bind(this);
  }

  btnClass(prio) {
    let btnClass = null;
    switch (prio) {
      case 1:
        btnClass = "btn btn-danger";
        break;
      case 2:
        btnClass = "btn btn-warning";
        break;
      case 3:
        btnClass = "btn btn-primary";
        break;
      default:
        btnClass = "btn btn-primary";
        break;
    }
    return btnClass;
  }

  render() {
    const {
      task: { name, priority, date, id },
      handleClick
    } = this.props;

    return (
      <li className="list-group-item">
        <div className="mt-2 mb-3 d-flex justify-content-around">
          <div className="mt-2">{name}</div>
          <div>
            <button
              className={this.btnClass(priority)}
              id={id}
              onClick={() => handleClick(id)}
            >
              {priority}
            </button>
          </div>
        </div>
        <div>{date.toLocaleTimeString()}</div>
      </li>
    );
  }
}

class NewToDo extends React.Component {
  render() {
    return (
      <div className="card mb-3 mt-4">
        <p className="mt-3">
          new to do !<span className="text-danger ml-3">(to build !)</span>
        </p>
      </div>
    );
  }
}

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: 0,
          name: "faire la vaisselle",
          priority: 3,
          date: new Date()
        },
        {
          id: 1,
          name: "arroser le potager",
          priority: 3,
          date: new Date()
        },
        {
          id: 2,
          name: "commander du ba13",
          priority: 3,
          date: new Date()
        }
      ]
    };
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.calculatePriority = this.calculatePriority.bind(this);
  }

  calculatePriority(number) {
    if (number === 3) {
      number = 1;
    } else {
      number++;
    }
    return number;
  }

  handlePriorityChange(id) {
    this.setState((state) => {
      // get the array without the task clicked
      const listWithoutClicked = state.list.filter((task) => task.id !== id);
      // get the task clicked
      const clickedTask = state.list.find((task) => task.id === id);
      // update the task priority
      const uploadedTask = {
        ...clickedTask,
        priority: this.calculatePriority(clickedTask.priority)
      };
      // update the global array
      const updatedList = [...listWithoutClicked, uploadedTask].sort(
        (task1, task2) => task1.priority - task2.priority
      );
      // return the setState
      return { list: updatedList };
    });
  }

  render() {
    return (
      <div>
        <NewToDo />
        <ul>
          {this.state.list.map((task) => {
            return (
              <ToDo
                key={task.id}
                task={task}
                handleClick={this.handlePriorityChange}
              />
            );
          })}
        </ul>
        {JSON.stringify(this.state.list)}
      </div>
    );
  }
}

export default function App() {
  return (
    <div className="App container">
      <ToDoList />
    </div>
  );
}
