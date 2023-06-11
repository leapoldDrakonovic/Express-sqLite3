// Conn router 
const {Router}  = require ('express');
const path = require('path')
const router = Router();


// html path
const main_page = path.join(__dirname, '../', 'client', 'index.html')
const auth_page = path.join(__dirname, '../', 'client', 'pages', 'authPage.html')


//  Sqlite connect
const sqlite = require ('sqlite3').verbose()
const db_name = path.join(__dirname,'../', 'data', 'apptest.db')
const usdb_name = path.join(__dirname,'../', 'data', 'users.db')


// Auth instr
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        userDataBase.run (`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            password text
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
router.post('/api/cards/add', (req, res, next) => {
    try {    
        var insert = 'INSERT INTO posts (theme, dsc, date) VALUES (?,?,?)'
        database.run(insert, [req.body.theme, req.body.text, req.body.date])
        res.status;
        next()
         
    } catch (error) {
        console.log(error);
    }
})

router.get('/api/auth', (req, res) => {
    try {
        res.sendFile(auth_page)
    } catch (error) {
        console.log(error);
    }
}) 

router.post('/api/auth/login', (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        userDataBase.get('SELECT * FROM users WHERE name = ?', [username], (err, row) => {
            if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
            }

            if (!row) {
            return res.status(401).json({ error: 'Invalid username or password' });
            }

            // Compare the passwords
            bcrypt.compare(password, row.password, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (!result) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            // Generate a JWT token
            const token = jwt.sign({ username: row.username }, 'secretkey');

            res.json({ token });
            });
        });

        console.log(req.body);
    } catch (error) {
        console.log(error);
    }
}) 

router.post('/api/auth/registration', (req, res) => {
    try {
        const {username, password} = req.body

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal server error' });
            }
        
            // Insert the user into the database
            userDataBase.run('INSERT INTO users (name, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
              }
        
              res.status(201).json({ message: 'User created successfully' });
            });
          });
        

        console.log(req.body);
    } catch (error) {
        console.log(error);
    }
}) 



module.exports = router