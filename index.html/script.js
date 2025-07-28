const images = [
  'images/sindan01.png','images/sindan02.png','images/sindan03.png','images/sindan04.png',
  'images/sindan05.png','images/sindan06.png','images/sindan07.png','images/sindan08.png',
  'images/sindan09.png','images/sindan10.png'
];
const choices = [
  ["面白い仕掛けを考える","とにかく歩き出す","周辺地図や環境を確認","村人と話して情報収集","この冒険の物語を記録しはじめる"],
  ["新しい目標でワクワクさせる","とりあえず誘って動かす","原因を一緒に整理","チームで支える雰囲気づくり","自分の経験で励ます"],
  ["奇抜な戦術を考える","武器や回復アイテムの準備","ボスの行動パターンを分析","仲間との連携確認","勝った時の名ゼリフを考える"],
  ["一緒に面白い冒険を提案","すぐに連れ出して冒険開始","得意なことを聞き、役割を見極める","まずはじっくり話を聞く","自分の冒険譚を語って場を和ませる"],
  ["新しい抜け道を想像する","力技で突き進む","ルートを見直して冷静に判断","仲間に相談して一緒に考える","その状況を歌や言葉にして落ち着かせる"],
  ["新しい祭りの企画を出す","率先して準備に走る","今ある課題を洗い出し改善策を立てる","みんなの声を集めて方針を決める","祭りの意義を語り、みんなを鼓舞する"],
  ["面白い使い方をひらめく","とりあえず試してみる","仕組みや効果を調査","仲間に意見を聞く","レビューしてみんなに共有"],
  ["トリックや戦術を考える","すぐに踏み出す","地形や敵情報を調べる","仲間と戦略を相談する","士気を上げるセリフで鼓舞する"],
  ["誰も思いつかないアイデアが通った時","行動で成果を出せた時","分析で課題を解決できた時","チームで力を合わせて達成できた時","想いを伝えて人を動かせた時"],
  ["常にワクワクをつくれる人","すぐ行動できる挑戦者","課題を見つけて改善できる人","信頼されるチームプレイヤー","自分の言葉で道を切り拓く人"]
];
const types = ['creative','active','systematic','harmonizer','expressive'];
const typeNames = {
  creative:'ひらめきクリエイター',
  active:'おせっかいヒーロー',
  systematic:'仕掛けの賢者',
  harmonizer:'つなぐ調和士',
  expressive:'言葉の冒険家',
  balance:'バランス型冒険者'
};
const resultImages = {
  creative:'images/type01.png',
  active:'images/type02.png',
  systematic:'images/type03.png',
  harmonizer:'images/type04.png',
  expressive:'images/type05.png',
  balance:'images/type00.png'
};

const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultEl = document.getElementById('result');
let current = 0, answers = [];

startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  quizScreen.style.display = 'block';
  renderQuestion();
});

function renderQuestion() {
  const choiceSet = choices[current];
  quizScreen.innerHTML = `
    <div class="slide">
      <div id="progress">${current + 1} / ${images.length}</div>
      <img src="${images[current]}" alt="質問${current + 1}">
      <div class="options">
        ${choiceSet.map((label, i) => `
          <label>
            <input type="radio" name="opt" value="${types[i]}">
            <span>${label}</span>
          </label>
        `).join('')}
      </div>
      <button class="back-btn" id="back" ${current === 0 ? 'disabled' : ''}>戻る</button>
      <button class="next-btn" id="next" disabled>次へ</button>
    </div>
  `;
  const opts = quizScreen.querySelectorAll('input[name="opt"]');
  const next = document.getElementById('next');
  const back = document.getElementById('back');
  opts.forEach(o => o.addEventListener('change', () => next.disabled = false));
  next.addEventListener('click', () => {
    answers.push(quizScreen.querySelector('input[name="opt"]:checked').value);
    current++;
    current < images.length ? renderQuestion() : showResult();
  });
  back.addEventListener('click', () => {
    if (current > 0) {
      current--;
      answers.pop();
      renderQuestion();
    }
  });
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
