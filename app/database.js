// 1. require le module
const {Client} = require('pg');

// 2. Créer un client
const db = new Client();

// 3. Connecter le client
db.connect();

// 4. Exporter le client connecté
module.exports = db;