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


document.addEventListener('DOMContentLoaded', () => {
  // 1. 현재 셔플로 매칭된 플레이어 이름 가져오기
  const currentWinner = localStorage.getItem('currentPlayer');
  
  // 2. 전체 플레이어들의 체력 장부(Object) 가져오기
  const playerHealth = JSON.parse(localStorage.getItem('playerHealth')) || {};
  
  // 3. 화면에 있는 하트 이미지(8개) 전부 긁어오기
  const hearts = document.querySelectorAll('.heart-container .heart');

  // 현재 매칭된 유저가 있고, 체력 데이터가 기록되어 있으며, 하트 엘리먼트가 존재할 때만 실행
  if (currentWinner && playerHealth[currentWinner] !== undefined && hearts.length > 0) {
    const hp = playerHealth[currentWinner];

    // 💡 체력이 0.5로 반토막 난 상태라면?
    if (hp === 0.5) {
      // 가장 첫 번째 하트(index 0)의 이미지를 반쪽 하트로 교체!
      hearts[0].src = 'assets/half-heart.png';
    } 
    // 💡 체력이 0이 되어 아예 다 닳았다면?
    else if (hp <= 0) {
      // 첫 번째 하트를 화면에서 아예 숨김 처리
      hearts[0].style.visibility = 'hidden';
    }
  }
});
