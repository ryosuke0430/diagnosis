// 必要なDOM要素を取得
const questionsContainer = document.getElementById('questions');
const questionBlocks = document.querySelectorAll('.question-block');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const resultSection = document.getElementById('result');
const resultText = document.getElementById('result-text');
const resetBtn = document.getElementById('resetBtn');

let currentQuestionIndex = 0; // 現在の質問のインデックス
let userAnswers = {}; // ユーザーの回答を保存するオブジェクト

// --- UIの初期表示設定 ---
// 最初は最初の質問だけ表示し、他は非表示
questionBlocks.forEach((block, index) => {
    if (index === 0) {
        block.style.display = 'block';
    } else {
        block.style.display = 'none';
    }
});

submitBtn.style.display = 'none'; // 診断ボタンは最初は非表示
resultSection.style.display = 'none'; // 結果セクションも最初は非表示

// --- イベントリスナーの設定 ---

// 「次へ」ボタンのクリックイベント
nextBtn.addEventListener('click', () => {
    const currentQuestionId = `q${currentQuestionIndex + 1}`;
    const selectedOption = document.querySelector(`input[name="${currentQuestionId}"]:checked`);

    if (!selectedOption) {
        alert('いずれかの選択肢を選んでください。');
        return;
    }

    userAnswers[currentQuestionId] = selectedOption.value; // 回答を保存

    // 現在の質問を非表示
    questionBlocks[currentQuestionIndex].style.display = 'none';

    currentQuestionIndex++; // 次の質問へ

    // 次の質問があれば表示、なければ診断ボタンを表示
    if (currentQuestionIndex < questionBlocks.length) {
        questionBlocks[currentQuestionIndex].style.display = 'block';
        // 最後の質問なら「次へ」を非表示にし、「診断する」を表示
        if (currentQuestionIndex === questionBlocks.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        }
    }
});

// 「診断する」ボタンのクリックイベント
submitBtn.addEventListener('click', () => {
    const currentQuestionId = `q${currentQuestionIndex + 1}`;
    const selectedOption = document.querySelector(`input[name="${currentQuestionId}"]:checked`);

    if (!selectedOption) {
        alert('いずれかの選択肢を選んでください。');
        return;
    }
    userAnswers[currentQuestionId] = selectedOption.value; // 最後の回答を保存

    // 診断ロジックを実行
    const result = analyzeAnswers(userAnswers);

    // 質問セクションを非表示にし、結果セクションを表示
    questionsContainer.style.display = 'none';
    resultSection.style.display = 'block';
    resultText.innerHTML = result; // 結果を表示
});

// 「もう一度診断する」ボタンのクリックイベント
resetBtn.addEventListener('click', () => {
    // 全ての質問をリセット
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });

    currentQuestionIndex = 0;
    userAnswers = {};

    // UIを初期状態に戻す
    resultSection.style.display = 'none';
    questionsContainer.style.display = 'block';
    questionBlocks.forEach((block, index) => {
        if (index === 0) {
            block.style.display = 'block';
        } else {
            block.style.display = 'none';
        }
    });
    nextBtn.style.display = 'block';
    submitBtn.style.display = 'none';
});


// --- 診断ロジックの関数 ---
function analyzeAnswers(answers) {
    // ここに診断のロジックを書きます
    // 例: 各回答にスコアを割り当てて合計点で判定
    let scoreA = 0;
    let scoreB = 0;
    let scoreC = 0;

    // Q1のロジック
    if (answers.q1 === 'A') {
        scoreA += 1;
    } else if (answers.q1 === 'B') {
        scoreB += 1;
    } else if (answers.q1 === 'C') {
        scoreC += 1;
    }

    // Q2のロジック (追加の質問がある場合)
    if (answers.q2 === 'X') {
        scoreA += 1; // 例えば、内向的なタイプに加点
    } else if (answers.q2 === 'Y') {
        scoreB += 1; // 例えば、社交的なタイプに加点
    } else if (answers.q2 === 'Z') {
        scoreC += 1; // 例えば、活動的なタイプに加点
    }

    // スコアに基づいて結果を判定
    let result = '';
    if (scoreA > scoreB && scoreA > scoreC) {
        result = 'あなたは**インドア派で思慮深いタイプ**です。一人でじっくりと物事を考えるのが得意で、落ち着いた環境で最高のパフォーマンスを発揮します。';
    } else if (scoreB > scoreA && scoreB > scoreC) {
        result = 'あなたは**社交的で協調性のあるタイプ**です。人との交流を楽しみ、チームで協力して目標を達成することに喜びを感じます。';
    } else if (scoreC > scoreA && scoreC > scoreB) {
        result = 'あなたは**好奇心旺盛で行動的なタイプ**です。新しいことへの挑戦を恐れず、常に刺激を求めて積極的に行動します。';
    } else {
        result = 'あなたの個性は多面的で、特定のタイプに分類するのが難しいようです。複数の特徴を併せ持っている可能性があります。';
    }

    // HTMLタグを含めることで、結果に装飾を追加できます
    // 例: return `<p>あなたのタイプは**${resultType}**です！</p><p>${description}</p>`;
    return result;
}