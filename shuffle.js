const playersScreen = document.getElementById('playersScreen');
const resultScreen = document.getElementById('resultScreen');
const btnActionShuffle = document.getElementById('btnActionShuffle'); 
const pickedPlayerName = document.getElementById('pickedPlayerName');
const btnChooseDone = document.getElementById('btnChooseDone');

const playerInputField = document.getElementById('playerInputField');
const btnAddPlayer = document.getElementById('btnAddPlayer');
const nameInputBoxes = document.querySelectorAll('.name-input-box');

let activePlayers = [];
let selectedPlayer = '';


if (btnAddPlayer && playerInputField) {
  btnAddPlayer.addEventListener('click', () => {
    const nameToAppend = playerInputField.value.trim();
    
    if (!nameToAppend) return;
    if (activePlayers.includes(nameToAppend)) {
      alert('This name already exists!');
      return;
    }

    // 1. 데이터 배열에 이름 추가
    activePlayers.push(nameToAppend);

    const targetBox = nameInputBoxes[activePlayers.length - 1];
    if (targetBox) {
      targetBox.textContent = nameToAppend;
      targetBox.classList.add('filled');
    }

    playerInputField.value = '';

    if (activePlayers.length >= 2 && btnActionShuffle) {
      btnActionShuffle.classList.remove('disabled');
    }
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
    // 실제 셔플로 뽑힌 이름을 세션/로컬에 저장!
    localStorage.setItem('currentPlayer', selectedPlayer || '. . .');

    // ➔ WHITEOUT.html 페이지로 이동
    window.location.href = 'WHITEOUT.html';
  });
}
