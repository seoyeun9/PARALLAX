// 셔플 화면 요소 정의
const playersScreen = document.getElementById('playersScreen');
const resultScreen = document.getElementById('resultScreen');
const btnActionShuffle = document.getElementById('btnActionShuffle'); 
const pickedPlayerName = document.getElementById('pickedPlayerName');
const btnChooseDone = document.getElementById('btnChooseDone');

let activePlayers = [];
let selectedPlayer = '';


document.querySelectorAll('.name-input-box').forEach((box) => {
  box.addEventListener('click', function() {
    const idx = this.getAttribute('data-index');
    const playerName = `Player ${idx}`;
    
    if (!activePlayers.includes(playerName)) {
      this.textContent = playerName;
      this.classList.add('filled');
      activePlayers.push(playerName);
    }
    
    if (activePlayers.length >= 2) {
      if (btnActionShuffle) {
        btnActionShuffle.classList.remove('disabled');
      }
    }
  });
});

// 랜덤 셔플 작동 및 결과 탭 노출
if (btnActionShuffle) {
  btnActionShuffle.addEventListener('click', () => {
    if (btnActionShuffle.classList.contains('disabled')) return;
    
    if (activePlayers.length > 0) {
      const randomIndex = Math.floor(Math.random() * activePlayers.length);
      const winner = activePlayers[randomIndex];
      
      selectedPlayer = winner;
      
      if (pickedPlayerName) {
        pickedPlayerName.textContent = winner;
      }
    }
    
    playersScreen.classList.remove('active');
    resultScreen.classList.add('active');
  });
}

if (btnChooseDone) {
  btnChooseDone.addEventListener('click', () => {
    // 💡 [수정] 늘 'Player 3'만 저장되는 대신, 실제 셔플로 뽑힌 이름을 세션/로컬에 저장!
    // 만약 예외 상황으로 비어있다면 기본값으로 'Player 3'를 줍니다.
    localStorage.setItem('currentPlayer', selectedPlayer || '. . .');

    // ➔ WHITEOUT.html 페이지로 이동
    window.location.href = 'WHITEOUT.html';
  });
}
