const express = require("express");
const residencyModel = require("../Model/RecidencyModel");
const router = express.Router();
const { verifyToken } = require('../utils/verifyUser');
const { createListing, properties, oneproperties, saleproperties, rentproperties, userproperty, deleteproperty, updateproperty, getproperty, getproperties } = require("../controllers/Recidency.controller");

router.post('/create', createListing)
router.get('/properties', properties)
router.get('/properties/sale', saleproperties)
router.get('/properties/rent', rentproperties)
router.get('/properties/:id', oneproperties)
router.get('/userproperty/:id', userproperty)
router.delete('/delete/:id', deleteproperty)
router.post('/update/:id', updateproperty)
router.get('/get/:id', getproperty)
router.get('/get', getproperties)

module.exports = router;