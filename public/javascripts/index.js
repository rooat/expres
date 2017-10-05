
document.onload = BTCChart();
document.onload = etherChart();
document.onload = ltcChart();
document.onload = currentPrice();



var btcTradeCount = "false";
var ethTradeCount = "false";
var ltcTradeCount = "false";
toastr.options.timeOut = 20000;

function getDetails()
{
    document.getElementById("invest").disabled = true;
    var commodityOp = document.getElementById("commodity");
    var Commodity = commodityOp.options[commodityOp.selectedIndex].text;

    var tradeSel = document.getElementById("tradeSelection");
    var tradeSelection = tradeSel.options[tradeSel.selectedIndex].value;

    var TradeTimeop = document.getElementById("tradeTime");
    var TradeTime = TradeTimeop.options[TradeTimeop.selectedIndex].value;

    if (Commodity == 'BTC')
        btcTradeCount = "true";
    else if (Commodity == 'ETH')
        ethTradeCount = "true"
    else if (Commodity == 'LTC')
        ltcTradeCount = "true";

    console.log(Commodity);
    console.log(TradeTime);
    console.log(web3.eth.coinbase);


    var addr = web3.eth.coinbase;
    addr = addr.toLowerCase();
    axios.post('/api/addInvestor', {
		address : addr,
		commodity: Commodity,
        tradeTime : TradeTime,
        tradeSelection : tradeSelection
	}).then(function(response) {
        console.log(response.data.result);
        if(response.data.result == 'invalid ethereum address')
           {
                alert("YOU HAVE ENTERED AN INVALID ETHEREUM ADDRESS! PLEASE ENTER AGAIN");
                location.reload();
            }
    })
}


var socket = io('http://localhost:3000');

    socket.on('EtherRecieved', function (data) {
        document.getElementById("invest").disabled = false;
        var dataInv = data.investor;
        dataInv = dataInv.toLowerCase();
                if(btcTradeCount == "true")
                    {
                        toastr.success('Ether recieved for BTC trade');
                        btcTradeCount = "false";
                        axios.post('/api/ethSentBitcoin',{
                            investor : dataInv,
                            amount : data.weiValue
                        })
                }
                if (ethTradeCount == "true")
                    {
                        toastr.success('Ether recieved for ETH trade');
                        ethTradeCount = "false";
                        axios.post('/api/ethSentEther',{
                            investor : dataInv,
                            amount : data.weiValue
                        })
                    }
                if (ltcTradeCount == "true")
                    {
                        toastr.success('Ether recieved for LTC trade');
                        ltcTradeCount = "false";
                        axios.post('/api/ethSentLitecoin',{
                            investor : dataInv,
                            amount : data.weiValue
                        })
                    }

    });

    socket.on('tradeResult', function (data) {
        console.log("data",data);

        toastr.info(`Result : ${data.result}` +' </br>  '+ `Price1 : ${data.price1}` + '</br> ' + `Price2 : ${data.price2}`);


    });



    function BTCChart()
    {
            var yaxis=0;
            axios.post('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
                .then((response) => {
                    if(response.status == 200)
                    yaxis =response.data.USD;
            
            var dataPoints = [];   
            
                var chart = new CanvasJS.Chart("btcChartContainer",{
                    theme: "light2",
                    animationEnabled: true,
                    animationDuration: 2000,
                    title :{
                        // text: "Live Data"
                    },
                    axisX: { 
                        xValueType: "dateTime",
                        intervalType: "mm",        
                        valueFormatString: "hh:mm TT", 
                        title: "Time"
                    },
                    axisY: { 
                        minimum:yaxis - 150,
                        maximum:yaxis + 150,
                        interval:50,                      
                        title: "Price",
                        prefix:"$"
                    },
                    data: [{
                        type: "area",
                        dataPoints : dataPoints
                    }],
                    backgroundColor: "#F5DEB3"
                });
            
                axios.get('https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG')
                .then((response) => {
                    if(response.status == 200)
                    {
                        $.each(response.data.Data, function(key, value){
                            dataPoints.push({x: new Date(value.time*1000), y: value.close});
                        });
                        chart.render();
                    }
                })
                .catch((error) => {
                    location.replace('/error');
                });
            
            
                var updateChart = function () {
            
                    axios.post('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
                    .then((response) => {
                        if(response.status == 200)
                        yVal= response.data.USD;

                        dataPoints.push({x: new Date(),y: yVal,});
                        
                                if (dataPoints.length >  600 )
                                {
                                    dataPoints.shift();                
                                }
                    
                    chart.render();     
                    })
                };
                updateChart();
                
            
            var updateInterval = 2000;
            setInterval(function(){updateChart()}, updateInterval);
            })
    }


    function etherChart()
    {
            var yaxis=0;
            axios.post('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
                .then((response) => {
                    if(response.status == 200)
                    yaxis =response.data.USD;
            
            var dataPoints = [];   
            
                var chart = new CanvasJS.Chart("etherChartContainer",{
                    theme: "light2",
                    animationEnabled: true,
                    animationDuration: 2000,
                    title :{
                        // text: "Live Data"
                    },
                    axisX: { 
                        xValueType: "dateTime",
                        intervalType: "mm",        
                        valueFormatString: "hh:mm TT", 
                        title: "Time"
                    },
                    axisY: { 
                        minimum:yaxis - 150,
                        maximum:yaxis + 150,
                        interval:50,                      
                        title: "Price",
                        prefix:"$"
                    },
                    data: [{
                        type: "area",
                        dataPoints : dataPoints
                    }],
                    backgroundColor: "#F5DEB3"
                });
            
                axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
                .then((response) => {
                    if(response.status == 200)
                    {
                        $.each(response.data.Data, function(key, value){
                            dataPoints.push({x: new Date(value.time*1000), y: value.close});
                        });
                        chart.render();
                    }
                })
                .catch((error) => {
                    location.replace('/error');
                });
            
            
                var updateChart = function () {
            
                    axios.post('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
                    .then((response) => {
                        if(response.status == 200)
                        yVal= response.data.USD;

                        dataPoints.push({x: new Date(),y: yVal,});
                        
                                if (dataPoints.length >  600 )
                                {
                                    dataPoints.shift();                
                                }
                    
                    chart.render();     
                    })
                
                
                };
                updateChart();
                
            
            var updateInterval = 2000;
            setInterval(function(){updateChart()}, updateInterval);
            })
    }


    function ltcChart()
    {
            var yaxis=0;
            axios.post('https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD')
                .then((response) => {
                    if(response.status == 200)
                    yaxis =response.data.USD;
            
            var dataPoints = [];   
            
                var chart = new CanvasJS.Chart("ltcChartContainer",{
                    theme: "light2",
                    animationEnabled: true,
                    animationDuration: 2000,
                    title :{
                        // text: "Live Data"
                    },
                    axisX: { 
                        xValueType: "dateTime",
                        intervalType: "mm",        
                        valueFormatString: "hh:mm TT", 
                        title: "Time"
                    },
                    axisY: { 
                        minimum:yaxis - 50,
                        maximum:yaxis + 50,
                        interval:20,                      
                        title: "Price",
                        prefix:"$"
                    },
                    data: [{
                        type: "area",
                        dataPoints : dataPoints
                    }],
                    backgroundColor: "#F5DEB3"
                });
            
                axios.get('https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD')
                .then((response) => {
                    if(response.status == 200)
                    {
                        $.each(response.data.Data, function(key, value){
                            dataPoints.push({x: new Date(value.time*1000), y: value.close});
                        });
                        chart.render();
                    }
                })
                .catch((error) => {
                    location.replace('/error');
                });
            
            
                var updateChart = function () {
            
                    axios.post('https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD')
                    .then((response) => {
                        if(response.status == 200)
                        yVal= response.data.USD;

                        dataPoints.push({x: new Date(),y: yVal,});
                        
                                if (dataPoints.length >  600 )
                                {
                                    dataPoints.shift();                
                                }
                    
                    chart.render();     
                    })
                
                
                };
                updateChart();
                
            
            var updateInterval = 2000;
            setInterval(function(){updateChart()}, updateInterval);
            })
    }
    
    
    function currentPrice()
    {
            var currentPrice1 =document.getElementById("priceBtc");
            axios.post('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
            .then((response) => {
                if(response.status == 200)
                currentPrice1.innerHTML = `$ ${response.data.USD}`;
            })
            .catch((err) => {});

            var currentPrice2 =document.getElementById("priceEth");
            axios.post('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
            .then((response) => {
                if(response.status == 200)
                currentPrice2.innerHTML = `$ ${response.data.USD}`;
            })
            .catch((err) => {});

            var currentPrice3 =document.getElementById("priceLtc");
            axios.post('https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD')
            .then((response) => {
                if(response.status == 200)
                currentPrice3.innerHTML = `$ ${response.data.USD}`;
            })
            .catch((err) => {});
    }
    


    // MetaMask injects the web3 library for us.
    window.onload = function() {
        if (typeof web3 === 'undefined') {
          document.getElementById('meta-mask-required').innerHTML = 'You need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this example'
        }
      }
      function send() {
        web3.eth.sendTransaction({
          from: web3.eth.coinbase,
          to: '0x77bd8858b05086f007146889d58c873aa96603dd',
          value: web3.toWei(document.getElementById("amount").value, 'ether')
        }, function(error, result) {
          if (!error) {
            document.getElementById('response').innerHTML = 'Success: <a href="https://testnet.etherscan.io/tx/' + result + '"> View Transaction </a>'
          } else {
            document.getElementById('response').innerHTML = '<pre>' + error + '</pre>'
          }
        })
      }





