document.addEventListener('DOMContentLoaded', () => {
  const newPlayerInput = document.getElementById('newPlayerInput');
  const btnMoveOn = document.getElementById('btnMoveOn');

  if (newPlayerInput && btnMoveOn) {
    newPlayerInput.addEventListener('input', () => {
      if (newPlayerInput.value.trim() !== '') {
        newPlayerInput.classList.add('filled');
        btnMoveOn.classList.remove('disabled');
      } else {
        newPlayerInput.classList.remove('filled');
        btnMoveOn.classList.add('disabled');
      }
    });

    btnMoveOn.addEventListener('click', () => {
      if (btnMoveOn.classList.contains('disabled')) return;
      
      const targetName = newPlayerInput.value.trim();
      
      let playerHealth = JSON.parse(sessionStorage.getItem('playerHealth')) || {};
      
      if (playerHealth[targetName] === undefined) {
        playerHealth[targetName] = 1.0; 
      }
      
      playerHealth[targetName] = Math.max(0, playerHealth[targetName] - 0.5);
      
      sessionStorage.setItem('playerHealth', JSON.stringify(playerHealth));
      sessionStorage.setItem('chosenPlayer', targetName); 
      
      window.location.href = 'result1.html';
    });
  }
});
