const btnStart = document.getElementById('btnStart');

// [수정 1] #celestialChart 자체가 아니라, 그 안의 .chart-rotate-wrap을 타겟팅합니다.
const chartRotateWrap = document.querySelector('#celestialChart .chart-rotate-wrap');

const homeScreen = document.getElementById('homeScreen');
const loadingScreen = document.getElementById('loadingScreen');
const scenarioScreen = document.getElementById('scenarioScreen');

btnStart.addEventListener('click', () => {
  // 1. 홈 화면 비활성화
  homeScreen.classList.remove('active');
  
  // [수정 2] 외곽 박스가 아닌, 내부 회전 박스에 'spinning' 클래스를 추가합니다.
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
