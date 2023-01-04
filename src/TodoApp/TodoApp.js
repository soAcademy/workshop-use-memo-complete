import { useState, useEffect } from 'react'
import { TodoContext } from './TodoAppContext'

import TodoHeader from './TodoHeader'
import TodoList from './TodoList'
import TodoForm from './TodoForm'

import './TodoApp.css'

const initialState = {
    id: Date.now(),
    text: 'Buy Milk',
    isComplete: false
}

const TodoApp = () => {
    const [ items, setItems ] = useState([initialState])
    const [ count, setCount] = useState(0)

    const handleToggleTask = (id) => {
        let mappedItems = items.map(task => {
            return task.id === Number(id) ? { ...task, isComplete: !task.isComplete } : { ...task}
        })
        setItems(mappedItems)
    }

    const addTask = (userInput) => {
        const newItems = [...items, { id: Date.now(), text: userInput, isComplete: false }]
        setItems(newItems)
    }

    useEffect(() => {
        let timer = setInterval(() => {
          setCount((count) => count + 1)
        }, 1000)
    
        return () => clearInterval(timer)
    }, [])
  
    return (
        <TodoContext.Provider value={count}>
            <TodoHeader />
            <TodoList items={items} handleToggleTask={handleToggleTask} />
            <TodoForm addTask={addTask} />
        </TodoContext.Provider>
    )
}

export default TodoApp