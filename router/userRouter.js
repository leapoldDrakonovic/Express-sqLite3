const Router = require ('express');
const router = new Router ();
const userController = require('../controllers/userController')

router.post('/', userController.userLogin)
router.post('/', userController.userRegistration)

module.exports = router