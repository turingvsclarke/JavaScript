import React from 'react';

const TodoList = ({todos,deleteTodo})=>{

    const TodoList = todos.length ? (
    
    todos.map(todo=>{

        return(

        <div className="collection-item" key={todo.id}>

            <span onClick = {()=>{deleteTodo(todo.id)}}>{todo.content}</span>

        </div>

        )}))
    
    : (<p className="center">Congratulations! You finished everything you had to do!</p>)

    return(

    <div className = "todo-list collection">

        {TodoList}

    </div>

)

    
}

export default TodoList