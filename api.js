const express = require('express');
const path = require('path');
const pool = require('./backend/db/database');
const port = process.env.PORT || 5000;

const app = express();
const router = express.Router();

// Sert les fichiers du dossier frontend
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => (
    res.status(200).json({
        message: 'Toutes les tâches'
    })
))

router.get('/login', async (req, res) => {
    try {
        const { name, password } = req.query;
        
        const result = await pool.query(
            "SELECT * FROM users WHERE name = $1 AND password = $2 LIMIT 1",
            [name, password]
        );

        const user = result.rows[0];
        
        res.json({ id: user ? user.id : null });
    } catch (err) {
        console.error(err);
        res.status(500).send('L\'utilisateur n\'existe pas !');
    }
})

app.use('/', router)

app.use('/users', require('./routes/routes'))

app.listen(port, (err) => {
    console.log('Serveur est en ligne !');
})