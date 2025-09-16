import React, { useEffect, useState } from 'react'
import CreateToDo from './CreateToDo';
import axios from 'axios';

const ListItems = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const [todos, setTodos] = useState([]);
  const [enableEdit, setEnableEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [reload, setReload] = useState(false);


  
  useEffect(() => {
    fetchTodos()
  }, [reload])



  const fetchTodos = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/todos/get", { withCredentials: true });
    const data = response.data;
    console.log(data);
    setTodos(data); // directly set array of todos
  } catch (error) {
    console.log("Error fetching data", error);
  }
};




  // save changes
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
          // setFormData({title, description, priority, date});
          const response = await axios.post("http://localhost:3001/api/todo/edit",{todoId: editId, title, description, priority, date} , {withCredentials: true})
          const updatedTodo = response.data;
          setTodos(
            todos.map((todo) => todo._id == editId ? updatedTodo: todo)
          )
          setEnableEdit(false);
          alert('Task edited successfully')
          setReload(!reload);
    } catch (error) {
      alert('Unable to edit the task', error.message)
      setReload(!reload);
    }

  }


  // item delete function
  const handleDelete = async (todoId) => {
    try {
      await axios.post("http://localhost:3001/api/todo/delete", {todoId}, {
        withCredentials: true
      })
      setTodos(todos.filter(item => item._id != todoId));
      alert('Task Deleted Successfully!')
    } catch (error) {
      alert('You are not authorized to delete the Item');
      console.log("Error deleting the todo", error);
    }
  }


  return (
    <div className="flex flex-row justify-start bg-gradient-to-r from-purple-500 to-black min-h-screen pt-20 px-12 gap-12">
  {/* Left side: Todo cards */}
  <div className="flex flex-col gap-8 max-w-3xl w-full">
    {todos.length > 0 ? todos.map((item) => (
      <div
        key={item._id}
        className="border shadow-md bg-white flex flex-col rounded-xl overflow-hidden w-full"
      >
        <div className="flex flex-col p-4 gap-3">
          <div className="flex flex-row justify-between items-center">
            <span className="text-lg font-semibold truncate max-w-sm text-gray-900">
              {item.title}
            </span>

            <div className="flex gap-3">
              <button
                className="bg-black text-white px-4 py-1.5 rounded-2xl shadow hover:shadow-lg cursor-pointer text-sm"
                onClick={() => {
                  setEnableEdit(!enableEdit); 
                  setEditId(item._id);
                  setDate(item.date);
                  setTitle(item.title);
                  setDescription(item.description);
                  setPriority(item.priority)
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-600 px-4 py-1.5 rounded-2xl cursor-pointer text-white hover:shadow-lg text-sm"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </div>

          <hr className="my-2" />

          <p className="text-sm text-gray-700 italic line-clamp-2 max-w-lg">
            {item.description}
          </p>
          <p className="font-thin italic text-sm text-gray-600">
            {/* {item.date.slice(0, 10)} */}
          </p>
          <span className="italic font-light text-center bg-black px-2 py-1 max-w-min rounded-xl text-white text-xs">
            {item.priority}
          </span>
        </div>
      </div>
    )): <p className='text-white text-2xl justify-center'>Add Your Tasks here :)</p>}
  </div>

  {/* Right side: Edit form */}
  <div className={`flex flex-col w-96 ${enableEdit && 'bg-white'} rounded-xl shadow-md p-6 max-h-fit`}>
    {enableEdit ? (
      <form className="flex flex-col gap-4">
        <label className="flex flex-col text-gray-800 text-sm font-medium">
          Title
          <input
            type="text"
            value={title}
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="flex flex-col text-gray-800 text-sm font-medium">
          Description
          <textarea
            rows="4"
            value={description}
            className="mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        <label className='flex flex-col text-gray-800 text-sm font-medium'>
          Priority 
          <span className='flex gap-8'>
            <button type='button' className='px-2 py-1 bg-green-500 text-white font-bold rounded-lg' value={priority} onClick={()=>setPriority("Low")}>Low</button>
            <button type='button' className='px-2 py-1 bg-yellow-500 text-white font-bold rounded-lg' value={priority} onClick={() => setPriority("Medium")}>Medium</button>

            <button type='button' className='px-2 py-1 bg-red-500 text-white font-bold rounded-lg' value={priority} onClick={() => setPriority("High")}>High</button>

          </span>
        </label>
        <label className='flex flex-col text-gray-800 text-sm font-medium'>
          Due Date 
          <span className='flex gap-8'>
            <input className='px-2 py-1 bg-black text-white font-bold rounded-lg' type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
          </span>
        </label>

        <button
          className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          onClick={handleEditSubmit}
        >
          Save Changes
        </button>
      </form>
    ) : <CreateToDo onTodoCreated = { (newTodo) => setTodos([newTodo, ...todos])}/>}
  </div>
</div>


  )
}

export default ListItems