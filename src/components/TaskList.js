import React from "react";
import TaskItem from "./TaskItem";
import {connect} from 'react-redux'

class TaskList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterName: "",
      filterStatus: -1, // All: -1 , Active: 1, Deactivated: 0 ,
    };
  }
  onChangeStatus = (id) => {
    this.props.onChangeStatus(id);
  };

  onDelete = (id) => {
    this.props.onDelete(id);
  };

  onEdit = (id) => {
    this.props.onEdit(id);
  };

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;

    this.setState(
      {
        [name]: value,
      },
      () => {
        this.props.onFilter(this.state.filterName, this.state.filterStatus);
      }
    );

  };

  render() {

    console.log(this.props.tasks);

    let elements = this.props.tasks.map((task, index) => {
      return (
        <TaskItem
          key={task.id}
          index={index}
          task={task}
          onChangeStatus={this.onChangeStatus}
          onDelete={this.onDelete}
          onEdit={this.onEdit}
        />
      );
    });

    let { filterName, filterStatus } = this.state;
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={filterName}
                onChange={this.onChange}
              />
            </td>
            <td>
              <select
                className="form-control"
                name="filterStatus"
                value={filterStatus}
                onChange={this.onChange}
              >
                <option value={-1}>Tất Cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích Hoạt</option>
              </select>
            </td>
            <td></td>
          </tr>
          {/* Task items */}
          {elements}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  }  
}

export default connect(mapStateToProps, null)(TaskList);
