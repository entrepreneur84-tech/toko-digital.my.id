function addToCart(nama,harga){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({nama,harga});
  localStorage.setItem("cart",JSON.stringify(cart));
  alert("Ditambahkan ke keranjang");
}

function renderCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let html="";
  let total=0;

  cart.forEach((item,i)=>{
    html+=`<p>${item.nama} - Rp${item.harga.toLocaleString()}</p>`;
    total+=item.harga;
  });

  document.getElementById("cartItems").innerHTML=html;
  document.getElementById("totalHarga").innerText="Total: Rp"+total.toLocaleString();
}

function renderCheckout(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let list="";
  let total=0;
  let pesan="Halo saya ingin membeli:%0A";

  cart.forEach(item=>{
    list+=`<p>${item.nama} - Rp${item.harga.toLocaleString()}</p>`;
    total+=item.harga;
    pesan+=`• ${item.nama}%0A`;
  });

  list+=`<h3>Total: Rp${total.toLocaleString()}</h3>`;
  document.getElementById("listCheckout").innerHTML=list;

  let wa="https://wa.me/6285175313909?text="+pesan;
  document.getElementById("waBtn").href=wa;
    }
