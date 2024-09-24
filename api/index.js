
// this is a copy of "server.js" which I moved here to try and get the server to run.

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const stripeSecretKey=process.env.STRIPE_SECRET_KEY
const stripePublicKey=process.env.STRIPE_PUBLIC_KEY

const express = require('express');
const fs = require('fs');
const stripe = require('stripe')(stripeSecretKey);

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());

//tell app where the front end files are. 
app.use(express.static('public'));

app.get('/store', (req, res) => {
    console.log('store')
    fs.readFile('items.json', (error, data) => {
        if(error){
            res.status(500).end()
        } else {
            res.render('store.ejs', {
                stripePublicKey: stripePublicKey, 
                items: JSON.parse(data)
            });
        }
    });
});

app.post('/purchase', (req, res) => {
    fs.readFile('items.json', (error, data) => { 
        if(error){
            res.status(500).end()
        } else {
            const itemsJson = JSON.parse(data);
            const itemsArray = itemsJson.music.concat(itemsJson.merch);
            let total = 0;

            req.body.items.forEach(item => {
                const itemJson = itemsArray.find(
                    function (i) { return i.id == item.id}
                );
                total = total + itemJson.price * item.quantity;
            })

            stripe.charges.create({
                amount: total,
                source: req.body.stripeTokenId,
                currency: 'usd'
            }).then(() => {
                console.log('Charge Successful');
                res.json({ message: 'Successfully purchased items'})
            }).catch(() => {
                console.log('Charge Fail');
                res.status(500).end();
            });
        }
    });

});

app.post('/test', (req, res) => {
    res.json({ message: 'Test route worked!'})
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
  });

app.listen(3000)

module.exports = app;