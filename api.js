const express = require('express');
const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => (
    res.status(200).json({
        message: 'Toutes les tâches'
    })
))

app.use('/users', require('./routes/users'))

app.use('/tasks', require('./routes/tasks'))

app.listen(port, (err) => {
    console.log('Serveur est en ligne !');
})