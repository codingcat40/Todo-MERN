import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required:  true},
    date: {type: String, required: true},
    priority: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref:"user", required: true},

});

const Todo =  mongoose.model("todo", todoSchema)
export default Todo;