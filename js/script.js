const questions = [
  {
    question: "Which keyword is used to define a function in Python?",
    options: ["function", "def", "fun", "define"],
    answer: "def"
  },
  {
    question: "Which data type stores True or False?",
    options: ["String", "Integer", "Boolean", "List"],
    answer: "Boolean"
  },
  {
    question: "Which symbol is used for comments in Python?",
    options: ["//", "#", "/*", "--"],
    answer: "#"
  },
  {
    question: "Which method adds an item to a Python list?",
    options: ["add()", "insertEnd()", "append()", "push()"],
    answer: "append()"
  },
  {
    question: "What is the output type of input() in Python?",
    options: ["Integer", "String", "Boolean", "Float"],
    answer: "String"
  }
];

let studentName = "";
let timeLeft = 300;
let timerInterval;

function startExam() {
  studentName = document.getElementById("studentName").value.trim();

  if (!studentName) {
    document.getElementById("loginError").textContent = "Please enter your full name to continue.";
    return;
  }

  document.getElementById("loginError").textContent = "";
  document.getElementById("profileName").textContent = studentName;
  document.getElementById("avatar").textContent = studentName.charAt(0).toUpperCase();

  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("exam-section").classList.remove("hidden");

  document.getElementById("welcome").textContent =
    "Candidate: " + studentName + " • 5 questions • 5 minutes";

  loadQuestions();
  updateProgress();
  startTimer();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function loadQuestions() {
  const container = document.getElementById("questions");
  container.innerHTML = "";

  questions.forEach((q, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "question";

    let optionsHTML = "";
    q.options.forEach(option => {
      optionsHTML += `
        <label class="option">
          <input type="radio" name="q${index}" value="${option}">
          <span>${option}</span>
        </label>
      `;
    });

    wrapper.innerHTML = `
      <h3>${index + 1}. ${q.question}</h3>
      ${optionsHTML}
    `;

    container.appendChild(wrapper);
  });

  container.addEventListener("change", updateProgress);
}

function updateProgress() {
  let answered = 0;

  questions.forEach((_, index) => {
    if (document.querySelector(`input[name="q${index}"]:checked`)) {
      answered++;
    }
  });

  const percentage = (answered / questions.length) * 100;
  document.getElementById("progressText").textContent =
    `${answered} / ${questions.length} answered`;
  document.getElementById("progressBar").style.width = percentage + "%";
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timer = document.getElementById("timer");

    timer.textContent =
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");

    if (timeLeft <= 30) {
      timer.style.color = "#ffb4b4";
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitExam(true);
    }
  }, 1000);
}

function submitExam(autoSubmit = false) {
  clearInterval(timerInterval);

  let score = 0;

  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  document.getElementById("exam-section").classList.add("hidden");
  document.getElementById("result-section").classList.remove("hidden");

  document.getElementById("resultName").textContent = studentName;
  document.getElementById("scoreValue").textContent = `${score}/${questions.length}`;
  document.getElementById("result").textContent = autoSubmit
    ? `Time is up. Your final score is ${score} out of ${questions.length}.`
    : `You completed the assessment successfully with a score of ${score} out of ${questions.length}.`;

  window.scrollTo({ top: 0, behavior: "smooth" });
}
