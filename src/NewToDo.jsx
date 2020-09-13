import React, { Component } from "react";

export class NewToDo extends Component {
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
              onKeyDown={(e) => handleKeyDownAddTask(e)}
              onChange={(e) => handleNewTaskInputChange(e)}
              onMouseDown={() => handleNewTaskInputClick()}
              onBlur={() => handleReinitNewTaskInput()}
            />
          </div>
        </div>
      </div>
    );
  }
}
