function maskCPF(v) {
  return v.replace(/\D/g,'').slice(0,11)
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}
function maskTEL(v) {
  return v.replace(/\D/g,'').slice(0,11)
          .replace(/^(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{5})(\d{4})$/, '$1-$2');
}
function maskCEP(v) {
  return v.replace(/\D/g,'').slice(0,8)
          .replace(/(\d{5})(\d)/, '$1-$2');
}

function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

export function initForm() {
  const f = document.getElementById('formVoluntario');
  if (!f) return;

  const cpf = f.querySelector('#cpf');
  const tel = f.querySelector('#telefone');
  const cep = f.querySelector('#cep');

  if (cpf) cpf.addEventListener('input', e => e.target.value = maskCPF(e.target.value));
  if (tel) tel.addEventListener('input', e => e.target.value = maskTEL(e.target.value));
  if (cep) cep.addEventListener('input', e => e.target.value = maskCEP(e.target.value));

  f.addEventListener('submit', e => {
    e.preventDefault();
    if (!f.checkValidity()) {
      showToast('Verifique os campos obrigatórios.');
      return;
    }
    f.reset();
    showToast('Cadastro enviado com sucesso!');
  });
}
