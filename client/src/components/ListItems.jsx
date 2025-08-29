import React, { useState } from 'react'
import { todos } from '../assets'

const ListItems = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const [enableEdit, setEnableEdit] = useState(false);


  const handleDelete = () => {

  }


  return (
    <div className=" flex flex-row justify-between bg-gradient-to-r pl-12 from-purple-500 to-black min-h-screen pt-20">
      <div className="justify-center items-center flex flex-col gap-8 max-w-3xl min-w-lg">
        {todos.map((item, index) => (
          <div
            key={index}
            className="border shadow-gray-500 bg-white flex flex-col rounded-xl overflow-hidden min-w-xl"
          >
            <div className="flex flex-col p-4 gap-3">
              <div className='flex flex-row justify-between'>
              <span className="text-lg font-semibold truncate max-w-xl">{item.title}</span>

              <span className='flex gap-4'>
              <span className='bg-black text-white px-4 py-2 rounded-2xl shadow-yellow-100 hover:shadow-xl cursor-pointer' onClick={() => setEnableEdit(!enableEdit)}> Edit </span>
              <span className='bg-red-600 py-2 px-4 rounded-2xl cursor-pointer text-white hover:shadow-2xl shadow-red-500' onClick={handleDelete}>Delete</span>
              </span>
              </div>
              <hr className="my-2" />
              <p className="text-sm text-gray-700 italic line-clamp-2 max-w-lg">{item.description}</p>
              <p className='font-thin italic text-sm '>{item.dueDate.slice(0, 10)}</p>
              <span className='italic font-light text-center bg-black p-1 max-w-2xs rounded-xl text-white'>{item.priority}</span>
            </div>
          </div>
        ))}
      </div>
      
      <form className='text-white border border-white'>
      {
              enableEdit && <div className='flex flex-col'>
                <form>
                  <label>Title:  <input type="text" onChange={(e) => setTitle(e.target.value)}/></label>
                  <label> Description: <textarea type='text' onChange={(e) => setDescription(e.target.value)}></textarea> </label>
                </form>
              </div>
      }
      </form>
</div>

  )
}

export default ListItems