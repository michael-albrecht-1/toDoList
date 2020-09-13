import React from "react";
import uuid from "react-uuid";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { ToDo } from "./ToDo";
import { NewToDo } from "./NewToDo";

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

  handleNewTaskInputChange() {
    this.setState({
      newTaskValue: event.target.value
    });
  }

  handleNewTaskInputClick() {
    this.setState((state) => {
      if (this.state.newTaskValue === "Ajouter une nouvelle tâche") {
        return { newTaskValue: "" };
      }
    });
  }

  handleReinitNewTaskInput() {
    this.setState({
      newTaskValue: "Ajouter une nouvelle tâche"
    });
  }

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
        const updatedList = [...currentList, newTask];
        return {
          list: updatedList,
          newTaskValue: ""
        };
      }
    });
  }

  handleTaskValueChange(uuid) {
    this.setState((state) => {
      const listWithoutModifiedTask = state.list.filter(
        (task) => task.uuid !== uuid
      );
      const modifiedTask = state.list.find((task) => task.uuid === uuid);
      const updatedTask = { ...modifiedTask, name: event.target.value };
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

  handlePriorityChange(uuid) {
    this.setState((state) => {
      const listWithoutClicked = state.list.filter(
        (task) => task.uuid !== uuid
      );
      const clickedTask = state.list.find((task) => task.uuid === uuid);
      const uploadedTask = {
        ...clickedTask,
        priority: this.calculatePriority(clickedTask.priority)
      };
      const updatedList = [...listWithoutClicked, uploadedTask];
      return { list: updatedList };
    });
  }

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
          {sortToDoListByPriorityAndDate(this.state.list).map((task) => {
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

function sortToDoListByPriorityAndDate(list) {
  const copyList = [...list];

  return copyList
    .sort((task1, task2) => task1.date - task2.date)
    .sort((task1, task2) => task1.priority - task2.priority);
}
