var express = require('express');
var router = express.Router();

var addInvestor = require('../api/addInvestor');
// var getContact = require('../api/getContact');


// router.post('/getcontact', getContact.fetch);
router.post('/addInvestor', addInvestor.addInvestor);

module.exports = router;
