const  express = require('express')
const router =  express.Router();
const auth = require('../controller/Auth')
router.post('/signUp',auth.signUp)
router.post('/login',auth.Login)
module.exports = router;