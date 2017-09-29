var Web3 = require('web3');

if (typeof webrpc !== 'undefined') 
{
    webrpc = new Web3(webrpc.currentProvider);
} 
else {
    webrpc = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

module.exports = webrpc;
