document.addEventListener('DOMContentLoaded', () => {
  const newPlayerInput = document.getElementById('newPlayerInput');
  const btnMoveOn = document.getElementById('btnMoveOn');

  if (newPlayerInput && btnMoveOn) {
    

    newPlayerInput.addEventListener('input', () => {
      const name = newPlayerInput.value.trim();

      if (name !== '') {

        newPlayerInput.classList.add('filled');
        btnMoveOn.classList.remove('disabled');
      } else {

        newPlayerInput.classList.remove('filled');
        btnMoveOn.classList.add('disabled');
      }
    });


    btnMoveOn.addEventListener('click', () => {

      if (btnMoveOn.classList.contains('disabled')) return;
      
      localStorage.setItem('chosenPlayer', newPlayerInput.value.trim());

      
      window.location.href = 'result1.html';
    });

  }
});
