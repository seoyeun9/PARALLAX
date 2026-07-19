const btnUseIt = document.getElementById('btnUseIt');
const btnSaveIt = document.getElementById('btnSaveIt');


if (btnUseIt) {
  btnUseIt.addEventListener('click', () => {
    window.location.href = 'situation2_use.html';
  });
}


if (btnSaveIt) {
  btnSaveIt.addEventListener('click', () => {
    window.location.href = 'situation2_save.html';
  });
}
