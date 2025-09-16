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
    const todos = await Todo.find({user: req.userId});
    res.json(todos)
})

export default router;