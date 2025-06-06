const express = require('express');
const path = require('path');
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

        // const result = await pool.query(
        //     "SELECT * FROM users WHERE name = $1 AND password = $2",
        //     [name, password]
        // );
        const mock = [
            { id: 1, name: 'John Doe', password: 'password1' },
            { id: 2, name: 'Jane Smith', password: 'password2' },
            { id: 3, name: 'Alice Johnson', password: 'password3' },
            { id: 4, name: 'Bob Brown', password: 'password4' },
        ];

        const user = mock.find(u => u.name.toLowerCase() == name && u.password == atob(password));
        
        console.log(user ? user.id : null)
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