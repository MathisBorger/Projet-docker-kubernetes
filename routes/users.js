const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM users"
        );
        res.status(204).json(result.rows);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Impossible de récupérer les utilisateur !');
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