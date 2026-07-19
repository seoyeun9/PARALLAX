const btnUseIt = document.getElementById('btnUseIt');
const btnSaveIt = document.getElementById('btnSaveIt');


if (btnUseIt) {
  btnUseIt.addEventListener('click', () => {
    window.location.href = 'situation1_use.html';
  });
}


if (btnSaveIt) {
  btnSaveIt.addEventListener('click', () => {
    window.location.href = 'situation1_save.html';
  });
}
