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
    // 1. 홈 화면 비활성화
    homeScreen.classList.remove('active');
    
    // 2. 내부 회전 박스 애니메이션 시작
    if (chartRotateWrap) {
      chartRotateWrap.classList.add('spinning');
    }
    
    // 3. 로딩 화면 활성화
    setTimeout(() => {
      loadingScreen.classList.add('active');
    }, 400); 

    // 4. 2.5초 로딩 후 시나리오 창으로 최종 전환
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
    window.location.href = 'situation1.html'; 
  });
}
