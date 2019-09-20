/* ----------------------------
/*  Name: WebShopProject
    Author: Demsachew Mekonnen, Ashley Berlin, Sileshi Chukala
    Version: 1.0
/* -------------------------- */

 "use strict";
 // First We have crated CART object with tow properties key and contents arry
 var CART = {

     KEY: 'productCollection',
     contents: [],
     //check localStorage and initialize the contents of CART.contents
     init: function init() {

         var kopyKey = localStorage.getItem(CART.KEY);
         //we associat  contents with key to differenciat with other data which is in our localstorage
         if (kopyKey) {
             CART.contents = JSON.parse(kopyKey);
         } else {
             CART.contents = [];

         }
         CART.sync(); // to uppdat our localstorage
     },
     // this is a promising method to set data in our  localstorage  by changing jsonfile to object form from our products
     sync: async function sync() {
         var kopyContents = JSON.stringify(CART.contents);

         await localStorage.setItem(CART.KEY, kopyContents);
     },
     //end setting localstorag

     // here is we have some methods which use to crate cart shop i.e add, sort, find, increase, decrease , reduce, remove and filter
     find: function find(id) {
         //find an item in the cart by it's id
         var match = CART.contents.filter(function (item) {
             if (item.id == id) {
                 return true;
             }
         });
         if (match && match[0] == match[0]) { // if the above arrgument true we will take the first item or match[0]
             return match[0];
         }
     },

     add: function add(id) {

         // we check that it is not in the cart  then add a new item to the cart
         if (CART.find(id)) {
             CART.increase(id, 1);
         } else {
             var arr = PRODUCTS.filter(function (product) { //filter is built in function 
                 if (product.id == id) {
                     return true;
                 }
             });

             if (arr && arr[0]) {
                 // we create constructor  to create new object to cart
                 var obj = {
                     id: arr[0].id,
                     name: arr[0].name,
                     brand: arr[0].brand,
                     title: arr[0].title,
                     qty: 1,
                     itemPrice: arr[0].price,
                     img: arr[0].img,
                     img1: arr[0].img1,
                     img2: arr[0].img2,
                     img3: arr[0].img3,
                     comment: arr[0].comment,
                     rating: arr[0].rating,
                     comment1: arr[0].comment,
                     rating1: arr[0].rating,
                     comment2: arr[0].comment,
                     rating2: arr[0].rating,
                     comment3: arr[0].comment,
                     rating3: arr[0].rating
                 };
                 CART.contents.push(obj); //update localStorage

                 CART.sync();
             }
         }
     },
     increase(id, qty = 1) {
         //increase the quantity of an item in the cart
         CART.contents = CART.contents.map(item => {
             if (item.id === id)
                 item.qty = item.qty + qty;
             return item;
         });
         //update localStorage
         CART.sync();
     },
     reduce(id, qty = 1) {
         //reduce the quantity of an item in the cart
         CART.contents = CART.contents.map(item => {
             if (item.id === id)
                 item.qty = item.qty - qty;
             return item;
         });
         // this method we use to remove the items from localstorage if the quantity is 0
         CART.contents.forEach(async item => {
             if (item.id === id && item.qty === 0)
                 await CART.remove(id);
         });
         //update localStorage
         CART.sync();
     },
     remove(id) {
         //remove an item entirely from CART.contents if the filtered item id is different
         CART.contents = CART.contents.filter(item => {
             if (item.id !== id)
                 return true;
         });
         //update localStorage
         CART.sync();
     },
     empty() {
         //empty whole cart
         CART.contents = [];
         //update localStorage
         CART.sync();
     },
     //we sort item by field - id
     sort: function sort(field = 'id') {

         let sorted = CART.contents.sort((a, b) => {
             if (a[field] > b[field]) {
                 return 1;
             } else if (a[field] < b[field]) {
                 return -1;
             } else {
                 return 0;
             }
         });
         return sorted;

     }
 };
 var PRODUCTS = [];
 document.addEventListener('DOMContentLoaded', function () {
     //when the page is ready
     //load the cart items
      CART.init();
     getProducts(showProducts);
     showHomeProducts();
     selectOptionDisplay();
     displayFilter();
     searchProducts();
      //load the cart items
     displayTotalPrice();
    showCart();
 });

 /*To create  Html content shopping cart */
 function showCart() {
     let imgPath = 'assets/images/';
     let cartSection = document.getElementById('cart');
     cartSection.innerHTML = "";
     let lagar = CART.sort('id');
     lagar.forEach(item => {
        let childImag = document.createElement('div');
         childImag.className = 'childImage';
         cartSection.appendChild(childImag);
         let img1 = document.createElement('img');
         img1.className = 'img1';
         img1.src = imgPath + item.img1;
         childImag.appendChild(img1);

         let img2 = document.createElement('img');
         img2.className = 'img2';
         img2.src = imgPath + item.img2;
         childImag.appendChild(img2);

         let img3 = document.createElement('img');
         img3.className = 'img3';
         img3.src = imgPath + item.img3;
         childImag.appendChild(img3);

         let cartitem = document.createElement('div');
         cartitem.className = 'cart-item';

         let title = document.createElement('h3');
         title.textContent = item.title;
         title.className = 'title'
         cartitem.appendChild(title);
         // add the name and brand
         let name = document.createElement('h4');
         name.textContent = item.name;
         name.className = 'name';
         cartitem.appendChild(name);
         let brand = document.createElement('h4');
         brand.textContent = item.brand;
         brand.className = 'brand';
         cartitem.appendChild(brand);

         //add the image to the card
         let img = document.createElement('img');
         img.src = imgPath + item.img;
         img.className = 'img';
         cartitem.appendChild(img);

         let priceRev = document.createElement('div');
         priceRev.className = 'price-remove'
         let price = document.createElement('div');
         price.className = 'price';
         let cost = item.itemPrice + "SEK";
         price.textContent = cost;
         priceRev.appendChild(price);
         cartitem.appendChild(priceRev);
         cartSection.appendChild(cartitem);
         //Remove button
         let remove = document.createElement('button');
         remove.className = 'btn-remove';
         remove.textContent = 'Ta bort';
         remove.setAttribute('data-id', item.id);
         remove.addEventListener('click', removItem);
         priceRev.appendChild(remove);
         cartitem.appendChild(priceRev)
         // to creat qantity selector
         let controls = document.createElement('div');
         controls.className = 'controls';
         cartitem.appendChild(controls);
         // to creat qantity selector +
         let plus = document.createElement('span');
         plus.textContent = '+';
         plus.setAttribute('data-id', item.id);
         controls.appendChild(plus);
         plus.addEventListener('click', incrementCart);
         // to creat qantity number 
         let qty = document.createElement('span');
         qty.textContent = item.qty;
         controls.appendChild(qty);
         // to creat qantity selector minus -
         let minus = document.createElement('span');
         minus.textContent = '-';
         minus.setAttribute('data-id', item.id);
         controls.appendChild(minus);
         minus.addEventListener('click', decrementCart);
         //comment section
         let comment = document.getElementById('comment');
         let review = document.createElement('p');
         review.textContent = item.comment;
         comment.appendChild(review);
         //rate star
         let star = document.getElementById('fa-star');
         let rating = document.createElement('div');
         rating.className = 'checked'
         rating.textContent = item.rating;
         star.appendChild(rating);
         //comment section1
         let comment1 = document.getElementById('comment1');
         let review1 = document.createElement('p');
         review1.textContent = item.comment1;
         comment1.appendChild(review1);
         //rate star1
         let star1 = document.getElementById('fa-star1');
         let rating1 = document.createElement('div');
         rating1.className = 'checked1'
         rating1.textContent = item.rating1;
         star1.appendChild(rating1);

         //comment section2
         let comment2 = document.getElementById('comment2');
         let review2 = document.createElement('p');
         review2.textContent = item.comment2;
         comment2.appendChild(review2);
         //rate star
         let star2 = document.getElementById('fa-star2');
         let rating2 = document.createElement('div');
         rating2.className = 'checked2'
         rating2.textContent = item.rating2;
         star2.appendChild(rating2);

         //comment section3
         let comment3 = document.getElementById('comment3');
         let review3 = document.createElement('p');
         review3.textContent = item.comment3;
         comment3.appendChild(review3);


         //rate star
         let star3 = document.getElementById('fa-star3');
         let rating3 = document.createElement('div');
         rating3.className = 'checked3'
         rating3.textContent = item.rating3;
         star3.appendChild(rating3);
     })
     
    }
     

     function displayTotalPrice() {
         let divPrice = document.getElementById('div1');
         fetch('/calculate', {
                 method: 'POST',
                 body: JSON.stringify(CART.contents),
                 headers: {
                     'Content-Type': 'application/json'
                 }
             })
             .then(response => response.json())
             .then(response => {
                 let thePrice = response["Total"];
                 divPrice.innerHTML = 'Total: ' + thePrice + 'SEK';
                 console.log(thePrice);
             }).catch(error => console.log("Can not get: " + error));
     }

 //request the list of products from the "server"
function getProducts(success, failure) {

     var DB = "assets/js/products.json?";
     fetch(DB, {
         method: 'GET',
         mode: 'cors'
     }).then(function (response) {
         return response.json();
     }).then(showProducts).catch(function (err) {
         errorMessage(err.message);
     });
 }
//request the list of products from the "server"

function filterFunction() {
     let dataFiltersObject = {};
     let filterVal;
     let filterName = this.getAttribute("data-filter");
     
     let filter_catagorie = document.getElementsByClassName("filter-" + filterName);
     filterVal = this.value;
    
     if (filterVal == "") {
         delete dataFiltersObject[filterName];
     } else {
         dataFiltersObject[filterName] = filterVal;
     }
     
     let filters = "";
     for (let key in dataFiltersObject) {
         if (dataFiltersObject.hasOwnProperty(key)) {
             filters += "[data-" + key + "='" + dataFiltersObject[key] + "']";
         }
     }

     if (filters == "") {
         $(".card").show();
     } else {
         $(".card").hide();
         $(".card").hide().filter(filters).show();
     }
 }

function displayFilter() {
     let filterClass = document.getElementsByClassName("filter");
     for (let i = 0; i < filterClass.length; i++) {
         filterClass[i].addEventListener('change', filterFunction);
     }
 }

function searchProducts() {
     let searchForm = document.getElementById('search-form');
     if (searchForm !== null) {
         searchForm.addEventListener('submit', function (evt) {
             evt.preventDefault();
             let input = document.getElementById("input");
             let query = input.value.toLowerCase();
             let prods = document.getElementsByClassName('card');
             for (let i = 0; i < prods.length; i++) {
                 let catagorie = prods[i].getAttribute("data-catagorie").toLowerCase(),
                     brand = prods[i].getAttribute("data-brand").toLowerCase(),
                     color = prods[i].getAttribute("data-color").toLowerCase();
                 if (catagorie.indexOf(query) > -1 || brand.indexOf(query) > -1 || color.indexOf(query) > -1) {
                     prods[i].style.display = "";
                 } else {
                     prods[i].style.display = "none";
                 }
             }
         }, false);
     }
 }

function selectOptionDisplay() {
     let myRequest = new Request('assets/js/products.json');
     fetch(myRequest)
         .then((res) => res.json())
         .then(function (products) {
             let productClass = document.getElementsByTagName('select');
             productClass.innerHTML = "";
             let catagories = "",
                 brands = "",
                 colors = "";
             for (let i = 0; i < products.length; i++) {
                 //create dropdown of product catagories
                 let optElem, optCatVal, opt2Elem, optBrandVal, opt3Elem, optColorVal;
                 if (catagories.indexOf(products[i].catagorie) == -1) {
                     optElem = document.createElement("option");
                     optElem.setAttribute("value", products[i].catagorie);
                     optCatVal = document.createTextNode(products[i].catagorie);
                     optElem.appendChild(optCatVal);
                     document.getElementsByClassName("filter-catagorie")[0].append(optElem);
                     catagories += products[i].catagorie;
                 }

                 //create dropdown of product brand
                 if (brands.indexOf(products[i].brand) == -1) {
                     opt2Elem = document.createElement("option");
                     opt2Elem.setAttribute("value", products[i].brand);
                     optBrandVal = document.createTextNode(products[i].brand);
                     opt2Elem.appendChild(optBrandVal);
                     document.getElementsByClassName("filter-brand")[0].append(opt2Elem);
                     brands += products[i].brand;
                 }
                 //create dropdown of product Color
                 if (colors.indexOf(products[i].color) == -1) {
                     opt3Elem = document.createElement("option");
                     opt3Elem.setAttribute("value", products[i].color);
                     optColorVal = document.createTextNode(products[i].color);
                     opt3Elem.appendChild(optColorVal);
                     document.getElementsByClassName("filter-color")[0].append(opt3Elem);
                     colors += products[i].color;
                 }
             }
         })
         .catch(function(error){
          //console.log(JSON.stringify(error));
         });
 }

 function showHomeProducts(){
     let myReq = new Request('assets/js/products.json');
     fetch(myReq)
         .then((res) => res.json())
         .then(function (products) {
         let homeProdiv = document.getElementById('homeProducts');
                 //let homeProdiv.innerHTML = "x"; 
                 let imgPath = 'assets/images/'; 
             for (let i = 0; i < 4; i++) {
                 //create dropdown of product catagories
                 let card = document.createElement('div');
                 card.className = 'card';
                 /**
                  * creating a div with class name products and creating a custom data atribute 
                  */
                 card.setAttribute("data-catagorie", products[i].catagorie);
                 card.setAttribute("data-brand", products[i].brand);
                 card.setAttribute("data-color", products[i].color);

                 //add the image to the card
                 let img = document.createElement('img');
                 img.alt = products[i].title;
                 img.src = imgPath + products[i].img;
                 img.setAttribute('data-id', products[i].id);
                 img.addEventListener('click', addItem);
                 card.appendChild(img);
                 // add the name
                 let prodname = document.createElement('p');
                 let pname = products[i].name;
                 prodname.textContent = pname;
                 prodname.className = 'name';
                 card.appendChild(prodname);
                 // add the brand
                 let prodbrand = document.createElement('p');
                 let pbrand = products[i].brand;
                 prodbrand.textContent = pbrand;
                 prodbrand.className = 'brand';
                 card.appendChild(prodbrand);
                 //add the price
                 let price = document.createElement('p');
                 let cost = products[i].price;
                 price.textContent = cost;
                 price.className = 'price';
                 card.appendChild(price);
                 //add the card to the section
                 homeProdiv.appendChild(card);
                 }                     
         })
         .catch(function (error) {
             console.log(JSON.stringify(error));
         });
        
    }
 // generat html  display
function showProducts(products) {
     PRODUCTS = products;
     let imgPath = 'assets/images/';
     let productSection = document.getElementById('products');
     productSection.innerHTML = "";
     products.forEach(product => {

         let card = document.createElement('div');
         card.className = 'card';
         /**
          * creating a div with class name products and creating a custom data atribute 
          */
         card.setAttribute("data-catagorie", product.catagorie);
         card.setAttribute("data-brand", product.brand);
         card.setAttribute("data-color", product.color);

         //add the image to the card
         let img = document.createElement('img');
         img.alt = product.title;
         img.src = imgPath + product.img;
         img.setAttribute('data-id', product.id);
         img.addEventListener('click', addItem);
         card.appendChild(img);
         // add the name
         let prodname = document.createElement('p');
         let pname = product.name;
         prodname.textContent = pname;
         prodname.className = 'name';
         card.appendChild(prodname);
         // add the brand

         let prodbrand = document.createElement('p');
         let pbrand = product.brand;
         prodbrand.textContent = pbrand;
         prodbrand.className = 'brand';
         card.appendChild(prodbrand);
         // add the brand

         //add the price
         let price = document.createElement('p');
         let cost = product.price;
         price.textContent = cost;
         price.className = 'price';
         card.appendChild(price);
         //add the card to the section
         productSection.appendChild(card);
     })
 }

function incrementCart(ev) {
     ev.preventDefault();
     let id = parseInt(ev.target.getAttribute('data-id'));
     CART.increase(id, 1);
     let controls = ev.target.parentElement;
     let qty = controls.querySelector('span:nth-child(2)');
     let item = CART.find(id);
     if (item) {
         qty.textContent = item.qty;
     } else {
         document.getElementById('cart').removeChild(controls.parentElement);
     }
    displayTotalPrice();
    showCart();
    CART.sync();
    
   
 }

function decrementCart(ev) {
     ev.preventDefault();
     let id = parseInt(ev.target.getAttribute('data-id'));
     CART.reduce(id, 1);
     let controls = ev.target.parentElement;
     let qty = controls.querySelector('span:nth-child(2)');
     let item = CART.find(id);
     if (item) {
         qty.textContent = item.qty;
     } else {
         document.getElementById('cart').removeChild(controls.parentElement);
     }
    displayTotalPrice();
    showCart();
    CART.sync();
    
 }
 // Add cart Item to cart
function addItem(ev) {
     ev.preventDefault();
     let id = parseInt(ev.target.getAttribute('data-id'));
     window.location = 'kassa.html';
     CART.add(id, 1);
    displayTotalPrice();
     showCart();
     CART.sync();
 }

function purchase1() {
    window.open("thank.html")
 }

 // Remove cart items button
function removItem(ev) {
   
    let id = parseInt(ev.target.getAttribute('data-id'));
    CART.empty();
    var buttonClicked = ev.target;
    buttonClicked.parentElement.parentElement.remove();
    displayTotalPrice();
    showCart();
    CART.sync();
    
}
function purchase() {
     $("main").remove();
 }

function errorMessage(err) {
     //display the error message to the user  
 }
 //jquare for fixed position the header when scroll the page
 //Scroll window  the top nav will be fixed
 $(window).scroll(function () {
     if ($(this).scrollTop() > 50) {
         $('#task_flyout').addClass('fixed');
     } else {
         $('#task_flyout').removeClass('fixed');
     }
 });
 //when window scroll down fon will became from 45px to 20px
 $(window).scroll(function () {
     if ($(this).scrollTop()) {
         $("#h1").css("font-size", "20px");
           $("#h1").css("background", "#333");
            $("#h1").css("color", "#FFF");
         $("#top-nav").css("display", "none");
        
     } else {
         $('#h1').css("font-size", "45px");
          $("#h1").css("background", "#FFF");
           $("#h1").css("color", "#999");
     }
 });

function arrow() {
     document.getElementById('star0').style.display = "block";

 }

function arrow1() {
     document.getElementById('star0').style.display = "none";
 }
