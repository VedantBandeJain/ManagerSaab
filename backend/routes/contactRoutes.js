const express=require('express');
const router=express.Router();
const {getContact,getContacts, postContact,putContact,deleteContact}=require('../controllers/contactController');
const validateToken = require('../middlewares/validateTokenHandler');


router.use(validateToken);
router.route('/').get(getContacts).post(postContact);
router.route('/:id').get(getContact).put(putContact).delete(deleteContact);


 module.exports=router;