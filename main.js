const btnStart = document.getElementById('btnStart');
const chartRotateWrap = document.querySelector('#celestialChart .chart-rotate-wrap');
const celestialChart = document.getElementById('celestialChart');

const homeScreen = document.getElementById('homeScreen');
const loadingScreen = document.getElementById('loadingScreen');
const scenarioScreen = document.getElementById('scenarioScreen');

const btnShuffle = document.querySelector('.btn-shuffle');



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


if (btnShuffle) {
  btnShuffle.addEventListener('click', () => {
    window.location.href = 'shuffle.html';
  });
}


const btnPullCard = document.getElementById('btnPullCard');

if (btnPullCard) {
  btnPullCard.addEventListener('click', () => {
    
    const stage = sessionStorage.getItem('currentStage') || '1';
    
    if (stage === '3') {
      window.location.href = 'end.html';
    } 
      else if (stage === '2') {
      window.location.href = 'situation2.html';
    } 
      else {
      window.location.href = 'situation1.html';
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const currentWinner = sessionStorage.getItem('currentPlayer');
  const playerHealthRaw = sessionStorage.getItem('playerHealth');
  const hearts = document.querySelectorAll('.heart-container .heart');

  if (!currentWinner || !playerHealthRaw || hearts.length === 0) {
    hearts.forEach(heart => {
      heart.style.opacity = '1.0';
      heart.style.visibility = 'visible';
    });
    return; 
  }
  
  const playerHealth = JSON.parse(playerHealthRaw);
  
  const allPlayers = Object.keys(playerHealth);

  allPlayers.forEach((playerName, index) => {
    if (!hearts[index]) return;

    const hp = playerHealth[playerName];

    if (playerName === currentWinner) {
      if (hp >= 1.0) {
        hearts[index].src = 'assets/heart_full.png';
        hearts[index].style.opacity = '1.0';
        hearts[index].style.visibility = 'visible';
        
      } else if (hp === 0.5) {
        hearts[index].src = 'assets/half_heart.png';
        hearts[index].style.opacity = '1.0';
        hearts[index].style.visibility = 'visible';
        
      } else if (hp <= 0) {
        hearts[index].src = 'assets/heart_full.png';
        hearts[index].style.opacity = '0.5';
        hearts[index].style.visibility = 'visible';
      }
    } 

      
    else {
      hearts[index].src = 'assets/heart_full.png';
      hearts[index].style.visibility = 'visible';

      if (hp <= 0) {
        hearts[index].style.opacity = '0.5';
        
      } else {
        hearts[index].style.opacity = '1.0';
      }
    }
  });
});
