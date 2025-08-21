
function requireAuth(){
  const t = localStorage.getItem('token');
  if(!t){ window.location.href = 'login.html'; }
}
function setUserUI(){
  const display = document.querySelector('#userDisplay');
  const name = localStorage.getItem('user_name');
  if(display) display.textContent = name ? 'Olá, ' + name : 'Olá!';
}
document.addEventListener('DOMContentLoaded', setUserUI);
