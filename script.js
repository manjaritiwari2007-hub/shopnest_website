const products = [
 {id:1,name:"Sunday Ceramic Vase",category:"Home",price:899,old:1199,tag:"Bestseller",rating:"★★★★★",image:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=85"},
 {id:2,name:"Everyday Tote",category:"Style",price:649,old:799,tag:"Popular",rating:"★★★★★",image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=85"},
 {id:3,name:"Cloud Desk Lamp",category:"Home",price:1499,old:1799,tag:"New",rating:"★★★★☆",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85"},
 {id:4,name:"Studio Headphones",category:"Tech",price:2299,old:2799,tag:"Just in",rating:"★★★★★",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85"},
 {id:5,name:"Soft Knit Throw",category:"Home",price:1299,old:1599,tag:"Cozy pick",rating:"★★★★★",image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=85"},
 {id:6,name:"Minimal Wrist Watch",category:"Style",price:1899,old:2299,tag:"Bestseller",rating:"★★★★☆",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85"},
 {id:7,name:"Pocket Speaker",category:"Tech",price:1199,old:1499,tag:"Good sound",rating:"★★★★★",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=85"},
 {id:8,name:"Daily Carry Bottle",category:"Style",price:549,old:699,tag:"Everyday fave",rating:"★★★★☆",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=700&q=85"}
];
let activeFilter="All", cart=[];
const grid=document.getElementById("productGrid"), search=document.getElementById("searchInput"), sort=document.getElementById("sortSelect");
const money=n=>"₹"+n.toLocaleString("en-IN");
function renderProducts(){
 let list=products.filter(p=>(activeFilter==="All"||p.category===activeFilter)&&p.name.toLowerCase().includes(search.value.toLowerCase()));
 if(sort.value==="low")list.sort((a,b)=>a.price-b.price); if(sort.value==="high")list.sort((a,b)=>b.price-a.price);
 grid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-image-wrap"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span><button class="quick-add" data-add="${p.id}">＋ Add to bag</button></div><div class="product-info"><span class="product-category">${p.category}</span><span class="stars">${p.rating}</span><h3>${p.name}</h3><span class="product-price">${money(p.price)} <del>${money(p.old)}</del></span></div></article>`).join("");
 document.getElementById("emptyState").hidden=list.length>0;
}
function addToCart(id){let item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});renderCart();showToast("Added to your bag ✨");}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.qty*products.find(p=>p.id===x.id).price,0);
 document.querySelector(".cart-count").textContent=count;document.getElementById("drawerCount").textContent=`(${count})`;document.getElementById("subtotal").textContent=money(total);
 document.getElementById("cartItems").innerHTML=cart.map(x=>{let p=products.find(y=>y.id===x.id);return `<div class="cart-line"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><p>${money(p.price)}</p><div class="qty"><button data-qty="${p.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-change="1" aria-label="Increase quantity">＋</button></div></div><button class="remove-item" data-remove="${p.id}" aria-label="Remove ${p.name}">×</button></div>`}).join("");
 let empty=cart.length===0;document.getElementById("cartEmpty").style.display=empty?"block":"none";document.getElementById("cartBottom").style.display=empty?"none":"block";
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("show");document.getElementById("cartDrawer").setAttribute("aria-hidden","false");}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("show");document.getElementById("cartDrawer").setAttribute("aria-hidden","true");}
let toastTimer;function showToast(msg){let t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2200);}
grid.addEventListener("click",e=>{let b=e.target.closest("[data-add]");if(b)addToCart(Number(b.dataset.add));});
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelector(".filter.active").classList.remove("active");b.classList.add("active");activeFilter=b.dataset.filter;renderProducts();}));
search.addEventListener("input",renderProducts);sort.addEventListener("change",renderProducts);
document.querySelector(".cart-open").addEventListener("click",openCart);document.querySelector(".close-cart").addEventListener("click",closeCart);document.getElementById("overlay").addEventListener("click",closeCart);document.querySelector(".continue-shopping").addEventListener("click",closeCart);
document.getElementById("cartItems").addEventListener("click",e=>{let q=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");if(q){let x=cart.find(i=>i.id===Number(q.dataset.qty));x.qty+=Number(q.dataset.change);if(x.qty<=0)cart=cart.filter(i=>i!==x);renderCart();}if(r){cart=cart.filter(i=>i.id!==Number(r.dataset.remove));renderCart();}});
document.querySelector(".checkout-btn").addEventListener("click",()=>showToast("This is a demo store — checkout is not connected."));
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("newsletterMessage").textContent="Thanks for joining the ShopNest list! (Demo)";e.target.reset();});
document.querySelector(".search-toggle").addEventListener("click",()=>{document.getElementById("shop").scrollIntoView({behavior:"smooth"});setTimeout(()=>search.focus(),450);});
document.querySelector(".menu-toggle").addEventListener("click",()=>document.querySelector(".desktop-nav").classList.toggle("show"));
document.querySelectorAll(".category-card").forEach(a=>a.addEventListener("click",()=>{activeFilter=a.dataset.category;document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter===activeFilter));renderProducts();}));
renderProducts();renderCart();
