import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { use } from 'react'
import { useState } from 'react'

export default function Todos() {
    const [todos, setTodos] = useState([])
    const [editingId, setEditingId] = useState(null);
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

    // const handleUpdateTodo =(update)=>{
    //     axios.put(`${import.meta.env.VITE_API_URL}/addTodos`, update)
    //     .then(()=>{
    //         setTodos((prev)=>{
    //             return prev.map(t => t.id === update.id ? update : t)
    //         })
    //     })
    // } here on clicking edit button it derectly call the put api, and as a result nothing gets updated 
    // we first need to store all the editing todos data in the form and then on clicking submit it must 
    // get submitted, the updated one


    const handleUpdateTodo =(todoToEdit)=>{
        setTodo(todoToEdit.todos);
        setDate(todoToEdit.date);
        setPriority(todoToEdit.priority);
        setEditingId(todoToEdit.id);
    }
// now make chnages in submit handler too

    const handleDeleteTodo =(id)=>{
        axios.delete(`${import.meta.env.VITE_API_URL}/addTodos/${id}`)
        .then(()=>{
            setTodos((prev)=> prev.filter((t)=>t.id !== id))
        })
    }

    // here, we will check if id is editingId, then we call put api
    // and if it is new id then we call post req.
    const handleSubmit=(e)=>{
        e.preventDefault();
        // axios.post(`${import.meta.env.VITE_API_URL}/addTodos`, {todos: todo, date, priority})
        const payload = {todos: todo, date, priority}
        const request = editingId ? 
        axios.put(`${import.meta.env.VITE_API_URL}/addTodos`, {...payload, id:editingId}) :
        axios.post(`${import.meta.env.VITE_API_URL}/addTodos`, payload)

        request.then((res)=>{
            return axios.get(`${import.meta.env.VITE_API_URL}/addTodos`)
        })
        .then((res)=>setTodos(res.data))
        .finally(()=>{
            setTodo('');
            setDate('');
            setPriority('');
            setEditingId(null);
        })
        .catch(console.error);
        // alert({todo,date,priority})
        // console.log("todo: "+ todo)
        // console.log("Date: "+ date)
        // console.log("priority: "+ priority)
    }

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/addTodos`)
        .then((res)=>setTodos(res.data))
        .catch(console.error);
    }, []);

    console.log("API:", import.meta.env.VITE_API_URL);
    
  return (
    <div>
        <div className='text-3xl mb-10'>Todos</div>
        <form onSubmit={handleSubmit} className='gap-4'>
            <label className=' flex flex-col items-start gap-2 ml-2'> Write your todo: 
                <input
                type='text'
                value={todo}
                onChange={handleOnSetTodo}
                className=' mx-2 border p-2 border-amber-950 bg-blue-200 rounded-xl'
                />
            </label>
            <label className=' flex flex-col items-start gap-2 ml-2'>Write the completion date here: 
                <textarea
                value={date}
                onChange={handleOnSetDate}
                className=' mx-2 border p-2 border-amber-950 bg-blue-400 rounded-xl'
                />
            </label>
            <label className=' flex flex-col items-start gap-2 ml-2'>Select the priority of the task:
                <select value={priority} onChange={handleOnSetPriority} className='mx-3 border-b-blue-800 border-2 p-2 rounded-2xl'>
                    <option value="Top">Top</option>
                    <option value="Middle">Middle</option>
                    <option value="Bottom">Bottom</option>
                </select>
            </label>
            
            <input type='submit' className='border-2 mt-4 ml-4 border-amber-950 rounded-2xl p-2 bg-amber-900'/>
        </form>

        <div className='flex gap-5 mt-10 items-center justify-center '>
            <div className=' flex flex-col gap-5 items-center justify-center'>
                <div>All Todos</div>
                {todos.map((t, idx)=>(
                    <div key ={t.id} className='gap-5 mt-5 flex items-center justify-center'>
                        <div className=' text-xl '>{idx +1}</div>
                        <div className=' border-b-amber-950 border-2 p-2 rounded-2xl'>{t.todos}</div>
                        <div className=' border-b-blue-800 border-2 p-2 rounded-2xl'>{t.date}</div>
                        <div className=' border-b-cyan-800 border-2 p-2 rounded-2xl'>{t.priority}</div>
                        <button className=' border-amber-300 border-2 rounded-2xl p-2 bg-amber-100' onClick={()=> handleUpdateTodo(t)}>Edit</button>
                        <button className=' border-2 border-amber-950 rounded-2xl p-2 bg-amber-900' onClick={()=> handleDeleteTodo(t.id)}>Delete</button>
                    </div> 
                ))}
            </div>
            
        </div>
    </div>
  )
}
