import React, { Component } from "react";

export class ToDo extends Component {
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
