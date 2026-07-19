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
  // 1. 현재 화면에 당첨자로 표시된 캐릭터 이름 가져오기 ('린' 등)
  const currentWinner = sessionStorage.getItem('currentPlayer');
  
  // 2. 전체 캐릭터들의 체력 장부 가져오기
  const playerHealth = JSON.parse(sessionStorage.getItem('playerHealth')) || {};
  
  // 3. 화면에 있는 하트 이미지들 긁어오기
  const hearts = document.querySelectorAll('.heart-container .heart');

  // 화면에 당첨자 캐릭터가 표시되어 있고, 장부에 데이터가 있을 때만 실행
  if (currentWinner && playerHealth[currentWinner] !== undefined && hearts.length > 0) {
    
    // ------------------------------------------
    // 1️⃣ 당첨된 캐릭터 본인의 체력에 따른 하트 연동
    // ------------------------------------------
    const characterHp = playerHealth[currentWinner];

    if (characterHp === 0.5) {
      // 체력이 0.5면 첫 번째 하트를 반쪽 하트로 갈아끼우고 선명하게 표시
      hearts[0].src = 'assets/half_heart.png';
      hearts[0].style.opacity = '1.0';
    } 
    else if (characterHp <= 0) {
      // 체력이 0 이하면 첫 번째 하트를 안 보이게 처리
      hearts[0].style.visibility = 'hidden';
    } 
    else {
      // 체력이 1.0 완치 상태라면 기본 꽉 찬 하트로 복구
      hearts[0].src = 'assets/heart_full.png';
      hearts[0].style.opacity = '1.0';
      hearts[0].style.visibility = 'visible';
    }

    // ------------------------------------------
    // 2️⃣ "Save it" 패널티로 인해 '다른 캐릭터들'의 피가 깎였을 때의 연동
    // ------------------------------------------
    // 장부에서 현재 당첨된 캐릭터가 아닌 '다른 캐릭터' 아무나 한 명 찾아옵니다.
    const otherCharacterName = Object.keys(playerHealth).find(name => name !== currentWinner);
    
    if (otherCharacterName) {
      const otherHp = playerHealth[otherCharacterName];

      // 만약 다른 동료들의 피가 1.0에서 0으로 깎인 상태라면?
      if (otherHp <= 0) {
        // 두 번째 하트의 불투명도(opacity)를 50%로 낮춰서 패널티를 시각화합니다!
        hearts[1].style.opacity = '0.5';
      } else {
        // 동료들이 멀쩡하다면 원래대로 선명하게 유지
        hearts[1].style.opacity = '1.0';
      }
    }
  }
});
