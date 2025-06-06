const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

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

        res.sendFile(path.join(__dirname, '../frontend', 'login.html'));
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Impossible de récupérer les utilisateur !');
    }
})

router.get('/:id/tasks', async (req, res) => {
    try {
        const data = await fs.readFile('mock.json');
        const tasks = JSON.parse(data);

        const userId = parseInt(req.params.id, 10);
        const userTasks = tasks.filter(task => task.user_id === userId);

        if (userTasks.length === 0) {
            return res.status(404).send('Aucune tâche trouvée pour cet utilisateur');
        }

        res.status(200).json(userTasks);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la récupération des tâches !");
    }
});

router.post('/:id/tasks/create', async (req, res) => {
    // const { name, password } = req.body;
    const { id } = req.params;
    const { description } = req.query;

    try {
        const data = await fs.readFile("mock.json");
        const tasks = JSON.parse(data);

        const newTask = {
            id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
            user_id: parseInt(id, 10),
            title: `Nouvelle tâche ${Date.now()}`,
            description: description || '',
            date: new Date().toISOString().split('T')[0]
        };

        console.log(newTask);

        tasks.push(newTask);
        await fs.writeFile("mock.json", JSON.stringify(tasks, null, 4));

        res.status(200).json(newTask);

        // BDD - désactivée
        /*
        const result = await pool.query(
            "INSERT INTO users VALUES ($1, $2)",
            [name, password]
        );
        res.status(204).json(result.rows);
        */
    } catch (err) {
        console.error(err);
        res.status(500).send('Impossible de créer une tâche pour cet utilisateur !');
    }
});

router.delete('/:userId/tasks/:taskId/delete', async (req, res) => {
    const { userId, taskId } = req.params; // ID de l'utilisateur

    try {
        const data = await fs.readFile("mock.json", 'utf-8');
        let tasks = JSON.parse(data);

        const taskIndex = tasks.findIndex(
            task => task.user_id == parseInt(userId, 10) && task.id == parseInt(taskId, 10)
        );

        if (taskIndex === -1) {
            return res.status(404).json({ message: "Tâche non trouvée pour cet utilisateur." });
        }

        tasks.splice(taskIndex, 1); // Supprime la tâche

        await fs.writeFile("mock.json", JSON.stringify(tasks, null, 4), 'utf-8');
        res.status(200).json({ message: `Tâche ${taskId} supprimée avec succès.` });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la suppression de la tâche.");
    }
});

router.patch('/:userId/tasks/:taskId/status/', async (req, res) => {
    const { userId, taskId, status } = req.params;
    try {
        const filePath = "mock.json";
        const data = await fs.readFile(filePath, 'utf-8');
        const tasks = JSON.parse(data);

        const task = tasks.find(
            t => t.user_id == parseInt(userId, 10) && t.id == parseInt(taskId, 10)
        );

        if (!task) {
            return res.status(404).json({ message: "Tâche non trouvée." });
        }

        if (task.status == "completed") {
            task.status = "to complete";
        }else if (status == "to complete") {
            task.status = "completed";
        } else {
            return res.status(400).json({ message: "Statut invalide." });
        }

        await fs.writeFile(filePath, JSON.stringify(tasks, null, 4), 'utf-8');
        res.status(200).json({ message: `Statut de la tâche ${taskId} mis à jour en ${task.status}` });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la mise à jour du statut.");
    }
});

module.exports = router;