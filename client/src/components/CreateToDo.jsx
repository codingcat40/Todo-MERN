import axios from 'axios';
import React from 'react'
import { useState } from 'react'

const CreateToDo = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/api/todo/create", {title, description, priority, date}, {withCredentials: true})
      console.log("todo is created", res.data);

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
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="flex flex-col text-gray-800 text-sm font-medium">
          Description
          <textarea
            rows="4"
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        <label className='flex flex-col text-gray-800 text-sm font-medium'>
          Priority 
          <span className='flex gap-8'>
            <button type="button" className='px-2 py-1 bg-green-500 text-white font-bold rounded-lg' onClick={()=>setPriority("Low")}>Low</button>
            <button type="button" className='px-2 py-1 bg-yellow-500 text-white font-bold rounded-lg' onClick={() => setPriority("Medium")}>Medium</button>

            <button type='button' className='px-2 py-1 bg-red-500 text-white font-bold rounded-lg' onClick={() => setPriority("High")}>High</button>

          </span>
        </label>

        <label className='flex flex-col text-gray-800 text-sm font-medium'>
          Due Date 
          <span className='flex gap-8'>
            <input className='px-2 py-1 bg-black text-white font-bold rounded-lg' type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
          </span>
        </label>

        <button
          type="submit"
          className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          onClick={handleSubmit}
        >
          Add Task
        </button>
      </form>
    </div>
  )
}

export default CreateToDo