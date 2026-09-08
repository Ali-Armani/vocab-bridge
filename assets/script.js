// ---------- Vocabulary data ----------
const vocabList = [
  { en: "friend", fa: "دوست", examples: ["You are my best friend.", "She made a new friend at school."] },
  { en: "journey", fa: "سفر", examples: ["Our journey took three days.", "Life is a journey, not a destination."] },
  { en: "brave", fa: "شجاع", examples: ["The firefighter was very brave.", "It was a brave decision to speak up."] },
  { en: "wisdom", fa: "خرد", examples: ["With age comes wisdom.", "Her wisdom helped the whole team."] },
  { en: "harvest", fa: "برداشت محصول", examples: ["Farmers celebrate the harvest every autumn.", "The harvest was rich this year."] }
];

// ---------- App state ----------
let currentIndex = 0;
let correctCount = 0;
let wrongCount = 0;
const answeredCards = new Set();

// ---------- DOM references ----------
const cardInner = document.getElementById("cardInner");
const testWordFront = document.getElementById("testWord");
const testWordBack = document.getElementById("testWordBack");
const testTranslation = document.getElementById("testTranslation");
const exampleList = document.getElementById("exampleList");
const flipBtn = document.getElementById("flipBtn");
const voiceBtn = document.querySelector(".voice-sign");
const repeatBtn = document.querySelector(".restart-quiz");
const [prevBtn, nextBtn] = document.querySelectorAll(".order-btn");
const cardCounter = document.querySelector(".card-counter p");
const correctCountEl = document.getElementById("correctCount");
const wrongCountEl = document.getElementById("wrongCount");
const correctBtn = document.getElementById("correctBtn");
const wrongBtn = document.getElementById("wrongBtn");
const progressFill = document.getElementById("progressFill");
const donutCorrect = document.getElementById("donutCorrect");
const donutWrong = document.getElementById("donutWrong");
const themeToggleBtn = document.querySelector(".day-night-toggle");

// ---------- Language / RTL-LTR switch ----------
const uiText = {
  en: {
    tagline: "Learn English",
    previous: "Previous",
    next: "Next",
    flip: "Flip Card",
    flipLabel: "Flip flashcard",
    progress: "Overall Progress",
    cardCounter: (current, total) => `Card ${current} of ${total}`
  },
  fa: {
    tagline: "آموزش انگلیسی",
    previous: "قبلی",
    next: "بعدی",
    flip: "مشاهده جواب",
    flipLabel: "مشاهده جواب کارت",
    progress: "پیشرفت کلی",
    cardCounter: (current, total) => `کارت ${toPersianDigits(current)} از ${toPersianDigits(total)}`
  }
};

let currentLang = "en";

const taglineEl = document.getElementById("taglineText");
const prevLabelEl = document.getElementById("prevLabel");
const nextLabelEl = document.getElementById("nextLabel");
const progressLabelEl = document.getElementById("progressLabel");
const languageSwitchBtn = document.querySelector(".language-switch");

function toPersianDigits(num) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num).replace(/[0-9]/g, (digit) => persianDigits[digit]);
}

function applyLanguage(lang) {
  currentLang = lang;
  const text = uiText[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";

  taglineEl.textContent = text.tagline;
  prevLabelEl.textContent = text.previous;
  nextLabelEl.textContent = text.next;
  flipBtn.textContent = text.flip;
  flipBtn.setAttribute("aria-label", text.flipLabel);
  progressLabelEl.textContent = text.progress;

  cardCounter.textContent = text.cardCounter(currentIndex + 1, vocabList.length);
}

languageSwitchBtn.addEventListener("click", () => {
  applyLanguage(currentLang === "en" ? "fa" : "en");
});

// ---------- Render current card ----------
function renderCard() {
  const word = vocabList[currentIndex];

  testWordFront.textContent = word.en;
  testWordBack.textContent = word.en;
  testTranslation.textContent = word.fa;

  exampleList.innerHTML = "";
  word.examples.forEach((sentence) => {
    const li = document.createElement("li");
    li.textContent = sentence;
    exampleList.appendChild(li);
  });

  cardCounter.textContent = uiText[currentLang].cardCounter(currentIndex + 1, vocablist.length);
  cardInner.classList.remove("is-flipped");

  const alreadyAnswered = answeredCards.has(currentIndex);
  correctBtn.disabled = alreadyAnswered;
  wrongBtn.disabled = alreadyAnswered;

  updateProgressBar();
}

// ---------- Progress bar ----------
function updateProgressBar() {
  const percent = (answeredCards.size / vocabList.length) * 100;
  progressFill.style.width = `${percent}%`;
}

// ---------- Result card text ----------
function updateResultCard() {
  correctCountEl.textContent = `Correct: ${correctCount}`;
  wrongCountEl.textContent = `Wrong: ${wrongCount}`;
  updateDonutChart();
}

// ---------- Donut chart ----------
function updateDonutChart() {
  const total = correctCount + wrongCount;
  const correctPercent = total ? (correctCount / total) * 100 : 0;
  const wrongPercent = total ? (wrongCount / total) * 100 : 0;

  donutCorrect.setAttribute("stroke-dasharray", `${correctPercent} 100`);
  donutCorrect.setAttribute("stroke-dashoffset", "25");

  donutWrong.setAttribute("stroke-dasharray", `${wrongPercent} 100`);
  donutWrong.setAttribute("stroke-dashoffset", `${25 - correctPercent}`);
}

// ---------- Navigation ----------
function goToCard(index) {
  currentIndex = (index + vocabList.length) % vocabList.length;
  renderCard();
}

prevBtn.addEventListener("click", () => goToCard(currentIndex - 1));
nextBtn.addEventListener("click", () => goToCard(currentIndex + 1));

// ---------- Card flip ----------
flipBtn.addEventListener("click", () => {
  cardInner.classList.toggle("is-flipped");
});

// ---------- Answer tracking ----------
function recordAnswer(isCorrect) {
  if (answeredCards.has(currentIndex)) return;
  answeredCards.add(currentIndex);

  if (isCorrect) {
    correctCount++;
  } else {
    wrongCount++;
  }

  correctBtn.disabled = true;
  wrongBtn.disabled = true;
  updateResultCard();
  updateProgressBar();
  checkLessonCompletion();
}

correctBtn.addEventListener("click", () => recordAnswer(true));
wrongBtn.addEventListener("click", () => recordAnswer(false));

// ---------- Pronunciation ----------
function speak(text, lang) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);
}

voiceBtn.addEventListener("click", () => speak(vocabList[currentIndex].en, "en-US"));

// ---------- Reset quiz ----------
function resetQuiz() {
  currentIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  answeredCards.clear();

  renderCard();
  updateResultCard();
}

repeatBtn.addEventListener("click", resetQuiz);

// ---------- Dark mode ----------
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("vocabBridgeTheme", theme);
}

themeToggleBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

const savedTheme = localStorage.getItem("vocabBridgeTheme");
if (savedTheme) applyTheme(savedTheme);

// ---------- Initial render ----------
renderCard();
updateResultCard();

// Automatically set the footer copyright year
const footerYear = document.getElementById("footer-year");
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

// ---------- Celebration animation ----------
const celebrationEmojis = ["🎆", "🎇", "🎊", "🎉", "🪅", "🎋", "💐", "🌸"];

// 8 directions, 45 degrees apart, starting from straight down
const celebrationDirections = [
  { dx: 0, dy: 150 },     // down
  { dx: 106, dy: 106 },   // down-right
  { dx: 150, dy: 0 },     // right
  { dx: 106, dy: -106 },  // up-right
  { dx: 0, dy: -150 },    // up
  { dx: -106, dy: -106 }, // up-left
  { dx: -150, dy: 0 },    // left
  { dx: -106, dy: 106 }   // down-left
];

function playCelebration() {
  const container = document.getElementById("celebration");
  container.innerHTML = "";

  celebrationEmojis.forEach((emoji, i) => {
    const span = document.createElement("span");
    span.className = "celebration-emoji";
    span.textContent = emoji;
    span.style.setProperty("--dx", `${celebrationDirections[i].dx}px`);
    span.style.setProperty("--dy", `${celebrationDirections[i].dy}px`);
    container.appendChild(span);
  });

  setTimeout(() => {
    container.innerHTML = "";
  }, 1500);
}

function checkLessonCompletion() {
  const isFinished = answeredCards.size === vocabList.length;
  if (!isFinished) return;

  const scorePercent = (correctCount / vocabList.length) * 100;
  if (scorePercent > 50) {
    playCelebration();
  }
}
