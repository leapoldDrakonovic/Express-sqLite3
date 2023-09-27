const {userDataBase} = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class userController {
    userLogin = async (req, res) => {
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
                res.json({status: 'succsess'})
                res.json({ token });
                });
            });
    
            console.log(req.body);
        } catch (error) {
            console.log(error);
        }
    }

    userRegistration = async (req, res) => {
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
    }
}

module.exports = new userController()