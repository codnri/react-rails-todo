import React from 'react';

class TaskForm extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      title: '',
      description: ''
    }

    this.createTask = this.createTask.bind(this);
  }

  createTask(event) {

    let request = new Request('/api/v1/tasks', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description
      })
    });

    fetch(request).then(function (response) {
      return response.json();
    }).then((task) => {

      this.props.getTasks();
    }).catch(function (error) {
      console.error(error);
    }).finally(() => {
      this.setState({
        title: '',
        description: ''
      })
    });

    event.preventDefault();
  }

  render() {
    let { title, description } = this.state;

    return (
      <form onSubmit={this.createTask}>
        <label>Title</label>
        <input
          type="text" value={title}
          placeholder="Title"
          onChange={(e) => {
            this.setState({
              title: e.target.value
            })
          }}
        />
        <label className="mr-sm-2">Description</label>
        <input
          type="text" value={description}
          placeholder="Description"
          onChange={(e) => {
            this.setState({
              description: e.target.value
            })
          }}
        />
        <input type="submit" value="Create Task" />
      </form>
    )
  }
}

export default TaskForm;