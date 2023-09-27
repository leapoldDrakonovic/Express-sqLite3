const Router = require ('express');
const router = new Router ();
const userController = require('../controllers/userController')

router.post('/login', userController.userLogin)
router.post('/registration', userController.userRegistration)

module.exports = router