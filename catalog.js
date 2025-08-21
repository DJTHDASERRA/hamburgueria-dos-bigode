
async function loadProducts(){
  const grid = document.querySelector('#prodGrid');
  const products = await api('/api/products');
  grid.innerHTML = products.map(p => `
    <div class="card">
      <img src="${p.image}" alt="${p.name}" style="width:100%;height:180px;object-fit:cover">
      <div class="p">
        <div class="badge">Novo</div>
        <h3>${p.name}</h3>
        <p style="color:#aaa">${p.description}</p>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
          <span class="price">${fmtBRL(p.price)}</span>
          <button class="btn brand" onclick='addToCart(${JSON.stringify(p).replaceAll("'","&apos;")})'>Adicionar</button>
        </div>
      </div>
    </div>
  `).join('');
}
function addToCart(p){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const found = cart.find(i => i.id === p.id);
  if(found){ found.qty += 1; } else { cart.push({ id:p.id, name:p.name, price:p.price, image:p.image, qty:1 }); }
  localStorage.setItem('cart', JSON.stringify(cart));
  toast('Adicionado ao carrinho');
}
document.addEventListener('DOMContentLoaded', loadProducts);
