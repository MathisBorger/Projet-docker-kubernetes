const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // const result = await pool.query(
        //     "SELECT * FROM users"
        // );
        
        const mock = [
            { id: 1, name: 'John Doe', password: 'password1' },
            { id: 2, name: 'Jane Smith', password: 'password2' },
            { id: 3, name: 'Alice Johnson', password: 'password3' },
            { id: 4, name: 'Bob Brown', password: 'password4' },
        ];
        res.status(204).json(mock); //result.rows);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Impossible de récupérer les utilisateur !');
    }
})

router.get('/users/:id/tasks', async (req, res) => {
    try {
        // const result = await pool.query(
        //     "SELECT * FROM tasks"
        // );
        const mock = [
            { id: 1, title: 'Tâche 1', description: 'Description de la tâche 1', date: '2023-10-01'},
            { id: 2, title: 'Tâche 2', description: 'Description de la tâche 2', date: '2023-10-01' },
            { id: 3, title: 'Tâche 3', description: 'Description de la tâche 3', date: '2023-10-01' },
            { id: 4, title: 'Tâche 4', description: 'Description de la tâche 4', date: '2023-10-01' }, 
        ];
        res.status(204).json(mock);//result.rows);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Impossible de récupérer les tâches !');
    }
})

router.post('/create', async (req, res) => {
    const {name, password} = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO users VALUES ($1, $2)",
            [name, password]
        );
        res.status(204).json(result.rows);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Impossible de créer un nouveau utilisateur !');
    }
})

router.put('/edit/:id', async (req, res) => {
    const {name, password} = req.body;
    try {
        const result = await pool.query(
            "UPDATE users SET name = $1, password = $2 WHERE id = $3",
            [name, password, req.params.id]
        );
        res.status(204).json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).send('Impossible de modifier un utilisateur !');
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE users where id = $1",
            [req.params.id]
        );
        res.status(204).json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).send('Impossible de supprimer un utilisateur !');
    }
})

module.exports = router;