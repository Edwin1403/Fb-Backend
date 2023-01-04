const express = require('express');
const { home, register, } = require('../controllers/user');

const router = express.Router();

router.get('/user', home)
router.post('/register', register)


module.exports = router;