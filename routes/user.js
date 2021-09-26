const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const login = require('../middleware/login');

router.post('/insert', userController.insertUser);
router.get('/', login, userController.getUser)
router.patch('/update/:id', login, userController.updateUser)
router.delete('/delete/:id',login, userController.deleteUser)
router.post('/login', userController.login)

module.exports = router;