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
const resultEmoji      = document.getElementById("result-emoji");
const resultTitle      = document.getElementById("result-title");
const resultScore      = document.getElementById("result-score");
const resultMessage    = document.getElementById("result-message");

// Show a screen, hide others
function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach(s => s.classList.add("hidden"));
  screen.classList.remove("hidden");
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

  nextBtn.classList.remove("hidden");
}
