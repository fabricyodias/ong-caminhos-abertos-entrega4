function maskCPF(v){return v.replace(/\D/g,'').slice(0,11).replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2')}
function maskTEL(v){return v.replace(/\D/g,'').slice(0,11).replace(/^(\d{2})(\d)/,'($1) $2').replace(/(\d{5})(\d{4})$/,'$1-$2')}
function maskCEP(v){return v.replace(/\D/g,'').slice(0,8).replace(/(\d{5})(\d{1,3})$/,'$1-$2')}

export function mountForms(){
  const form = document.getElementById('formVoluntario');
  if(!form) return;

  const cpf = form.querySelector('#cpf');
  const tel = form.querySelector('#telefone');
  const cep = form.querySelector('#cep');
  const alertBox = document.getElementById('formAlert');

  if(cpf) cpf.addEventListener('input', e => e.target.value = maskCPF(e.target.value));
  if(tel) tel.addEventListener('input', e => e.target.value = maskTEL(e.target.value));
  if(cep) cep.addEventListener('input', e => e.target.value = maskCEP(e.target.value));

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!form.checkValidity()){
      if(alertBox){ alertBox.textContent = 'Verifique os campos obrigatórios.'; alertBox.classList.remove('hidden'); }
      const firstInvalid = form.querySelector(':invalid');
      if(firstInvalid) firstInvalid.focus();
      return;
    }
    if(alertBox) alertBox.classList.add('hidden');
    form.reset();
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.role = 'status';
    toast.textContent = 'Cadastro enviado com sucesso!';
    document.body.appendChild(toast);
    setTimeout(()=>{ toast.classList.remove('show'); setTimeout(()=>toast.remove(),200); }, 2200);
  });
}
