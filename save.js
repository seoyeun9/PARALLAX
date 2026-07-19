const btnMoveOn = document.getElementById('btnMoveOn');

if (btnMoveOn) {
  btnMoveOn.addEventListener('click', () => {

    const currentWinner = sessionStorage.getItem('currentPlayer');
    let playerHealth = JSON.parse(sessionStorage.getItem('playerHealth')) || {};

    Object.keys(playerHealth).forEach(playerName => {
      if (playerName !== currentWinner) {

        playerHealth[playerName] = Math.max(0, playerHealth[playerName] - 1.0);
      }
    });

    // 3. 수정된 체력 장부 저장
    sessionStorage.setItem('playerHealth', JSON.stringify(playerHealth));

    // 4. 다음 시나리오 단계를 2로 설정하고 메인 화면으로 이동
    sessionStorage.setItem('currentStage', '3');
    window.location.href = 'WHITEOUT.html'; // 메인 HTML 파일명에 맞게 수정
  });
}
