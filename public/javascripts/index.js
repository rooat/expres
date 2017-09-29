
document.onload = forChart();
document.onload = currentPrice();
document.onload = myFunction();
var PublicAddress; 

function getDetails()
{
    var commodityOp = document.getElementById("commodity");
    var Commodity = commodityOp.options[commodityOp.selectedIndex].text;

    var tradeSel = document.getElementById("tradeSelection");
    var tradeSelection = tradeSel.options[tradeSel.selectedIndex].value;

    var TradeTimeop = document.getElementById("tradeTime");
    var TradeTime = TradeTimeop.options[TradeTimeop.selectedIndex].value;

    PublicAddress = document.getElementById("publicAddress").value;
    PublicAddress = PublicAddress.toLowerCase();
    console.log(Commodity);
    console.log(TradeTime);

    //the invest button will be disabled till the investor sends ether to contract
    document.getElementById("invest").disabled = true;

    axios.post('/api/addInvestor', {
		address : PublicAddress,
		commodity: Commodity,
        tradeTime : TradeTime,
        tradeSelection : tradeSelection
	}).then(function(response) {
        console.log(response.data.result);
        if(response.data.result == 'invalid ethereum address')
           { alert("YOU HAVE ENTERED AN INVALID ETHEREUM ADDRESS!  PLEASE ENTER AGAIN")
        location.reload();}
    })
}

var socket = io('http://localhost:3000');


    socket.on('EtherRecieved', function (data) {
    document.getElementById("invest").disabled = false; //will be enabled once the ether is recieved in the contract
    var dataInv = data.investor;
    dataInv = dataInv.toLowerCase();

    if(dataInv == PublicAddress)
        {
            axios.post('/api/ethSent',{
                investor : data.investor,
                amount : data.weiValue
            })
        }
        
    else{
        console.log("Invalid address entered");
    }
    });

    socket.on('tradeResult', function (data) {

        var x = document.getElementById("snackbar")
        snackbar.innerHTML = `Result : ${data.result}`;
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 10000);

    });

    function myFunction() {
   
    }


    function forChart()
    {
    
    var yaxis=0;
     axios.post('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
        .then((response) => {
            if(response.status == 200)
            yaxis =response.data.USD;
    
    var dataPoints = [];   
     
        var chart = new CanvasJS.Chart("chartContainer",{
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
                    // console.warn(new Date(value.time*1000));
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
               // var dateTimes = new Date(1370001284000);
    
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
        var currentPrice =document.getElementById("price");
        axios.post('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
        .then((response) => {
            if(response.status == 200)
            currentPrice.innerHTML = `$ ${response.data.USD}`;
        })
        .catch((err) => {});
    }
    



   
    





