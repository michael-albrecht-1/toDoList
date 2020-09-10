import React from "react";
import uuid from "react-uuid";
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
      task: { name, priority, date, uuid },
      handleClickPriority,
      handleClickDelete,
      handleTaskValueChange
    } = this.props;

    return (
      <li className="list-group-item">
        <div className="d-flex w-100 justify-content-between">
          <div className="mt-2">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={() => handleTaskValueChange(uuid)}
            />
          </div>
          <div className="mt-2 mb-2">
            <button
              className={this.btnClass(priority)}
              id={uuid}
              onClick={() => handleClickPriority(uuid)}
            >
              {priority}
            </button>
            <button
              className="ml-3 btn btn-danger"
              id={uuid}
              onClick={() => handleClickDelete(uuid)}
            >
              X
            </button>
          </div>
        </div>
        <small className="text-secondary">
          {date.toLocaleDateString()} - {date.toLocaleTimeString()}
        </small>
      </li>
    );
  }
}

class NewToDo extends React.Component {
  render() {
    const {
      handleKeyDownAddTask,
      handleNewTaskInputChange,
      newTaskValue,
      handleNewTaskInputClick,
      handleReinitNewTaskInput
    } = this.props;
    return (
      <div className="card mb-3 mt-4 ">
        <div className="card-body d-flex justify-content-start">
          <div>
            <input
              className="form-control"
              type="text"
              name="newTask"
              id="newTask"
              value={newTaskValue}
              onKeyDown={() => handleKeyDownAddTask()}
              onChange={() => handleNewTaskInputChange()}
              onMouseDown={() => handleNewTaskInputClick()}
              onBlur={() => handleReinitNewTaskInput()}
            />
          </div>
        </div>
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
          uuid: uuid(),
          name: "faire la vaisselle",
          priority: 3,
          date: new Date("September 2, 2020 15:00:00")
        },
        {
          uuid: uuid(),
          name: "arroser le potager",
          priority: 3,
          date: new Date("September 5, 2020 15:00:00")
        },
        {
          uuid: uuid(),
          name: "commander du ba13",
          priority: 3,
          date: new Date()
        }
      ],
      newTaskValue: "Ajouter une nouvelle tâche"
    };
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.calculatePriority = this.calculatePriority.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTaskValueChange = this.handleTaskValueChange.bind(this);
    this.handleKeyDownAddTask = this.handleKeyDownAddTask.bind(this);
    this.handleNewTaskInputChange = this.handleNewTaskInputChange.bind(this);
    this.handleNewTaskInputClick = this.handleNewTaskInputClick.bind(this);
    this.handleReinitNewTaskInput = this.handleReinitNewTaskInput.bind(this);
  }

  // controlled input new task
  handleNewTaskInputChange() {
    this.setState({
      newTaskValue: event.target.value
    });
  }

  // clean the input text when we click inside
  handleNewTaskInputClick() {
    this.setState((state) => {
      if (this.state.newTaskValue === "Ajouter une nouvelle tâche") {
        return { newTaskValue: "" };
      }
    });
  }

  // réinit input on blur
  handleReinitNewTaskInput() {
    this.setState({
      newTaskValue: "Ajouter une nouvelle tâche"
    });
  }

  // handle add new task validation form
  // !!! to do : reinit form after adding a new task
  // !!! click "+" button should valid formulary
  handleKeyDownAddTask() {
    console.log("key down : " + event.keyCode);
    this.setState((state) => {
      if (event.keyCode === 13) {
        const currentList = state.list;
        const newTask = {
          uuid: uuid(),
          name: event.target.value,
          priority: 3,
          date: new Date()
        };
        console.log("new task : " + JSON.stringify(newTask));
        const updatedList = [...currentList, newTask];
        return {
          list: updatedList,
          newTaskValue: ""
        };
      }
    });
  }

  // modify the task text
  // !!!! how to update without afect the table sorting ??
  handleTaskValueChange(uuid) {
    this.setState((state) => {
      const listWithoutModifiedTask = state.list.filter(
        (task) => task.uuid !== uuid
      );
      const modifiedTask = state.list.find((task) => task.uuid === uuid);

      const updatedTask = { ...modifiedTask, name: event.target.value };
      console.log("updatedTask : " + JSON.stringify(updatedTask));

      const updatedList = [...listWithoutModifiedTask, updatedTask];

      return { list: updatedList };
    });
  }

  calculatePriority(number) {
    if (number === 3) {
      number = 1;
    } else {
      number++;
    }
    return number;
  }

  // change the priority of the task
  handlePriorityChange(uuid) {
    this.setState((state) => {
      // get the array without the task clicked
      const listWithoutClicked = state.list.filter(
        (task) => task.uuid !== uuid
      );
      // get the task clicked
      const clickedTask = state.list.find((task) => task.uuid === uuid);
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

  // delete a task
  handleDelete(uuid) {
    this.setState((state) => {
      const listWithoutClicked = this.state.list.filter(
        (task) => task.uuid !== uuid
      );
      return { list: listWithoutClicked };
    });
  }

  render() {
    return (
      <div>
        <NewToDo
          handleKeyDownAddTask={this.handleKeyDownAddTask}
          handleNewTaskInputChange={this.handleNewTaskInputChange}
          newTaskValue={this.state.newTaskValue}
          handleNewTaskInputClick={this.handleNewTaskInputClick}
          handleReinitNewTaskInput={this.handleReinitNewTaskInput}
        />
        <ul className="list-group">
          {this.state.list.map((task) => {
            return (
              <ToDo
                key={task.uuid}
                task={task}
                handleTaskValueChange={this.handleTaskValueChange}
                handleClickPriority={this.handlePriorityChange}
                handleClickDelete={this.handleDelete}
              />
            );
          })}
        </ul>
        <div className="alert alert-primary mt-3">
          <h3> Dubug Card</h3>
          {JSON.stringify(this.state.list)}
        </div>
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
