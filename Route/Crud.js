const  express = require('express')
const JWTverify = require('../middleware/JWTverify')
const router =  express.Router();
const crud = require('../controller/Crud')
router.get('/',JWTverify,crud.getData)
router.post('/',JWTverify,crud.addData)
router.put('/:id',JWTverify,crud.updateData)
router.put('/check/:id/:checkstatus',JWTverify,crud.checkHandle)
router.delete('/:id',JWTverify,crud.deleteData)
module.exports = router;