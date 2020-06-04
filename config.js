var db = require('./mongoConfig');
var cry_data = require('./conf/crypto.json');
var FormatClass = require("./utils/format_util");
var CryptoClass = require('./utils/crypto_util')

module.exports = {
    db,
    cry_data,
    format: new FormatClass(),
    crypto: new CryptoClass()
}