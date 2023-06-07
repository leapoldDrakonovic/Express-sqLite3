// Main consts
const express = require ('express')
const app = express()   
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const router = require ('./router/router.js')

// Ways to files
const static = path.join(__dirname, 'client')
const main_page = path.join(__dirname, 'client', 'index.html')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(static))

// ROUTES

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


/*
// Send main page
app.get('/', router)
// Work with cards
app.get('/api/cards', router)
app.post('/api/cards/add', router)
app.delete('/api/cards', router)
*/ 







