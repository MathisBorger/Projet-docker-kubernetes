const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
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

// router.get('/:search', (req, res) => (
//     res.status(200).json({
//         search: req.params.search
//     })
// ))

router.post('/create', async (req, res) => {
    const {title, description, date} = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO tasks VALUES ($1, $2, $3)",
            [title, description, date]
        );
        res.status(204).json(result.rows);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Impossible de créer une nouvelle tâche !');
    }
})

router.put('/edit/:id', async (req, res) => {
    const {title, description, date} = req.body;
    try {
        const result = await pool.query(
            "UPDATE tasks SET title = $1, description = $2, date = $3 WHERE id = $4",
            [title, description, date, req.params.id]
        );
        res.status(204).json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).send('Impossible de modifier une tâche !');
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE tasks where id = $1",
            [req.params.id]
        );
        res.status(204).json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).send('Impossible de supprimer une tâche !');
    }
})

module.exports = router;