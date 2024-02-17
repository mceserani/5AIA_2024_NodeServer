import express from 'express';
import sqlite3 from 'sqlite3';

const app = express();
app.use(express.json());

// Create a sqlite database with a table Studente(Id, Nome, Cognome, DataNascita, Classe, Indirizzo, Cellulare). Id è chiave primaria.
let db = new sqlite3.Database('Scuola.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the scuola database.');
});
db.run('CREATE TABLE IF NOT EXISTS Studente(Id INTEGER PRIMARY KEY, Nome TEXT, Cognome TEXT, DataNascita DATE, Classe TEXT, Indirizzo TEXT, Cellulare TEXT)');

app.post('/insert', (req, res) => {
    let sql = 'INSERT INTO Studente(Nome, Cognome, DataNascita, Classe, Indirizzo, Cellulare) VALUES(?, ?, ?, ?, ?, ?)';
    let data = req.body;
    let nome = data.nome;
    let cognome = data.cognome;
    let dataNascita = data.dataNascita;
    let classe = data.classe;
    let indirizzo = data.indirizzo;
    let cellulare = data.cellulare;
    db.run(sql, [nome, cognome, dataNascita, classe, indirizzo, cellulare], function(err) {
        if (err) {
            res.send('Errore! Non è stato possibile inserire i dati.');
            return console.error(err.message);
        }
        console.log(`Rows inserted ${this.changes}`);
        res.send('Dati inseriti correttamente.');
    });
    
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
