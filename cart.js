function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
  updateBadge();
}

function updateBadge(){
  const count = getCart().length;
  const badge = document.getElementById("cartCount");
  if(badge) badge.innerText = count;
}

function showToast(){
  const toast = document.getElementById("toast");
  if(!toast) return;
  toast.classList.add("show");
  setTimeout(()=> toast.classList.remove("show"), 2500);
}

function addToCart(nama,harga){
  let cart = getCart();
  cart.push({nama,harga});
  saveCart(cart);
  showToast();
}

function removeItem(index){
  let cart = getCart();
  cart.splice(index,1);
  saveCart(cart);
  renderCart();
}

function clearCart(){
  localStorage.removeItem("cart");
  renderCart();
  updateBadge();
}

function renderCart(){
  let cart = getCart();
  let html="";
  let total=0;

  cart.forEach((item,i)=>{
    html+=`
      <div class="cart-item">
        <span>${item.nama} - Rp${item.harga.toLocaleString()}</span>
        <button onclick="removeItem(${i})" class="btn outline small">Hapus</button>
      </div>
    `;
    total+=item.harga;
  });

  document.getElementById("cartItems").innerHTML =
    html || "<p>Keranjang masih kosong</p>";

  document.getElementById("totalHarga").innerText =
    "Total: Rp"+total.toLocaleString();
}

function renderCheckout(){
  let cart = getCart();
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

document.addEventListener("DOMContentLoaded", updateBadge);
