var Web3 = require('web3');
var net = require('net');
var client  = new net.Socket();

if (typeof web3 !== 'undefined') 
{
    web3 = new Web3(web3.currentProvider);
} 
else {
    web3 = new Web3(new Web3.providers.IpcProvider("/Users/rahul703/Library/Ethereum/geth.ipc",client));
}

module.exports = web3;




// 