"use strict";var CART={KEY:"productCollection",contents:[],init:function(){var e=localStorage.getItem(CART.KEY);CART.contents=e?JSON.parse(e):[],CART.sync()},sync:async function(){var e=JSON.stringify(CART.contents);await localStorage.setItem(CART.KEY,e)},find:function(e){var t=CART.contents.filter(function(t){if(t.id==e)return!0});if(t&&t[0]==t[0])return t[0]},add:function(e){if(CART.find(e))CART.increase(e,1);else{var t=PRODUCTS.filter(function(t){if(t.id==e)return!0});if(t&&t[0]){var n={id:t[0].id,name:t[0].name,brand:t[0].brand,title:t[0].title,qty:1,itemPrice:t[0].price,img:t[0].img,img1:t[0].img1,img2:t[0].img2,img3:t[0].img3,comment:t[0].comment,rating:t[0].rating,comment1:t[0].comment,rating1:t[0].rating,comment2:t[0].comment,rating2:t[0].rating,comment3:t[0].comment,rating3:t[0].rating};CART.contents.push(n),CART.sync()}}},increase(e,t=1){CART.contents=CART.contents.map(n=>(n.id===e&&(n.qty=n.qty+t),n)),CART.sync()},reduce(e,t=1){CART.contents=CART.contents.map(n=>(n.id===e&&(n.qty=n.qty-t),n)),CART.contents.forEach(async t=>{t.id===e&&0===t.qty&&await CART.remove(e)}),CART.sync()},remove(e){CART.contents=CART.contents.filter(t=>{if(t.id!==e)return!0}),CART.sync()},empty(){CART.contents=[],CART.sync()},sort:function(e="id"){return CART.contents.sort((t,n)=>t[e]>n[e]?1:t[e]<n[e]?-1:0)}},PRODUCTS=[];function showCart(){let e="assets/images/",t=document.getElementById("cart");t.innerHTML="",CART.sort("id").forEach(n=>{let a=document.createElement("div");a.className="childImage",t.appendChild(a);let c=document.createElement("img");c.className="img1",c.src=e+n.img1,a.appendChild(c);let d=document.createElement("img");d.className="img2",d.src=e+n.img2,a.appendChild(d);let o=document.createElement("img");o.className="img3",o.src=e+n.img3,a.appendChild(o);let l=document.createElement("div");l.className="cart-item";let i=document.createElement("h3");i.textContent=n.title,i.className="title",l.appendChild(i);let r=document.createElement("h4");r.textContent=n.name,r.className="name",l.appendChild(r);let s=document.createElement("h4");s.textContent=n.brand,s.className="brand",l.appendChild(s);let m=document.createElement("img");m.src=e+n.img,m.className="img",l.appendChild(m);let u=document.createElement("div");u.className="price-remove";let p=document.createElement("div");p.className="price";let C=n.itemPrice+"SEK";p.textContent=C,u.appendChild(p),l.appendChild(u),t.appendChild(l);let h=document.createElement("button");h.className="btn-remove",h.textContent="Ta bort",h.setAttribute("data-id",n.id),h.addEventListener("click",removItem),u.appendChild(h),l.appendChild(u);let g=document.createElement("div");g.className="controls",l.appendChild(g);let f=document.createElement("span");f.textContent="+",f.setAttribute("data-id",n.id),g.appendChild(f),f.addEventListener("click",incrementCart);let E=document.createElement("span");E.textContent=n.qty,g.appendChild(E);let y=document.createElement("span");y.textContent="-",y.setAttribute("data-id",n.id),g.appendChild(y),y.addEventListener("click",decrementCart);let T=document.getElementById("comment"),A=document.createElement("p");A.textContent=n.comment,T.appendChild(A);let b=document.getElementById("fa-star"),v=document.createElement("div");v.className="checked",v.textContent=n.rating,b.appendChild(v);let R=document.getElementById("comment1"),N=document.createElement("p");N.textContent=n.comment1,R.appendChild(N);let x=document.getElementById("fa-star1"),w=document.createElement("div");w.className="checked1",w.textContent=n.rating1,x.appendChild(w);let I=document.getElementById("comment2"),B=document.createElement("p");B.textContent=n.comment2,I.appendChild(B);let P=document.getElementById("fa-star2"),O=document.createElement("div");O.className="checked2",O.textContent=n.rating2,P.appendChild(O);let L=document.getElementById("comment3"),$=document.createElement("p");$.textContent=n.comment3,L.appendChild($);let k=document.getElementById("fa-star3"),S=document.createElement("div");S.className="checked3",S.textContent=n.rating3,k.appendChild(S)})}function displayTotalPrice(){let e=document.getElementById("div1");fetch("/calculate",{method:"POST",body:JSON.stringify(CART.contents),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(t=>{let n=t.Total;e.innerHTML="Total: "+n+"SEK",console.log(n)}).catch(e=>console.log("Can not get: "+e))}function getProducts(e,t){fetch("assets/js/products.json?",{method:"GET",mode:"cors"}).then(function(e){return e.json()}).then(showProducts).catch(function(e){errorMessage(e.message)})}function filterFunction(){let e,t={},n=this.getAttribute("data-filter");document.getElementsByClassName("filter-"+n);""==(e=this.value)?delete t[n]:t[n]=e;let a="";for(let e in t)t.hasOwnProperty(e)&&(a+="[data-"+e+"='"+t[e]+"']");""==a?$(".card").show():($(".card").hide(),$(".card").hide().filter(a).show())}function displayFilter(){let e=document.getElementsByClassName("filter");for(let t=0;t<e.length;t++)e[t].addEventListener("change",filterFunction)}function searchProducts(){let e=document.getElementById("search-form");null!==e&&e.addEventListener("submit",function(e){e.preventDefault();let t=document.getElementById("input").value.toLowerCase(),n=document.getElementsByClassName("card");for(let e=0;e<n.length;e++){let a=n[e].getAttribute("data-catagorie").toLowerCase(),c=n[e].getAttribute("data-brand").toLowerCase(),d=n[e].getAttribute("data-color").toLowerCase();a.indexOf(t)>-1||c.indexOf(t)>-1||d.indexOf(t)>-1?n[e].style.display="":n[e].style.display="none"}},!1)}function selectOptionDisplay(){let e=new Request("assets/js/products.json");fetch(e).then(e=>e.json()).then(function(e){document.getElementsByTagName("select").innerHTML="";let t="",n="",a="";for(let c=0;c<e.length;c++){let d,o,l,i,r,s;-1==t.indexOf(e[c].catagorie)&&((d=document.createElement("option")).setAttribute("value",e[c].catagorie),o=document.createTextNode(e[c].catagorie),d.appendChild(o),document.getElementsByClassName("filter-catagorie")[0].append(d),t+=e[c].catagorie),-1==n.indexOf(e[c].brand)&&((l=document.createElement("option")).setAttribute("value",e[c].brand),i=document.createTextNode(e[c].brand),l.appendChild(i),document.getElementsByClassName("filter-brand")[0].append(l),n+=e[c].brand),-1==a.indexOf(e[c].color)&&((r=document.createElement("option")).setAttribute("value",e[c].color),s=document.createTextNode(e[c].color),r.appendChild(s),document.getElementsByClassName("filter-color")[0].append(r),a+=e[c].color)}}).catch(function(e){})}function showHomeProducts(){let e=new Request("assets/js/products.json");fetch(e).then(e=>e.json()).then(function(e){let t=document.getElementById("homeProducts");for(let n=0;n<4;n++){let a=document.createElement("div");a.className="card",a.setAttribute("data-catagorie",e[n].catagorie),a.setAttribute("data-brand",e[n].brand),a.setAttribute("data-color",e[n].color);let c=document.createElement("img");c.alt=e[n].title,c.src="assets/images/"+e[n].img,c.setAttribute("data-id",e[n].id),c.addEventListener("click",addItem),a.appendChild(c);let d=document.createElement("p"),o=e[n].name;d.textContent=o,d.className="name",a.appendChild(d);let l=document.createElement("p"),i=e[n].brand;l.textContent=i,l.className="brand",a.appendChild(l);let r=document.createElement("p"),s=e[n].price;r.textContent=s,r.className="price",a.appendChild(r),t.appendChild(a)}}).catch(function(e){console.log(JSON.stringify(e))})}function showProducts(e){PRODUCTS=e;let t=document.getElementById("products");t.innerHTML="",e.forEach(e=>{let n=document.createElement("div");n.className="card",n.setAttribute("data-catagorie",e.catagorie),n.setAttribute("data-brand",e.brand),n.setAttribute("data-color",e.color);let a=document.createElement("img");a.alt=e.title,a.src="assets/images/"+e.img,a.setAttribute("data-id",e.id),a.addEventListener("click",addItem),n.appendChild(a);let c=document.createElement("p"),d=e.name;c.textContent=d,c.className="name",n.appendChild(c);let o=document.createElement("p"),l=e.brand;o.textContent=l,o.className="brand",n.appendChild(o);let i=document.createElement("p"),r=e.price;i.textContent=r,i.className="price",n.appendChild(i),t.appendChild(n)})}function incrementCart(e){e.preventDefault();let t=parseInt(e.target.getAttribute("data-id"));CART.increase(t,1);let n=e.target.parentElement,a=n.querySelector("span:nth-child(2)"),c=CART.find(t);c?a.textContent=c.qty:document.getElementById("cart").removeChild(n.parentElement),displayTotalPrice(),showCart(),CART.sync()}function decrementCart(e){e.preventDefault();let t=parseInt(e.target.getAttribute("data-id"));CART.reduce(t,1);let n=e.target.parentElement,a=n.querySelector("span:nth-child(2)"),c=CART.find(t);c?a.textContent=c.qty:document.getElementById("cart").removeChild(n.parentElement),displayTotalPrice(),showCart(),CART.sync()}function addItem(e){e.preventDefault();let t=parseInt(e.target.getAttribute("data-id"));window.location="kassa.html",CART.add(t,1),displayTotalPrice(),showCart(),CART.sync()}function purchase1(){window.open("thank.html")}function removItem(e){parseInt(e.target.getAttribute("data-id"));CART.empty(),e.target.parentElement.parentElement.remove(),displayTotalPrice(),showCart(),CART.sync()}function purchase(){$("main").remove()}function errorMessage(e){}function arrow(){document.getElementById("star0").style.display="block"}function arrow1(){document.getElementById("star0").style.display="none"}document.addEventListener("DOMContentLoaded",function(){CART.init(),getProducts(showProducts),showHomeProducts(),selectOptionDisplay(),displayFilter(),searchProducts(),displayTotalPrice(),showCart()}),$(window).scroll(function(){$(this).scrollTop()>50?$("#task_flyout").addClass("fixed"):$("#task_flyout").removeClass("fixed")}),$(window).scroll(function(){$(this).scrollTop()?($("#h1").css("font-size","20px"),$("#h1").css("background","#333"),$("#h1").css("color","#FFF"),$("#top-nav").css("display","none")):($("#h1").css("font-size","45px"),$("#h1").css("background","#FFF"),$("#h1").css("color","#999"))});