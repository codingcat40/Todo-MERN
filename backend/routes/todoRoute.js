import express from 'express'
import Todo from '../models/todoModel.js'


const router = express.Router();

// create
router.post("/todo/create", async(req, res) => {
    const todo = await Todo.create({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        priority: req.body.priority,
        user: req.session.userId,

    });
    res.json(todo)
});

// get items
router.get("/todos/get", async(req, res) => {
    const todos = await Todo.find({user: req.session.userId});
    res.json(todos)
})

// delete items
router.post('/todo/delete', async(req, res) => {
    try {
        const {todoId} = req.body;
        const deletedTodo = await Todo.findOneAndDelete({
            _id: todoId,
            user: req.session.userId,
        })

        if(!deletedTodo){
            res.status(404).json({message: "Todo not found or authorized"})
        }
        return res.status(200).json({message: "Todo Deleted successfully", deletedTodo});

    } catch (error) {
        console.log('Error deleting the task', error);
        return res.status(500).json({message: error.message});
    }
})

// edit item
router.post('/todo/edit', async(req, res) => {
    try {
        const {todoId, title, description, date, priority} = req.body;
        const EditedTodo = await Todo.findOneAndUpdate({_id: todoId, user: req.session.userId}, {title, description, priority, date}, {new: true})

        return res.status(200).json({message: "Todo Edit Success", EditedTodo});

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})




export default router;