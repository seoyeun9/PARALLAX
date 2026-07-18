// ==========================================
// 1. 화면 및 요소 변수 선언
// ==========================================
const btnStart = document.getElementById('btnStart');
const chartRotateWrap = document.querySelector('#celestialChart .chart-rotate-wrap');
const celestialChart = document.getElementById('celestialChart'); // 에러 방지를 위해 변수 선언 추가

const homeScreen = document.getElementById('homeScreen');
const loadingScreen = document.getElementById('loadingScreen');
const scenarioScreen = document.getElementById('scenarioScreen');
const playersScreen = document.getElementById('playersScreen');
const resultScreen = document.getElementById('resultScreen');

// 셔플 및 이름 입력 관련 변수들
const btnShuffle = document.getElementById('btnShuffle'); 
const btnActionShuffle = document.getElementById('btnActionShuffle'); 
const pickedPlayerName = document.getElementById('pickedPlayerName');

// 현재 채워진 플레이어 이름을 담을 배열
let activePlayers = [];


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
    scenarioScreen.classList.remove('active');
    playersScreen.classList.add('active');
  });
}


// ==========================================
// 4. 가짜 입력 기능 (Name 박스 클릭 시 Player 이름 주입)
// ==========================================
document.querySelectorAll('.name-input-box').forEach((box) => {
  box.addEventListener('click', function() {
    const idx = this.getAttribute('data-index');
    const playerName = `Player ${idx}`;
    
    // 이미 배열에 들어간 이름이 아니라면 텍스트 바꾸고 추가
    if (!activePlayers.includes(playerName)) {
      this.textContent = playerName;
      this.classList.add('filled'); // 불투명도 100% 스타일 적용
      activePlayers.push(playerName);
    }
    
    // 💡 핵심: 2개 이상의 칸이 채워지면 Shuffle 버튼 활성화!
    if (activePlayers.length >= 2) {
      if (btnActionShuffle) {
        btnActionShuffle.classList.remove('disabled');
      }
    }
  });
});


// ==========================================
// 5. 플레이어 입력 완료 ➔ 랜덤 셔플 결과 화면 이동
// ==========================================
if (btnActionShuffle) {
  btnActionShuffle.addEventListener('click', () => {
    // 2개 이상 안 채워져서 disabled 클래스가 붙어있으면 작동 안 함
    if (btnActionShuffle.classList.contains('disabled')) return;
    
    // 입력된 이름들 중 랜덤으로 하나 선택
    if (activePlayers.length > 0) {
      const randomIndex = Math.floor(Math.random() * activePlayers.length);
      const winner = activePlayers[randomIndex];
      
      // 결과 카드 자리에 이름 꽂아넣기
      if (pickedPlayerName) {
        pickedPlayerName.textContent = winner;
      }
    }
    
    // 최종 화면 전환
    playersScreen.classList.remove('active');
    resultScreen.classList.add('active');
  });
}
