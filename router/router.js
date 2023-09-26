// Conn router 
const {Router}  = require ('express');
const path = require('path')
const router = new Router();
const postRouter = require('./postRouter.js')

// html path
const main_page = path.join(__dirname, '../', 'client', 'index.html')
const auth_page = path.join(__dirname, '../', 'client', 'pages', 'authPage.html')
const profile_page = path.join(__dirname, '../', 'client', 'pages', 'profilePage.html')

// Auth instr
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// ROUTES

// Send main HTML
router.get('/api', (req, res)=> {
    res.sendFile(main_page)
})

router.get('/profile', (req, res)=> {
    res.sendFile(profile_page)
})

router.use('/api/cards', postRouter)
router.use('/api/cards', postRouter)
router.use('/api/cards/add', postRouter)

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