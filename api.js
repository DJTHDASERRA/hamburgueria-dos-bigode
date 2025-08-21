
async function api(path, opts={}){
  const token = localStorage.getItem('token');
  const headers = {'Content-Type':'application/json', ...(opts.headers||{})};
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(API_BASE + path, {...opts, headers});
  if (!res.ok){
    let msg='Erro';
    try{ const j = await res.json(); msg = j.error || msg; }catch{}
    throw new Error(msg);
  }
  return res.json();
}
