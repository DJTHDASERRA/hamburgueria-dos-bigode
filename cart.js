<script>
// Formata moeda
function fmtBRL(v){
  return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
}

// Renderiza o carrinho
function renderCart(){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const list = document.querySelector('#cartList');
  const totalEl = document.querySelector('#cartTotal');
  if(cart.length===0){
    list.innerHTML = '<p>Seu carrinho está vazio.</p>';
    totalEl.textContent = fmtBRL(0);
    return;
  }
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

// Alterar quantidade
function qty(idx,delta){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  cart[idx].qty += delta;
  if(cart[idx].qty <= 0) cart.splice(idx,1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Remover item
function removeItem(idx){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  cart.splice(idx,1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Finalizar pedido via WhatsApp
function checkout(){
  let idPedido = "PED" + Math.floor(Math.random() * 10000); // gera ID simples
  let nome = document.getElementById("nome")?.value || "Não informado";
  let telefone = document.getElementById("telefone")?.value || "Não informado";
  let endereco = document.getElementById("endereco")?.value || "Não informado";
  let pagamento = document.getElementById("pagamento")?.value || "Não informado";
  let observacao = document.getElementById("note")?.value || "";

  // Capturar itens do carrinho (mesma chave "cart")
  let pedido = "";
  if (localStorage.getItem("cart")) {
    let items = JSON.parse(localStorage.getItem("cart"));
    items.forEach((item, index) => {
      pedido += `${index+1}. ${item.name} - ${item.qty}x%0A`;
    });
  } else {
    pedido = "Nenhum item no carrinho";
  }

  let mensagem = `*🍔 Novo Pedido na Hamburgueria dos Bigode!*%0A%0A🆔 ID: ${idPedido}%0A👤 Nome: ${nome}%0A📞 Telefone: ${telefone}%0A📍 Endereço: ${endereco}%0A🛒 Pedido:%0A${pedido}%0A💳 Pagamento: ${pagamento}%0A📝 Obs: ${observacao}`;

  let numeroLoja = "5564999744820"; // número do WhatsApp da loja
  window.open(`https://wa.me/${numeroLoja}?text=${mensagem}`, "_blank");
  localStorage.removeItem("cart"); // limpa carrinho após enviar
}

// Inicia renderização ao carregar a página
document.addEventListener('DOMContentLoaded', renderCart);
</script>
