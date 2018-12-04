import React from 'react';

class TaskRow extends React.Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(id) {
    // Rails 側の /api/v1/tasks/{taskID} を DELETE メソッドで叩き、Task の削除を実行する
    let request = new Request(`/api/v1/tasks/${this.props.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });

    fetch(request).then(function (response) {
      return response;
    }).then(() => {
      // DELETE 完了後に再度タスク一覧を取得
      this.props.getTasks();
    }).catch(function (error) {
      console.error(error);
    });
  }

  render() {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.description}</td>
        <td>
          <a href="#" onClick={() => this.deleteTask(this.props.id)}>Delete</a>
        </td>
      </tr>
    )
  }
}

export default TaskRow;
