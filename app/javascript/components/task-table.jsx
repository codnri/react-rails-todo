import React from 'react';
import TaskRow from './task-row'

class TaskTable extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { tasks, getTasks } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(function (task, index) {
            return (
              <TaskRow
                key={index}
                id={task.id}
                title={task.title}
                description={task.description}
                getTasks={getTasks}
              />);
          }.bind(this))}
        </tbody>
      </table>
    );
  }
}

export default TaskTable;