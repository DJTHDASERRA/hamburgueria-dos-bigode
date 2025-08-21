
const API_BASE = localStorage.getItem('API_BASE') || 'http://localhost:3001';
function toast(msg){const el=document.createElement('div');el.className='toast';el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),2500);}
function fmtBRL(v){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
function navActive(){
  document.querySelectorAll('.nav a').forEach(a=>{
    if (a.href === window.location.href) a.style.background='#1c1c22';
  });
}
document.addEventListener('DOMContentLoaded', navActive);
