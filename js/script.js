const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is 12 × 12?",
    options: ["124", "144", "132", "156"],
    answer: "144",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Homer"],
    answer: "William Shakespeare",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific",
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    answer: "Oxygen",
  },
  {
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    answer: "6",
  },
  {
    question: "What is the fastest land animal?",
    options: ["Lion", "Horse", "Cheetah", "Leopard"],
    answer: "Cheetah",
  },
  {
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    answer: "1945",
  },
  {
    question: "What language is primarily used for web styling?",
    options: ["HTML", "JavaScript", "Python", "CSS"],
    answer: "CSS",
  },
];

// State
let currentIndex = 0;
let score = 0;
let timerInterval = null;

// Elements
const startScreen      = document.getElementById("start-screen");
const quizScreen       = document.getElementById("quiz-screen");
const resultScreen     = document.getElementById("result-screen");
const questionText     = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionNumber   = document.getElementById("question-number");
const scoreDisplay     = document.getElementById("score-display");
const progressFill     = document.getElementById("progress-fill");
const nextBtn          = document.getElementById("next-btn");
const timerEl          = document.getElementById("timer");
const timerCount       = document.getElementById("timer-count");
const resultEmoji      = document.getElementById("result-emoji");
const resultTitle      = document.getElementById("result-title");
const resultScore      = document.getElementById("result-score");
const resultMessage    = document.getElementById("result-message");

// Show a screen, hide others
function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

// Timer
function startTimer() {
  let timeLeft = 60;
  timerCount.textContent = timeLeft;
  timerEl.classList.remove("timer-low");

  timerInterval = setInterval(() => {
    timeLeft--;
    timerCount.textContent = timeLeft;

    if (timeLeft <= 10) timerEl.classList.add("timer-low");

    if (timeLeft <= 0) {
      clearTimer();
      timeExpired();
    }
  }, 1000);
}

function clearTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerEl.classList.remove("timer-low");
}

function timeExpired() {
  // Reveal correct answer and auto-advance after 1.5s
  const allOptions = optionsContainer.querySelectorAll(".option-btn");
  const correct = questions[currentIndex].answer;
  allOptions.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add("correct");
  });
  setTimeout(() => {
    currentIndex++;
    if (currentIndex < questions.length) loadQuestion();
    else showResult();
  }, 1500);
}

// Load current question
function loadQuestion() {
  const q = questions[currentIndex];

  questionNumber.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
  scoreDisplay.textContent   = `Score: ${score}`;
  progressFill.style.width   = `${((currentIndex + 1) / questions.length) * 100}%`;
  questionText.textContent   = q.question;

  optionsContainer.innerHTML = "";
  nextBtn.classList.add("hidden");
  clearTimer();
  startTimer();

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className   = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(btn, option, q.answer));
    optionsContainer.appendChild(btn);
  });
}

// Handle answer selection
function selectAnswer(selected, chosen, correct) {
  const allOptions = optionsContainer.querySelectorAll(".option-btn");

  allOptions.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add("correct");
  });

  if (chosen === correct) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  } else {
    selected.classList.add("wrong");
  }

  clearTimer();
  nextBtn.classList.remove("hidden");
}

// Show result screen
function showResult() {
  showScreen(resultScreen);

  const total = questions.length;
  const pct   = (score / total) * 100;

  resultScore.textContent = `You scored ${score} out of ${total}`;

  if (pct === 100) {
    resultEmoji.textContent   = "🏆";
    resultTitle.textContent   = "Perfect Score!";
    resultMessage.textContent = "Outstanding! You got every question right!";
  } else if (pct >= 70) {
    resultEmoji.textContent   = "🎉";
    resultTitle.textContent   = "Great Job!";
    resultMessage.textContent = "You did really well. Keep it up!";
  } else if (pct >= 40) {
    resultEmoji.textContent   = "😊";
    resultTitle.textContent   = "Not Bad!";
    resultMessage.textContent = "Good effort! A little more practice and you'll ace it.";
  } else {
    resultEmoji.textContent   = "📚";
    resultTitle.textContent   = "Keep Studying!";
    resultMessage.textContent = "Don't give up — try again and improve your score!";
  }
}

// Reset and restart
function restartQuiz() {
  currentIndex = 0;
  score        = 0;
  clearTimer();
  showScreen(quizScreen);
  loadQuestion();
}

// Event Listeners
document.getElementById("start-btn").addEventListener("click", () => {
  showScreen(quizScreen);
  loadQuestion();
});

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

document.getElementById("restart-btn").addEventListener("click", restartQuiz);
