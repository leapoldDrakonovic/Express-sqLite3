const Router = require ('express');
const router = new Router ();
const postController = require('../controllers/postController.js')


router.get('/', postController.getAllCards)
router.delete('/', postController.deleteAllCards)
router.post('/', postController.addCard)

module.exports = router
