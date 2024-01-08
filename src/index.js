import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, onClick, style }) => (
  <button onClick={onClick} style={style}>
    {text}
  </button>
);

const Input = ({ value, onChange }) => (
  <input
    type='text'
    placeholder='Enter TODO'
    id='todo'
    value={value}
    onChange={onChange}
  />
);

class TodoList extends Component {
  render() {
    const { todos } = this.props;
    const list = todos.map((todo, index) => <li key={index}>{todo}</li>);
    return <ul>{list}</ul>;
  }
}

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    const { onClick } = this.props;
    const { inputValue } = this.state;
    const text = 'Add';
    const style = {
      background: 'aqua',
      padding: 0,
      width: 'auto',
    };

    return (
      <div>
        <Input value={inputValue} onChange={this.handleInputChange} />
        <Button text={text} style={style} onClick={() => onClick(inputValue)} />
      </div>
    );
  }
}

class ShowTodo extends Component {
  render() {
    const { todos } = this.props;
    return (
      <div>
        <h1>Todo List</h1>
        <TodoList todos={todos} />
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  onAdd = (todo) => {
    if (todo.trim() !== '') {
      this.setState((prevState) => ({
        todos: [...prevState.todos, todo],
      }));
    }
  };

  onReload = () => {
    this.setState({ todos: [] });
  };

  render() {
    const text = 'Reload';
    const style = {
      backgroundColor: 'red',
    };

    return (
      <div>
        <Todo onClick={this.onAdd} />
        <ShowTodo todos={this.state.todos} />
        <Button text={text} onClick={this.onReload} style={style} />
      </div>
    );
  }
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
