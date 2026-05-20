const questions = [
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
  { question: "What is 12 × 12?", options: ["124", "144", "132", "156"], answer: "144" },
  { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Homer"], answer: "William Shakespeare" },
  { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
  { question: "Which element has the chemical symbol 'O'?", options: ["Gold", "Oxygen", "Osmium", "Oganesson"], answer: "Oxygen" },
  { question: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: "6" },
  { question: "What is the fastest land animal?", options: ["Lion", "Horse", "Cheetah", "Leopard"], answer: "Cheetah" },
  { question: "In which year did World War II end?", options: ["1943", "1944", "1945", "1946"], answer: "1945" },
  { question: "What language is primarily used for web styling?", options: ["HTML", "JavaScript", "Python", "CSS"], answer: "CSS" },
];

let currentIndex = 0;
let score = 0;
let timer = null;

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function startTimer() {
  let timeLeft = 60;
  const timerEl = document.getElementById('timer');
  const timerCount = document.getElementById('timer-count');
  timerCount.textContent = timeLeft;
  timerEl.classList.remove('timer-low');

  timer = setInterval(() => {
    timeLeft--;
    timerCount.textContent = timeLeft;
    if (timeLeft <= 10) timerEl.classList.add('timer-low');
    if (timeLeft <= 0) {
      clearInterval(timer);
      showCorrectAnswer();
      setTimeout(nextQuestion, 1500);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  document.getElementById('timer').classList.remove('timer-low');
}

function loadQuestion() {
  const q = questions[currentIndex];

  document.getElementById('question-number').textContent = `Question ${currentIndex + 1} / ${questions.length}`;
  document.getElementById('score-display').textContent = `Score: ${score}`;
  document.getElementById('progress-fill').style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
  document.getElementById('question-text').textContent = q.question;
  document.getElementById('next-btn').classList.add('hidden');
  document.getElementById('options-container').innerHTML = '';

  stopTimer();
  startTimer();

  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.onclick = () => selectAnswer(btn, option);
    document.getElementById('options-container').appendChild(btn);
  });
}

function selectAnswer(btn, chosen) {
  stopTimer();
  showCorrectAnswer();

  if (chosen === questions[currentIndex].answer) {
    score++;
    btn.classList.add('correct');
  } else {
    btn.classList.add('wrong');
  }

  document.getElementById('score-display').textContent = `Score: ${score}`;
  document.getElementById('next-btn').classList.remove('hidden');
}

function showCorrectAnswer() {
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === questions[currentIndex].answer) btn.classList.add('correct');
  });
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showScreen('result-screen');
  document.getElementById('result-score').textContent = `You scored ${score} out of ${questions.length}`;

  if (score >= 9) {
    document.getElementById('result-emoji').textContent = '🏆';
    document.getElementById('result-title').textContent = 'Perfect Score!';
    document.getElementById('result-message').textContent = 'Outstanding! You got every question right!';
  } else if (score >= 7) {
    document.getElementById('result-emoji').textContent = '🎉';
    document.getElementById('result-title').textContent = 'Great Job!';
    document.getElementById('result-message').textContent = 'You did really well. Keep it up!';
  } else if (score >= 5) {
    document.getElementById('result-emoji').textContent = '😊';
    document.getElementById('result-title').textContent = 'Not Bad!';
    document.getElementById('result-message').textContent = 'Good effort! A little more practice and you\'ll ace it.';
  } else {
    document.getElementById('result-emoji').textContent = '📚';
    document.getElementById('result-title').textContent = 'Keep Studying!';
    document.getElementById('result-message').textContent = 'Don\'t give up — try again and improve your score!';
  }
}

// Button events
document.getElementById('start-btn').onclick = () => {
  showScreen('quiz-screen');
  loadQuestion();
};

document.getElementById('next-btn').onclick = nextQuestion;

document.getElementById('restart-btn').onclick = () => {
  currentIndex = 0;
  score = 0;
  showScreen('quiz-screen');
  loadQuestion();
};

document.getElementById('exit-btn').onclick = () => {
  currentIndex = 0;
  score = 0;
  stopTimer();
  showScreen('start-screen');
};
