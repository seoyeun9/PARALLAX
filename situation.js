document.addEventListener('DOMContentLoaded', () => {
  const newPlayerInput = document.getElementById('newPlayerInput');
  const btnMoveOn = document.getElementById('btnMoveOn');

  if (newPlayerInput && btnMoveOn) {
    
    newPlayerInput.addEventListener('input', () => {
      if (newPlayerInput.value.trim() !== '') {
        btnMoveOn.classList.remove('disabled');
      } else {
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
