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
  creative: `
【あなたの特性】
常に新しいアイデアやユニークな発想で周囲を驚かせるクリエイティブタイプです。

【就活での強み】
・課題を新しい視点で捉え、魅力的な企画を生み出せる  
・「既存の型にとらわれない提案力」がアピールポイント

【おすすめ職種／業界】
企画職・広告／PR・商品開発・マーケティング・スタートアップ

【自己PRに使えるフレーズ例】
「私は誰も考えつかない切り口で、課題をワクワクするアイデアに変換するクリエイティブリーダーです」  

【注意点】
企画の面白さばかり追求すると、論理的な裏付けが弱くなることも。データや論理もセットで伝えましょう。
  `,
  active: `
【あなたの特性】
考えるよりまず行動！情熱と行動力で周囲を巻き込み道を切り拓くタイプです。

【就活での強み】
・未知の環境でもすぐに適応し、成果を出せる  
・リーダーシップと粘り強さが評価されやすい

【おすすめ職種／業界】
営業職・プロジェクトマネジメント・イベント企画・スタートアップ全般

【自己PRに使えるフレーズ例】
「私は行動力に自信があります。大学時代は◯◯を立ち上げ、困難を乗り越えながらチームを前進させました」  

【注意点】
行動が先行しすぎるとミスや方向修正が大変に。適切な計画と振り返りもセットで心がけて。
  `,
  systematic: `
【あなたの特性】
論理的かつ計画的に物事を進める、冷静沈着なシステム思考タイプです。

【就活での強み】
・複雑な課題を分解し、最適な解決策を提示できる  
・高い問題発見・解決スキルで信頼を得やすい

【おすすめ職種／業界】
コンサルティング・経営企画・システム設計・データ分析

【自己PRに使えるフレーズ例】
「私は論理的思考を武器に、常に最適解を導き出します。例として◯◯プロジェクトでは…」  

【注意点】
論理性重視で人の気持ちを忘れがち。コミュニケーション面も意識して伝えましょう。
  `,
  harmonizer: `
【あなたの特性】
周囲との調和を重んじる、チームの潤滑油となるハーモナイザータイプです。

【就活での強み】
・高いコミュニケーション力で信頼関係を構築  
・意見の異なるメンバーをまとめ、最適なチームワークを生み出せる

【おすすめ職種／業界】
人事・カスタマーサクセス・秘書・広報／IR

【自己PRに使えるフレーズ例】
「私はチームの意見を尊重し、全員が力を発揮できる環境づくりを得意とします。◯◯では…」  

【注意点】
誰とでも合わせすぎると自己主張が弱くなることも。自分の意見も適時アピールしましょう。
  `,
  expressive: `
【あなたの特性】
言葉で感動や共感を生み出す、ストーリーテラータイプです。

【就活での強み】
・説得力あるプレゼンテーション・ライティング力  
・ストーリー構成で相手を巻き込む力

【おすすめ職種／業界】
広報・採用人事・プランナー・コンテンツ制作

【自己PRに使えるフレーズ例】
「私は言葉の力で人の心を動かします。◯◯プロジェクトでは…」  

【注意点】
情熱だけで伝えすぎると冗長に。構成と要点を明確にまとめて。
  `,
  balance: `
【あなたの特性】
偏りなく、状況に応じて柔軟に役割を変えられるバランスタイプです。

【就活での強み】
・マルチな視点で課題解決ができる  
・どんなチームにも溶け込み、組織の要となる

【おすすめ職種／業界】
総合職（企画・営業・人事などローテーション可能な職種）・プロジェクトマネジメント

【自己PRに使えるフレーズ例】
「私はどんな環境でもチームの要として機能します。過去には…」  

【注意点】
器用貧乏にならないよう、自分のコア強みを面接で明確化しましょう。
  `
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