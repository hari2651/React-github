import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {
    const inputref = useRef();
    const [todolist, setTodolist] = useState(localStorage.getItem("todos")?
JSON.parse(localStorage.getItem("todos")) : []);

    const add = () => {
        const inputtext = inputref.current.value.trim();

        if (inputtext === "") {
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: inputtext,
            iscomplete: false,
        }
        setTodolist((prev) => [...prev, newTodo]);
        inputref.current.value = "";

    }

    const deleteTodo = (id) =>{
        setTodolist((prvTodos)=>{
           return prvTodos.filter((todo)=>todo.id !== id)

        })
    
    }

    const toggle = (id)=>{
        setTodolist((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id === id){
                    return{...todo, iscomplete: !todo.iscomplete}
                }
                return todo;
            })
        })
    }
    
    useEffect(()=>{
           localStorage.setItem("todos", JSON.stringify(todolist));
    },[todolist])
    

    return (
        <div className='bg-white place-self-center w-11/12 max-w-md 
    flex flex-col p-7 min-h-[550px] rounded-xl'>

            {/*---------title----------*/}

            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_icon} alt="" />
                <h1 className='text-3xl font-semibold'>To-Do list</h1>
            </div>
            {/*---------input box-------*/}

            <div className='flex items-center my-6 bg-gray-200 rounded-full'>
                <input ref={inputref} className='bg-transparent border-0 outline-none
                flex-1 h-14 pl-7 pr-2 placeholder:text-slate-600'type="text" placeholder='Add your task' />
                <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14
                 text-white text-lg font-medium cursor-pointer'>ADD </button>
            </div>
            {/*---------todo list-------*/}
            <div>
                {todolist.map((item, index) => {
                    return <TodoItems key={index} text={item.text} id={item.id}
                        iscomplete={item.iscomplete} deleteTodo={deleteTodo} toggle={toggle}/>

                })}

            </div>
        </div>
    )
}

export default Todo
