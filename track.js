
async function loadTracking(){
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code') || document.querySelector('#code').value;
  if(!code){ return; }
  try{
    const data = await api('/api/orders/' + code);
    const o = data.order;
    const list = data.items.map(it=>`<li>${it.qty}x ${it.name} — ${fmtBRL(it.price)}</li>`).join('');
    document.querySelector('#trackInfo').innerHTML = `
      <p><strong>Pedido #${o.code}</strong></p>
      <p>Status: <span class="badge">${o.status}</span></p>
      <p>Endereço: ${o.address || 'retirada no balcão'}</p>
      <ul>${list}</ul>
    `;
  }catch(e){
    document.querySelector('#trackInfo').innerHTML = '<p>Pedido não encontrado.</p>';
  }
}
document.addEventListener('DOMContentLoaded', loadTracking);
