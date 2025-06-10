const express = require('express');
const path = require('path');
const pool = require('./app/backend/db/database');
const fs = require('fs');
const port = process.env.PORT || 5000;

const app = express();
const router = express.Router();


router.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'app', 'frontend', 'login.html');
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        console.error('Fichier login.html introuvable :', filePath);
        res.status(404).send('Fichier introuvable : ', filePath);
    }
})

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

app.use('/users', require('./app/routes/routes'))

// Sert les fichiers du dossier frontend
app.use(express.static(path.join(__dirname, 'app/frontend')));

app.listen(port, (err) => {
    console.log('Serveur est en ligne !');
})