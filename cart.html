const API_BASE = localStorage.getItem('API_BASE') || 'http://localhost:3001';
const PHONE_NUMBER = "5511999999999"; // <-- Coloque o número da empresa (com DDI 55 e DDD)
const CLOUD_API_TOKEN = "SEU_TOKEN_AQUI"; // <-- Se usar a API oficial da Meta
const PHONE_NUMBER_ID = "SEU_PHONE_NUMBER_ID"; // <-- Se usar a API oficial da Meta

function toast(msg) { 
  const el = document.createElement('div'); 
  el.className = 'toast'; 
  el.textContent = msg; 
  document.body.appendChild(el); 
  setTimeout(() => el.remove(), 2500); 
}

function fmtBRL(v) { 
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const list = document.querySelector('#cartList');
  const totalEl = document.querySelector('#cartTotal');
  if (cart.length === 0) { 
    list.innerHTML = '<p>Seu carrinho está vazio.</p>'; 
    totalEl.textContent = fmtBRL(0); 
    return; 
  }
  list.innerHTML = cart.map((it, idx) => `
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
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  totalEl.textContent = fmtBRL(total);
}

function qty(idx, delta) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function removeItem(idx) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.splice(idx, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

async function checkout() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cart.length === 0) { return toast('Carrinho vazio'); }

  const address = document.querySelector('#address').value;
  const payment = document.querySelector('#payment').value;
  const note = document.querySelector('#note').value;

  // Montar mensagem do pedido
  let msg = "🍔 *Novo Pedido - HAMBURGUERIA DOS BIGODES*\n\n";
  cart.forEach(it => {
    msg += `• ${it.name} x${it.qty} — ${fmtBRL(it.price * it.qty)}\n`;
  });
  msg += `\n📍 Endereço: ${address || "Retirada no local"}`;
  msg += `\n💳 Pagamento: ${payment}`;
  msg += `\n📝 Obs: ${note || "Nenhuma"}`;
  msg += `\n\n🔢 Total: ${fmtBRL(cart.reduce((s, i) => s + i.price * i.qty, 0))}`;

  // Enviar via WhatsApp simples
  const waLink = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(waLink, "_blank");

  // Opcional: enviar também via API oficial (Cloud API)
  try {
    if (CLOUD_API_TOKEN !== "SEU_TOKEN_AQUI") {
      await fetch(`https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${CLOUD_API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: PHONE_NUMBER,
          type: "text",
          text: { body: msg }
        })
      });
    }
  } catch (err) {
    console.error("Erro ao enviar via API oficial:", err);
  }

  // Limpar carrinho
  localStorage.removeItem('cart');
  toast("Pedido enviado para o WhatsApp da empresa!");
  setTimeout(() => { window.location.href = "track.html"; }, 800);
}

document.addEventListener('DOMContentLoaded', renderCart);
