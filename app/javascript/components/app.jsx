import React from 'react';
import Header from './header';
import TaskForm from './task-form';
import TaskTable from './task-table';

class App extends React.Component {
  constructor(props) {
    super(props);

    
    this.state = {
      tasks: [], // all tasks
    }

    
    this.getTasks = this.getTasks.bind(this); //binding the method
  }

  componentDidMount() {
    
    this.getTasks() // get all tasks
  }

  getTasks() {
    // call /api/v1/tasks via GET request to get all tasks
    let request = new Request('/api/v1/tasks', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    fetch(request).then(function (response) {
      return response.json();
    }).then(function (tasks) {
      // when having got all tasks, then set them to the state
      this.setState({
        tasks: tasks
      });
    }.bind(this)).catch(function (error) {
      console.error(error);
    });
  }

  render() {
    const { tasks } = this.state;

    return (
      <div>
        <Header title='Rails 5.1 + webpacker + React + Reactstrap Example' />
        <div>
          {/*
            * TaskForm コンポーネント起因でタスクを作成した際に
            * タスク一覧を再取得するために
            * getTasks メソッドを props として渡す
            */}
          <TaskForm getTasks={this.getTasks} />
          {/*
            * TaskRow (TaskTable の中) コンポーネント起因でタスクを削除した際に
            * タスク一覧を再取得するために
            * getTasks メソッドを props として渡す
            * tasks はタスク一覧
            */}
          <TaskTable tasks={tasks} getTasks={this.getTasks} />
        </div>
      </div>
    )
  }
}

export default App;