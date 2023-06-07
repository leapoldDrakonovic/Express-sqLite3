// Conn router 
const {Router}  = require ('express');
const path = require('path')
const router = Router();


// html path
const main_page = path.join(__dirname, '../', 'client', 'index.html')


//  Sqlite connect
const sqlite = require ('sqlite3')
const db_name = path.join(__dirname,'../', 'data', 'apptest.db')
const usdb_name = path.join(__dirname,'../', 'data', 'users.db')

// DataBase run
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
        database.run (`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            password text,
            role text
        )`, (err) => {
            if (err) console.log(err); 
        })
    }
})

// ROUTES

// Send main HTML
router.get('/api', (req, res)=> {
    res.sendFile(main_page)
})

// Get all cards
router.get('/api/cards', (req, res, next) => {
    var sql = "select * from posts"
    var params = []
    database.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
})

// Delete card route
router.delete('/api/cards', (req, res) => {
    var deletePosts = 'DELETE FROM posts';
    database.run(deletePosts, (err) => {
        if (!err) return
        console.log(err);
    })
})

// Add card route
router.post('/api/cards/add', (req, res) => {
    try {    
        var insert = 'INSERT INTO posts (theme, dsc, date) VALUES (?,?,?)'
        database.run(insert, [req.body.theme, req.body.text, req.body.date])   
    } catch (error) {
        console.log(error);
    }
})




module.exports = router