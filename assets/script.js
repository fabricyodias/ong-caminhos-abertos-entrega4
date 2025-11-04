// Máscara de CPF: 000.000.000-00
const cpfInput = document.getElementById('cpf');
if (cpfInput) {
  cpfInput.addEventListener('input', function (e) {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);

    // monta XXX.XXX.XXX-XX
    if (v.length > 9) {
      v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (v.length > 6) {
      v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (v.length > 3) {
      v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }
    e.target.value = v;
  });
}

// Máscara de telefone brasileiro: (11) 91234-5678
const telInput = document.getElementById('telefone');
if (telInput) {
  telInput.addEventListener('input', function (e) {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);

    // (XX) 9XXXX-XXXX
    if (v.length > 6) {
      v = v.replace(/(\d{2})(\d{1})(\d{4})(\d{0,4})/, '($1) $2$3-$4');
    } else if (v.length > 2) {
      v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    e.target.value = v;
  });
}

// Máscara de CEP: 00000-000
const cepInput = document.getElementById('cep');
if (cepInput) {
  cepInput.addEventListener('input', function (e) {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 8) v = v.slice(0, 8);

    if (v.length > 5) {
      v = v.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }
    e.target.value = v;
  });
}
