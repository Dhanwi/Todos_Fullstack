import React from 'react'
import { useState } from 'react'

export default function Todos() {
    const [todo, setTodo] = useState('')
    const [date, setDate] = useState('')
    const [priority, setPriority] = useState('')

    const handleOnSetTodo = (e)=>{
        setTodo(e.target.value);
    }

    const handleOnSetDate = (e)=>{
        setDate(e.target.value);
    }

    const handleOnSetPriority = (e) =>{
        setPriority(e.target.value);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        alert({todo,date,priority})
        console.log("todo: "+ todo)
        console.log("Date: "+ date)
        console.log("priority: "+ priority)
    }
  return (
    <div>
        <div className='text-3xl'>Todos</div>
        <form onSubmit={handleSubmit}>
            <label> Write your todo: 
                <input
                type='text'
                value={todo}
                onChange={handleOnSetTodo}
                />
            </label>
            <label>Write the completion date here: 
                <textarea
                value={date}
                onChange={handleOnSetDate}
                />
            </label>
            <label>Select the priority of the task:
                <select value={priority} onChange={handleOnSetPriority}>
                    <option value="Top">Top</option>
                    <option value="Middle">Middle</option>
                    <option value="Bottom">Bottom</option>
                </select>
            </label>
            <input type='submit'/>
        </form>
    </div>
    
  )
}
