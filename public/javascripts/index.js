// var socket = io.connect('https://streamer.cryptocompare.com/');

// Format: {SubscriptionId}~{ExchangeName}~{FromSymbol}~{ToSymbol}
// Use SubscriptionId 0 for TRADE, 2 for CURRENT and 5 for CURRENTAGG
// For aggregate quote updates use CCCAGG as market
// var subscription = ['2~CCCAGG~BTC~USD','2~CCCAGG~ETH~USD'];

// socket.emit('SubAdd', {subs:subscription} );

// socket.on("m", function(message){
// 	var messageType = message.substring(0, message.indexOf("~"));
//     var res = {};
//     console.log(message);
	// if (messageType === CCC.STATIC.TYPE.CURRENTAGG) {
	// 	res = CCC.CURRENT.unpack(message);
	// 	console.log(res);
	// 	updateQuote(res);
	// }						
// });