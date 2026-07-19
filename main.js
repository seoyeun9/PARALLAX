const btnStart = document.getElementById('btnStart');
const chartRotateWrap = document.querySelector('#celestialChart .chart-rotate-wrap');
const celestialChart = document.getElementById('celestialChart');

const homeScreen = document.getElementById('homeScreen');
const loadingScreen = document.getElementById('loadingScreen');
const scenarioScreen = document.getElementById('scenarioScreen');

const btnShuffle = document.querySelector('.btn-shuffle');


// ==========================================
// 2. 홈 화면 ➔ 로딩 ➔ 시나리오 화면 전환 (기존 로직)
// ==========================================
if (btnStart) {
  btnStart.addEventListener('click', () => {
    sessionStorage.clear(); 
  
    homeScreen.classList.remove('active');
    
    if (chartRotateWrap) {
      chartRotateWrap.classList.add('spinning');
    }
    
    setTimeout(() => {
      loadingScreen.classList.add('active');
    }, 400); 
  
    setTimeout(() => {
      loadingScreen.classList.remove('active');
  
      if (celestialChart) {
        celestialChart.classList.add('fade-out');
      }
      
      setTimeout(() => {
        scenarioScreen.classList.add('active');
      }, 400);
    }, 2500); 
  });
}

// ==========================================
// 3. 시나리오 화면 ➔ 플레이어 입력 화면 이동
// ==========================================
if (btnShuffle) {
  btnShuffle.addEventListener('click', () => {
    window.location.href = 'shuffle.html';
  });
}


const btnPullCard = document.getElementById('btnPullCard');

if (btnPullCard) {
  btnPullCard.addEventListener('click', () => {
    
    const stage = sessionStorage.getItem('currentStage') || '1';
    
    if (stage === '2') {
      window.location.href = 'situation2.html';
    } else {
      window.location.href = 'situation1.html';
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const currentWinner = sessionStorage.getItem('currentPlayer');
  const playerHealth = JSON.parse(sessionStorage.getItem('playerHealth')) || {};
  const hearts = document.querySelectorAll('.heart-container .heart'); // 8개 하트라고 가정

  // 1. 현재 플레이어의 하트 업데이트
  if (currentWinner && hearts.length > 0) {
    const myHp = playerHealth[currentWinner];
    // 치료받아서 1.0이 되면 꽉 찬 하트, 아니면 반쪽/숨김
    if (myHp >= 1.0) {
      hearts[0].src = 'assets/heart_full.png';
      hearts[0].style.opacity = '1.0';
    } else if (myHp === 0.5) {
      hearts[0].src = 'assets/half_heart.png';
    } else {
      hearts[0].style.visibility = 'hidden';
    }
  }

  // 2. [Save It 패널티 반영] 나를 제외한 전원의 하트 업데이트
  const others = Object.keys(playerHealth).filter(n => n !== currentWinner);
  
  // 모든 동료의 피가 0 이하인가?
  const isAllOthersDead = others.every(name => playerHealth[name] <= 0);
  
  // 💡 [핵심] 다른 사람들의 피가 깎였다면 2번째 하트(index 1)를 흐리게!
  if (hearts.length > 1) {
    hearts[1].style.opacity = isAllOthersDead ? '0.5' : '1.0';
  }
});
