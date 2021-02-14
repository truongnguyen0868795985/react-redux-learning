import React from "react";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: "",
      status: false,
    };
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  };

  onChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;

    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);

    // Clear data and close form
    this.onClearData();
    this.onCloseForm();
  };

  onClearData = () => {
    this.setState({
      name: "",
      status: false,
    });
  };



  static getDerivedStateFromProps = (nextProps, currentState) => {

    if (nextProps.isEditing) {
      nextProps.setStatusEdit(false);

      return {
        id : nextProps.task.id,
        name : nextProps.task.name,
        status : nextProps.task.status,
      }
    }

    return null;
  };

  render() {
    return (
      <div className="TaskForm">
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">Thêm Công Việc</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Tên :</label>
                <input
                  type="text"
                  name="name"
                  onChange={this.onChange}
                  className="form-control"
                  value={this.state.name}
                />
              </div>
              <label>Trạng Thái :</label>
              <select
                className="form-control"
                name="status"
                required="required"
                onChange={this.onChange}
                value={this.state.status}
              >
                <option value={true}>Hiện - true</option>
                <option value={false}>Ẩn - false</option>
              </select>
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-warning">
                  Thêm
                </button>
                &nbsp;
                <button className="btn btn-danger" onClick={this.onCloseForm}>
                  Hủy Bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskForm;
