
let stars = 0;
function setStars(n){
  stars = n;
  document.querySelectorAll('.star').forEach((s,i)=> s.textContent = i < n ? '★' : '☆' );
}
async function submitReview(){
  if(stars<=0) return toast('Dê uma nota');
  const comment = document.querySelector('#revComment').value;
  try{
    await api('/api/reviews', { method:'POST', body: JSON.stringify({ rating: stars, comment }) });
    toast('Avaliação enviada!');
    document.querySelector('#revComment').value=''; setStars(0);
    loadReviews();
  }catch(e){
    if(String(e.message).includes('Token')) return window.location.href='login.html';
    toast(e.message);
  }
}
async function loadReviews(){
  const list = document.querySelector('#reviewsList');
  const rows = await api('/api/reviews');
  list.innerHTML = rows.map(r=>`
    <div class="card p">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <strong>${r.user_name}</strong>
        <span>${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span>
      </div>
      <p style="color:#aaa">${r.comment||''}</p>
      <small style="color:#777">${new Date(r.created_at).toLocaleString('pt-BR')}</small>
    </div>
  `).join('');
}
document.addEventListener('DOMContentLoaded', loadReviews);
