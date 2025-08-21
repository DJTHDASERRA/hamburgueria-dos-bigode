
function renderCart(){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const list = document.querySelector('#cartList');
  const totalEl = document.querySelector('#cartTotal');
  if(cart.length===0){ list.innerHTML = '<p>Seu carrinho está vazio.</p>'; totalEl.textContent = fmtBRL(0); return; }
  list.innerHTML = cart.map((it,idx)=>`
    <div class="card" style="display:flex;gap:12px;align-items:center;padding:8px">
      <img src="${it.image}" style="width:90px;height:70px;object-fit:cover;border-radius:8px">
      <div style="flex:1">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <strong>${it.name}</strong>
          <span>${fmtBRL(it.price)}</span>
        </div>
        <div style="margin-top:6px;display:flex;gap:8px;align-items:center">
          <button class="btn ghost" onclick="qty(${idx},-1)">-</button>
          <span>${it.qty}</span>
          <button class="btn ghost" onclick="qty(${idx},1)">+</button>
          <button class="btn" style="background:var(--danger);color:#fff" onclick="removeItem(${idx})">Remover</button>
        </div>
      </div>
    </div>
  `).join('');
  const total = cart.reduce((s,i)=>s + i.price*i.qty, 0);
  totalEl.textContent = fmtBRL(total);
}
function qty(idx,delta){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  cart[idx].qty += delta;
  if(cart[idx].qty <= 0) cart.splice(idx,1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}
function removeItem(idx){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  cart.splice(idx,1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}
async function checkout(){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  if(cart.length===0){ return toast('Carrinho vazio'); }
  try{
    const address = document.querySelector('#address').value;
    const payment = document.querySelector('#payment').value;
    const note = document.querySelector('#note').value;
    const items = cart.map(it => ({ product_id: it.id, name: it.name, qty: it.qty, price: it.price }));
    const res = await api('/api/orders', { method:'POST', body: JSON.stringify({ items, address, payment_method: payment, note }) });
    localStorage.removeItem('cart');
    window.location.href = 'track.html?code=' + res.code + '&wa=' + encodeURIComponent(res.whatsapp);
    setTimeout(()=>{ window.open(res.whatsapp, '_blank'); }, 400);
  }catch(e){
    if(String(e.message).includes('Token')){
      toast('Faça login para finalizar');
      window.location.href = 'login.html';
    }else{
      toast(e.message);
    }
  }
}
document.addEventListener('DOMContentLoaded', renderCart);
