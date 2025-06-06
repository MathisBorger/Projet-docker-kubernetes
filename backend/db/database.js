const {Pool} = require('pg')

module.exports = new Pool({
    user: 'user',
    host: 'localhost',
    database: 'bdd_name',
    password: 'mdp',
    port: process.env.BDD_PORT || 5432,
});