const express = require('express');
const router = express.Router();
const tellController = require('../controllers/tellController');;
const login = require('../middleware/login');


router.post('/insert', login, tellController.insertFone);
router.patch('/update/:id', login, tellController.updateTell);
router.delete('/delete/:id', login, tellController.deleteTell);
router.get('/:id', login, tellController.getTell);

module.exports = router;