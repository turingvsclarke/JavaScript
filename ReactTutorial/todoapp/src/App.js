import React, { Component } from 'react';
import TodoList from './ListTodos.js';
import AddTodo from './AddTodos.js';

class App extends Component {
  state={

    todos:[

      {id:4, content:"make the bed"}

    ]
  }

  addTodo=(todo)=>{

    todo.id = Math.random();

    let todos = this.state.todos

    todos.push(todo)

    this.setState({

      todos

    })

  }

  deleteTodo=(id)=>{

    let todos = this.state.todos.filter(todo=>

      {
        return todo.id!==id;
      }
      
    )
    
    this.setState({

      todos
    })

  }

  render() {

    return (
      <div className="App container">

        <h1 className="center blue-text">To Do List</h1>

        <TodoList todos={this.state.todos} deleteTodo={this.deleteTodo} />

        <AddTodo addTodo={this.addTodo} />
        
      </div>
    );
  }
}

export default App;
