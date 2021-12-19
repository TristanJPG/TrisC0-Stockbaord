
// Author: Tristan Prater- CEO of TrisC0
// Usage: Used for managing the stockboard of wishlist. WITHOUT BACKEND


/* LINKS
https://www.npmjs.com/package/express
https://www.npmjs.com/package/body-parser
https://www.npmjs.com/package/yahoo-stock-prices
https://getbootstrap.com/docs/5.0/examples/sign-in/
https://getbootstrap.com/docs/5.0/examples/cover/
*/ 


const express = require('express');
const app   = express();
const https = require('https');
const ejs   = require('ejs')
const bodyParser = require('body-parser');
const stocks = require('yahoo-stock-prices');
const port = process.env.PORT;

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public')); 

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res) {

    
    const username = req.body.username;
    const password = req.body.password;
    stocks.getCurrentPrice('AAPL', (err, aaplPrice) => {
        const AAPL = aaplPrice
        stocks.getCurrentPrice('TXN', (err, txnPrice) => {
            const TXN =  txnPrice
            stocks.getCurrentPrice('DIS', (err, disPrice) => {
                const DIS = disPrice
                stocks.getCurrentPrice('AMC', (err, amcPrice) => {
                   const AMC = amcPrice
                   
                   if (username === "trisc0" && password === "&FZA$yjY7$8B5Y") {
                       res.render(__dirname + "/stockFace.ejs", {
                           stock1: AAPL,
                            stock2: TXN,
                            stock3: DIS,
                            stock4: AMC
                        
                       });
                   } else {
                       res.sendFile(__dirname + "/failure.html");
                   
                   };
                });
            });
        });
    });
    
       
    
        
});


app.get('/stockBoard', function(req,res){
    
    res.render(__dirname + '/stockFace.ejs');

}); 

app.post("/stockBoard", function(req, res){
    res.redirect(__dirname + "/index.html");
});

app.post('/failure', function(req, res) {
    res.redirect('/');
});

app.listen(3000, function() {
    console.info("server is running on port " + '3000');
});

