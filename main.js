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
  const playerHealthRaw = sessionStorage.getItem('playerHealth');
  const hearts = document.querySelectorAll('.heart-container .heart');

  // 🚨 [안전장치] 초기 상태이거나 데이터가 없으면 하트를 건드리지 않고 모두 선명하게 유지
  if (!currentWinner || !playerHealthRaw || hearts.length === 0) {
    hearts.forEach(heart => {
      heart.style.opacity = '1.0';
      heart.style.visibility = 'visible';
    });
    return; 
  }

  const playerHealth = JSON.parse(playerHealthRaw);
  
  // 💡 장부에 등록된 모든 플레이어의 이름 배열 (예: ['나', '철수', '영희'])
  const allPlayers = Object.keys(playerHealth);

  // 💡 [핵심] 모든 캐릭터를 돌면서 각자의 순서(index)에 맞는 하트를 개별 제어합니다!
  allPlayers.forEach((playerName, index) => {
    if (!hearts[index]) return; // HTML 하트 개수 초과 방지 안전장치

    const hp = playerHealth[playerName];

    // ------------------------------------------
    // 1️⃣ 현재 선택된 플레이어(나)의 하트 제어
    // ------------------------------------------
    if (playerName === currentWinner) {
      if (hp >= 1.0) {
        // 2번 조건: Use it을 눌러 다시 1이 되면 투명도 1.0 완치 상태로 복구!
        hearts[index].src = 'assets/heart_full.png';
        hearts[index].style.opacity = '1.0';
        hearts[index].style.visibility = 'visible';
      } else if (hp === 0.5) {
        // 1번 조건: 체력이 0.5 깎여서 반쪽이 되면 반쪽 하트로 표시!
        hearts[index].src = 'assets/half_heart.png';
        hearts[index].style.opacity = '1.0';
        hearts[index].style.visibility = 'visible';
      } else if (hp <= 0) {
        // 완전히 다 닳았을 때 (기존 룰 유지: 흐리게 만듦)
        hearts[index].src = 'assets/heart_full.png';
        hearts[index].style.opacity = '0.5';
        hearts[index].style.visibility = 'visible';
      }
    } 
    
    // ------------------------------------------
    // 2️⃣ 나머지 플레이어(동료들)의 하트 제어
    // ------------------------------------------
    else {
      // 동료들의 이미지는 꽉 찬 하트 고정
      hearts[index].src = 'assets/heart_full.png';
      hearts[index].style.visibility = 'visible';

      if (hp <= 0) {
        // 3번 조건: Save it을 눌러 동료들의 피가 0이 되었다면 opacity를 0.5로 내려가게 함!
        hearts[index].style.opacity = '0.5';
      } else {
        // 평소에는 멀쩡하게 선명함
        hearts[index].style.opacity = '1.0';
      }
    }
  });
});
