const btnStart = document.getElementById('btnStart');
const celestialChart = document.getElementById('celestialChart');

const homeScreen = document.getElementById('homeScreen');
const loadingScreen = document.getElementById('loadingScreen');
const scenarioScreen = document.getElementById('scenarioScreen');

btnStart.addEventListener('click', () => {
  // 1. 홈 화면 비활성화
  homeScreen.classList.remove('active');
  
  // 2. 천체 회전 애니메이션 클래스 추가 (천천히 돌기 시작)
  celestialChart.classList.add('spinning');
  
  // 3. 로딩 화면 활성화
  setTimeout(() => {
    loadingScreen.classList.add('active');
  }, 400); // 부드러운 교차 전환을 위한 미세한 딜레이

  // 4. 2.5초 로딩 후 시나리오 창으로 최종 전환
  setTimeout(() => {
    loadingScreen.classList.remove('active');
    
    setTimeout(() => {
      scenarioScreen.classList.add('active');
    }, 400);
  }, 2500); // 2.5초간 로딩 연출
});
