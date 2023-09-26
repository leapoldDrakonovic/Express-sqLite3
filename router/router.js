// Conn router 
const {Router}  = require ('express');
const path = require('path')
const router = new Router();
const postRouter = require('./postRouter.js')
const userRouter = require('./userRouter.js')

// html path
const main_page = path.join(__dirname, '../', 'client', 'index.html')
const auth_page = path.join(__dirname, '../', 'client', 'pages', 'authPage.html')
const registration_page = path.join(__dirname, '../', 'client', 'pages', 'registrationPage.html')
const profile_page = path.join(__dirname, '../', 'client', 'pages', 'profilePage.html')


router.use('/api/cards', postRouter)
router.use('/api/cards', postRouter)
router.use('/api/cards/add', postRouter)

router.use('/api/auth/login', userRouter) 
router.use('/api/auth/registration', userRouter) 



// Send main HTML
router.get('/api', (req, res)=> {
    try {
        res.sendFile(main_page)
    } catch (error) {
        console.error(error)
    }
})

router.get('/profile', (req, res)=> {
    try {
        res.sendFile(profile_page)
    } catch (error) {
        console.error(error);
    }
})

router.get('/auth', (req, res) => {
    try {
        res.sendFile(auth_page)
    } catch (error) {
        console.log(error);
    }
}) 

router.get('/registration', (req, res) => {
    try {
        res.sendFile(registration_page)
    } catch (error) {
        console.log(error);
    }
}) 




module.exports = router