document.addEventListener('DOMContentLoaded', () => {

  const btnSuccessMoveOn = document.getElementById('btnMoveOn');

  if (btnSuccessMoveOn) {
    btnSuccessMoveOn.addEventListener('click', () => {
      window.location.href = 'WHITEOUT.html'; 
    });
  }
});
