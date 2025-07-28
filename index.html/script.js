const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const slides = document.querySelectorAll('.slide');
const resultEl = document.getElementById('result');
const typeNames = {
  creative: 'ひらめきクリエイター',
  active: 'おせっかいヒーロー',
  systematic: '仕掛けの賢者',
  harmonizer: 'つなぐ調和士',
  expressive: '言葉の冒険家',
  balance: 'バランス型冒険者'
};
const resultImages = {
  creative: 'images/type01.png',
  active: 'images/type02.png',
  systematic: 'images/type03.png',
  harmonizer: 'images/type04.png',
  expressive: 'images/type05.png',
  balance: 'images/type00.png'
};

let current = 0;
const answers = [];

startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  slides[0].classList.add('active');
  quizScreen.style.display = 'block';
  updateNav();
});

function updateNav() {
  const nextBtn = document.querySelector('.next-btn');
  const backBtn = document.querySelector('.back-btn');
  const currentSlide = slides[current];

  const selected = currentSlide.querySelector('input:checked');
  nextBtn.disabled = !selected;

  const allOptions = currentSlide.querySelectorAll('input');
  allOptions.forEach(opt => {
    opt.addEventListener('change', () => {
      nextBtn.disabled = false;
    });
  });

  nextBtn.onclick = () => {
    const selected = currentSlide.querySelector('input:checked');
    answers[current] = selected.value;
    slides[current].classList.remove('active');
    current++;
    if (current < slides.length) {
      slides[current].classList.add('active');
      updateNav();
    } else {
      showResult();
    }
  };

  backBtn.onclick = () => {
    if (current > 0) {
      slides[current].classList.remove('active');
      current--;
      slides[current].classList.add('active');
      updateNav();
    }
  };
}

function showResult() {
  quizScreen.style.display = 'none';
  const score = {};
  answers.forEach(t => score[t] = (score[t] || 0) + 1);
  const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);
  const topScore = sorted[0][1];
  const isBalanced = sorted.every(([_, val]) => Math.abs(val - topScore) <= 1);
  const key = isBalanced ? 'balance' : sorted[0][0];
  const imgSrc = resultImages[key];

  resultEl.innerHTML = `
    <img src="${imgSrc}" alt="診断結果"><br>
    <h2>${typeNames[key]}</h2>
    <button class="retry-btn" onclick="location.reload()">もう一度やる</button>
    <button class="share-btn" onclick="alert('共有機能は現在準備中です')">結果を共有</button>
  `;
  resultEl.style.display = 'block';
}
