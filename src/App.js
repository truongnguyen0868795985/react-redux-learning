import "./App.css";
import React from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import _ from "lodash";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: null,
      isDislayForm: false,
      isEditing: false,
      filter : {
        name : '',
        status : "-1"
      }
    };
  }

  // On toggle form
  onOnToggleForm = () => {
    this.setState({
      isDislayForm: !this.state.isDislayForm,
    });
  };

  // On close form
  onCloseForm = () => {
    this.setState({
      isDislayForm: false,
    });
  };

  // On show form
  onShowForm = () => {
    this.setState({
      isDislayForm: true,
    });
  };

  onSubmit = (data) => {
    let tasks = this.state.tasks;
    let newTask;

    console.log("data.id",data.id);
    if (!data.id) {
      // Create tasks
      console.log("Creating task");

      let lastTask = tasks[tasks.length - 1];

      let idLastTask = 0;
      if (lastTask) {
        idLastTask = lastTask.id;
      }

      // Create task
      newTask = {
        id: idLastTask + 1,
        name: data.name,
        status: data.status === "true" ? true : false,
      };

      tasks.push(newTask);
    } else {
      // Update tasks
      let indexTaskUpdate = _.findIndex(tasks,task => task.id === data.id);

      newTask = data;
      tasks[indexTaskUpdate] = newTask;
    }

    // Save task
    this.setState({
      tasks: tasks,
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onChangeStatus = (id) => {
    let { tasks } = this.state;

    let indexStatus = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        indexStatus = index;
      }
    });

    if (indexStatus !== -1) {
      tasks[indexStatus].status = !tasks[indexStatus].status;
    }

    this.setState({ tasks: tasks });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onDelete = (id) => {
    let { tasks } = this.state;

    let indexDelete = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        indexDelete = index;
      }
    });

    if (indexDelete !== -1) {
      tasks.splice(indexDelete, 1);
    }

    this.setState({ tasks: tasks });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    this.onCloseForm();
  };

  onEdit = (id) => {
    let { tasks } = this.state;
    let task = _.find(tasks, { id: id });

    if (task) {
      this.onShowForm();
      this.setState({ task: task, isEditing: true });
    }
  };

  setStatusEdit = (status) => {
    this.setState({
      isEditing: status,
    });
  };

  onFilter = (name,status) => {
    let newFilter  = {
      name : name,
      status : status
    }
    this.setState({
      filter : newFilter
    })
  }

  render() {
    let { tasks, isDislayForm, task, isEditing, filter } = this.state;

    if(filter && filter.name) {
      console.log(filter.name);
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
      })
      console.log("filter name",tasks);
    }

    if(filter && filter.status !== "-1"){
      tasks = tasks.filter((task) => {
        let status = filter.status === "1" ? true : false
        return task.status === status;
      })

      console.log("filter status",tasks);
    }

    return (
      <div className="App">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDislayForm
                ? "col-xs-4 col-sm-4 col-md-4 col-lg-4"
                : "col-xs-0 col-sm-0 col-md-0 col-lg-0"
            }
          >
            {isDislayForm ? (
              <TaskForm
                onCloseForm={this.onOnToggleForm}
                onSubmit={this.onSubmit}
                task={task}
                isEditing={isEditing}
                setStatusEdit={this.setStatusEdit}
              />
            ) : (
              ""
            )}
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onOnToggleForm}
            >
              <span className="fa fa-plus ml-0">Thêm Công Việc</span>
            </button>
            <Control />
            <div className="row mt-15">
              <div
                className={
                  isDislayForm
                    ? "col-xs-12 col-sm-12 col-md-12 col-lg-12"
                    : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
                }
              >
                <TaskList
                  onChangeStatus={this.onChangeStatus}
                  onDelete={this.onDelete}
                  onEdit={this.onEdit}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
