const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const pool = require('../backend/db/database');

router.get('/', async (req, res) => {
    const filePath = path.join('..', 'frontend', 'login.html');
if (fs.existsSync(filePath)) {
  res.sendFile(filePath);
} else {
  console.error('Fichier login.html introuvable :', filePath);
  res.status(404).send('Fichier introuvable', filePath);
}
    // try {
    //     res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).send('Impossible de récupérer les utilisateur !');
    // }
})

router.get('/:id/tasks', async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10);
        
        const result = await pool.query(
            "select * from tasks where user_id = $1",
            [userId]
        );

        const userTasks = result.rows;

        res.status(200).json(userTasks);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la récupération des tâches !");
    }
});

router.post('/:id/tasks/create', async (req, res) => {
    const { id } = req.params;
    const { description } = req.query;

    try {
        const newTask = {
            // id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
            user_id: parseInt(id, 10),
            title: `Nouvelle tâche ${Date.now()}`,
            description: description || '',
            date: new Date().toISOString().split('T')[0]
        };

        await pool.query(
            "INSERT INTO tasks (user_id, title, description, date) VALUES ($1, $2, $3, $4)",
            [newTask.user_id, newTask.title, newTask.description, newTask.date]
        );

        res.status(200).json(newTask);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Impossible de créer une tâche pour cet utilisateur !');
    }
});

router.delete('/:userId/tasks/:taskId/delete', async (req, res) => {
    const { userId, taskId } = req.params;

    try {
        await pool.query(
            "DELETE FROM tasks WHERE user_id = $1 AND id = $2",
            [userId, taskId]
        );
        
        res.status(200).json({ message: `Tâche ${taskId} supprimée avec succès.` });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la suppression de la tâche.");
    }
});

router.patch('/:userId/tasks/:taskId/status/', async (req, res) => {
    const { userId, taskId } = req.params;
    try {
        await pool.query(
            "UPDATE tasks SET status = CASE WHEN status = 'completed' THEN 'to complete' ELSE 'completed' END WHERE user_id = $1 AND id = $2",
            [userId, taskId]
        );

        res.status(200).json({ message: `Statut de la tâche ${taskId} mis à jour`});
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la mise à jour du statut.");
    }
});

module.exports = router;