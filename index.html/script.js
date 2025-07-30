document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'images/sindan01.png', 'images/sindan02.png', 'images/sindan03.png', 'images/sindan04.png',
        'images/sindan05.png', 'images/sindan06.png', 'images/sindan07.png', 'images/sindan08.png',
        'images/sindan09.png', 'images/sindan10.png'
    ];
    const choices = [
        ["面白い仕掛けを考える", "とにかく歩き出す", "周辺地図や環境を確認", "村人と話して情報収集", "この冒険の物語を記録しはじめる"],
        ["新しい目標でワクワクさせる", "とりあえず誘って動かす", "原因を一緒に整理", "チームで支える雰囲気づくり", "自分の経験で励ます"],
        ["奇抜な戦術を考える", "武器や回復アイテムの準備", "ボスの行動パターンを分析", "仲間との連携確認", "勝った時の名ゼリフを考える"],
        ["一緒に面白い冒険を提案", "すぐに連れ出して冒険開始", "得意なことを聞き、役割を見極める", "まずはじっくり話を聞く", "自分の冒険譚を語って場を和ませる"],
        ["新しい抜け道を想像する", "力技で突き進む", "ルートを見直して冷静に判断", "仲間に相談して一緒に考える", "その状況を歌や言葉にして落ち着かせる"],
        ["新しい祭りの企画を出す", "率先して準備に走る", "今ある課題を洗い出し改善策を立てる", "みんなの声を集めて方針を決める", "祭りの意義を語り、みんなを鼓舞する"],
        ["面白い使い方をひらめく", "とりあえず試してみる", "仕組みや効果を調査", "仲間に意見を聞く", "レビューしてみんなに共有"],
        ["トリックや戦術を考える", "すぐに踏み出す", "地形や敵情報を調べる", "仲間と戦略を相談する", "士気を上げるセリフで鼓舞する"],
        ["誰も思いつかないアイデアが通った時", "行動で成果を出せた時", "分析で課題を解決できた時", "チームで力を合わせて達成できた時", "想いを伝えて人を動かせた時"],
        ["常にワクワクをつくれる人", "すぐ行動できる挑戦者", "課題を見つけて改善できる人", "信頼されるチームプレイヤー", "自分の言葉で道を切り拓く人"]
    ];
    const types = ['creative', 'active', 'systematic', 'harmonizer', 'expressive'];
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
    const resultDescriptions = {
        creative: 'あなたは常に新しいアイデアやユニークな発想で周りを驚かせます。人とは違う視点から物事を捉え、創造的な解決策を生み出す才能に溢れています。',
        active: 'あなたは考えるよりもまず行動する、情熱的な挑戦者です。困難にも臆することなく飛び込み、その行動力で周囲を巻き込みながら道を切り拓いていきます。',
        systematic: 'あなたは物事を論理的に、そして計画的に進めることを得意とします。複雑な状況でも冷静に分析し、最も効率的で確実な方法を見つけ出すことができる賢者です。',
        harmonizer: 'あなたは周囲の意見を尊重し、チーム全体の調和を大切にします。コミュニケーション能力が高く、みんなが気持ちよく協力できる環境をつくり出す、縁の下の力持ちです。',
        expressive: 'あなたは自分の感情や考えを言葉にして伝えることが得意です。感動的な物語や力強いメッセージで人々の心を動かし、新たな一歩を踏み出す勇気を与えます。',
        balance: 'あなたは特定のタイプに偏らず、様々な強みをバランス良く兼ね備えています。状況に応じて柔軟に役割を変え、どんなチームや環境にも適応できる万能な才能を持っています。'
    };

    const startBtn = document.getElementById('start-btn');
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultEl = document.getElementById('result');
    let current = 0,
        answers = [];

    const hideAllScreens = () => {
        startScreen.style.display = 'none';
        quizScreen.style.display = 'none';
        resultEl.style.display = 'none';
    };

    // Fade in the start button
    setTimeout(() => {
        startBtn.style.opacity = 1;
        startBtn.style.transition = 'opacity 1s ease-in';
    }, 500);

    startBtn.addEventListener('click', () => {
        hideAllScreens();
        quizScreen.style.display = 'block';
        renderQuestion();
    });

    function renderQuestion() {
        if (current >= images.length) {
            showResult();
            return;
        }

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
            </div>
        `;

        const opts = quizScreen.querySelectorAll('input[name="opt"]');
        opts.forEach(o => o.addEventListener('change', () => {
            // ラジオボタンが選択されたら、自動で次の問題へ
            answers.push(o.value);
            current++;
            renderQuestion();
        }));
    }

    function showResult() {
        hideAllScreens();
        const score = {};
        answers.forEach(t => score[t] = (score[t] || 0) + 1);
        const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);
        const topScore = sorted[0][1];
        const isBalanced = sorted.length > 1 && sorted.every(([_, val]) => Math.abs(val - topScore) <= 1);
        const key = isBalanced ? 'balance' : sorted[0][0];

        const imgSrc = resultImages[key];
        const resultName = typeNames[key];
        const resultDescription = resultDescriptions[key];

        resultEl.innerHTML = `
            <img src="${imgSrc}" alt="${resultName}">
            <div class="result-text" style="color:white; padding:1rem;">
                <h2>${resultName}</h2>
                <p>${resultDescription}</p>
            </div>
            <button class="btn retry-btn" id="retry-btn">もう一度診断する</button>
            <button class="btn share-btn" id="share-btn">結果を共有</button>
        `;
        resultEl.style.display = 'block';

        document.getElementById('retry-btn').addEventListener('click', () => {
            current = 0;
            answers = [];
            hideAllScreens();
            startScreen.style.display = 'block';
        });

        document.getElementById('share-btn').addEventListener('click', () => {
            const textToShare = `私の適職は「${resultName}」でした！あなたも診断してみよう！\n[あなたのウェブサイトのURL]`;
            if (navigator.share) {
                navigator.share({
                    title: '適職診断',
                    text: textToShare,
                    url: window.location.href,
                }).catch(console.error);
            } else {
                navigator.clipboard.writeText(textToShare)
                    .then(() => alert('診断結果がクリップボードにコピーされました！'))
                    .catch(err => console.error('クリップボードへのコピーに失敗しました', err));
            }
        });
    }
});