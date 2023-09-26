// Conn router 
const {Router}  = require ('express');
const path = require('path')
const router = new Router();
const postRouter = require('./postRouter.js')
const userRouter = require('./userRouter.js')

// html path
const main_page = path.join(__dirname, '../', 'client', 'index.html')
const auth_page = path.join(__dirname, '../', 'client', 'pages', 'authPage.html')
const profile_page = path.join(__dirname, '../', 'client', 'pages', 'profilePage.html')

// Auth instr




// ROUTES

// Send main HTML
router.get('/api', (req, res)=> {
    res.sendFile(main_page)
})

router.get('/profile', (req, res)=> {
    res.sendFile(profile_page)
})

router.get('/api/auth', (req, res) => {
    try {
        res.sendFile(auth_page)
    } catch (error) {
        console.log(error);
    }
}) 


router.use('/api/cards', postRouter)
router.use('/api/cards', postRouter)
router.use('/api/cards/add', postRouter)

router.use('/api/auth/login', userRouter) 
router.use('/api/auth/registration', userRouter) 



module.exports = router