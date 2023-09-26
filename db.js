const path = require('path')
const sqlite = require ('sqlite3').verbose()
const db_name = path.join(__dirname,'./', 'data', 'apptest.db')
const usdb_name = path.join(__dirname,'./', 'data', 'users.db')

const database = new sqlite.Database(db_name, err=> {  
    if (err) {
        console.log(err);
    } else {
        console.log('Post database started');
        database.run(`CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            theme text,
            dsc text,
            date text
        )`, (err) => {
            if (err) console.log(err); 
        })
    }
})

const userDataBase = new sqlite.Database (usdb_name, err=> {
    if(err) {
        console.log(err);
    } else {
        console.log('User database started');
        userDataBase.run (`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            password text
        )`, (err) => {
            if (err) console.log(err); 
        })
    }
})

module.exports = {database, userDataBase}