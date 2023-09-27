// Main consts
const express = require ('express')
const app = express()   
require('dotenv').config()
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const router = require ('./router/router.js')


// Ways to files
const static = path.join(__dirname, '/client')
const css = path.join(__dirname, 'client', 'style')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(static))
app.use(express.static(css))

// CORS backway
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

// Use Router
app.use(router)

//  Start function
async function start () {
    try {
        app.listen (PORT, ()=>{
            console.log(`server started at PORT ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start()


