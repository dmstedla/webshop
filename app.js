const products = require('./public/assets/js/products.json');
const mathl = require('./private/calculateSum');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
//add the router
app.listen(process.env.port || 489);
console.log('Running at Port 489');
console.log(products);

router.post('/calculate', function (req, res) {
    // req.body == cart object
    let calculatedPrice = mathl.calcTotal(req.body);

    let sendObject = {
        "Total": calculatedPrice
    };

    res.send(JSON.stringify(sendObject));
});

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}));
app.use('/', router);
 