const express = require('express');
const { home, register, activateAccount, } = require('../controllers/user');

const router = express.Router();

router.get('/user', home)
router.post('/register', register)
router.post('/activate', activateAccount)


module.exports = router;