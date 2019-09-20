
exports.calcTotal = function (jsonObject) {
    console.log(typeof jsonObject);
    let kopycart = jsonObject;
    let sum = kopycart.reduce(function (acu, cur) { //here we use buit in reduce method old value + current value
        return acu + cur.qty * cur.itemPrice;
        
    }, 0);
    sum = Math.round(sum * 100) / 100;
    send = sum.toString();
    return send;
     
}