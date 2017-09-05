var express = require('express');
var router = express.Router();

var express = require('express');
var router = express.Router();


var addContact = require('../api/addContact');
var getContact = require('../api/getContact');


router.post('/getcontact', getContact.fetch);
router.post('/addcontact', addContact.save);

module.exports = router;
