const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

//get all todos and name
router.get('/', authorization, async (req, res) => {
    try {
        //req.user has the payload
        const users = await pool.query(
            'SELECT users.user_name, todos.todo_id, todos.description FROM users LEFT JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1', 
            [req.user]
        );

        res.json(users.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
});

//create a todo
router.post('/todos', authorization, async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *',
            [req.user, description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update a todo
router.put('/todos/:id', authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            'UPDATE todos SET description = $1 where todo_id = $2 AND user_id = $3 RETURNING *',
            [description, id, req.user]
        );

        if (updateTodo.rows.length === 0) {
            return res.json('This todo is not yours.');
        }

        res.json('Todo was updated');
    } catch (err) {
        console.error(err.message);
    }
});

//delete a todo
router.delete('/todos/:id', authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            'DELETE FROM todos where todo_id = $1 AND user_id = $2 RETURNING *',
            [id, req.user]
        );

        if (deleteTodo.rows.length === 0) {
            return res.json(`You can't delete this Todo, it doesn't belong to you.`);
        };

        res.json('Todo was deleted');
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;