const btnMoveOn = document.getElementById('btnMoveOn');

if (btnMoveOn) {
  btnMoveOn.addEventListener('click', () => {
    const currentWinner = sessionStorage.getItem('currentPlayer');
    let playerHealth = JSON.parse(sessionStorage.getItem('playerHealth')) || {};

    // 💡 [수정됨] 치료하니 피가 0.5만큼 찹니다!
    if (currentWinner && playerHealth[currentWinner] !== undefined) {
      playerHealth[currentWinner] = Math.min(1.0, playerHealth[currentWinner] + 0.5);
      sessionStorage.setItem('playerHealth', JSON.stringify(playerHealth));
    }

    sessionStorage.setItem('currentStage', '3');
    window.location.href = 'WHITEOUT.html';
  });
}
