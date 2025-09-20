import axios from 'axios';
import React from 'react'
import { useState } from 'react'

const CreateToDo = ({onTodoCreated}) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/api/todo/create", {title, description, priority, date}, {withCredentials: true})
      console.log("todo is created", res.data);
      if(onTodoCreated) onTodoCreated(res.data)
      setTitle("");
      setDescription("");
      setPriority("");
      setDate("");
      alert('Task added successfully');
    } catch (error) {
      console.log("Error creating todo ", error.message);
      alert("Failed to add task!");
    }

  }


  return (
    <div className='flex flex-col w-96 bg-lime-50 rounded-xl shadow-md p-6 max-h-fit'>
      <p className='text-xl text-center '>Add New Task</p>
      <form className="flex flex-col gap-4">
        <label className="flex flex-col text-gray-800 text-sm font-medium">
          Title
          <input
            type="text"
            required
            value={title}
            placeholder='Title...'
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="flex flex-col text-gray-800 text-sm font-medium">
          Description
          <textarea
            rows="3"
            required
            placeholder='Task Description...'
            value={description}
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        <label className='flex flex-col text-gray-800 text-sm font-medium'>
          <span className='text-black text-lg'>Task Priority</span>
          {/* Task Priority  */}
          <span className='flex gap-8  text-sm'>
            <button type="button" className='cursor-pointer w-16 h-6 hover:shadow-green-600 bg-green-500 text-white font-bold rounded-lg' value={priority} onClick={()=>setPriority("Low")}>Low</button>
            <button type="button" className='cursor-pointer w-16 h-6 bg-yellow-500 text-white font-bold rounded-lg' value={priority} onClick={() => setPriority("Medium")}>Medium</button>
            <button type='button' className='focus:shadow-2xl cursor-pointer w-16 h-6 bg-red-500 text-white font-bold rounded-lg' value={priority} onClick={() => setPriority("High")}>High</button>
          </span>
        </label>

        <label className='flex flex-col text-gray-800 text-sm font-medium'>
          {/* Due Date  */}
          <span className='text-black text-lg'>Due Date</span>
          <span className='flex gap-8'>
            <input className='w-46 h-8 bg-red-300 hover:bg-red-400 cursor-pointer text-white font-bold rounded-lg' type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
          </span>
        </label>

        <button
          type="submit"
          className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition cursor-pointer"
          onClick={handleSubmit}
        >
          Add Task
        </button>
      </form>
    </div>
  )
}

export default CreateToDo