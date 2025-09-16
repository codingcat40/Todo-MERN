import express from 'express'
import Todo from '../models/todoModel.js'


const router = express.Router();

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


router.get("/todos/get", async(req, res) => {
    const todos = await Todo.find({user: req.session.userId});
    res.json(todos)
})


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
        return res.status(500).json({message: "Server Error"});
    }
})

export default router;