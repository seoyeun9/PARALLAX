const playersScreen = document.getElementById('playersScreen');
const resultScreen = document.getElementById('resultScreen');
const btnActionShuffle = document.getElementById('btnActionShuffle'); 
const pickedPlayerName = document.getElementById('pickedPlayerName');
const btnChooseDone = document.getElementById('btnChooseDone');

const nameInputBoxes = document.querySelectorAll('.name-input-box');

let activePlayers = [];
let selectedPlayer = '';


nameInputBoxes.forEach((input) => {

  input.addEventListener('input', () => {
    activePlayers = [];
    
    nameInputBoxes.forEach((box) => {
      const name = box.value.trim();
      if (name !== '') {
        activePlayers.push(name);
        box.classList.add('filled');
      } else {
        box.classList.remove('filled');
      }
    });

    // 💡 최소 2명 이상 이름이 입력되면 Shuffle 버튼 활성화, 아니면 다시 비활성화!
    if (activePlayers.length >= 2) {
      if (btnActionShuffle) btnActionShuffle.classList.remove('disabled');
    } else {
      if (btnActionShuffle) btnActionShuffle.classList.add('disabled');
    }
  });
});

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
    // 실제 셔플로 뽑힌 진짜 입력값을 로컬 스토리지에 저장
    sessionStorage.setItem('currentPlayer', selectedPlayer || '. . .');
    
    // ➔ WHITEOUT.html 페이지로 이동
    window.location.href = 'WHITEOUT.html';
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const pickedPlayerNameHtml = document.getElementById('pickedPlayerName');
  
  const savedWinner = localStorage.getItem('currentPlayer');

  if (pickedPlayerNameHtml && savedWinner) {
    pickedPlayerNameHtml.textContent = savedWinner;
  }
});
