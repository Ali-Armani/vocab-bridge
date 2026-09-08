// ---------- Vocabulary data ----------
const vocabLevels = {
  A1: [
    {
      id: "a1-set-1",
      name: { en: "Set 1: Family & People", fa: "مجموعه ۱: خانواده و افراد" },
      words: [
        { id: "a1-s1-w1", en: "mother", fa: "مادر", examples: ["My mother cooks every day.", "I love my mother very much."] },
        { id: "a1-s1-w2", en: "father", fa: "پدر", examples: ["My father works in a bank.", "His father is a doctor."] },
        { id: "a1-s1-w3", en: "sister", fa: "خواهر", examples: ["I have one sister.", "Her sister lives in Tehran."] },
        { id: "a1-s1-w4", en: "brother", fa: "برادر", examples: ["My brother is younger than me.", "He plays with his brother."] },
        { id: "a1-s1-w5", en: "friend", fa: "دوست", examples: ["You are my best friend.", "She made a new friend at school."] },
        { id: "a1-s1-w6", en: "teacher", fa: "معلم", examples: ["Our teacher is very kind.", "The teacher explained the lesson."] },
        { id: "a1-s1-w7", en: "child", fa: "کودک", examples: ["The child is playing outside.", "Every child needs love."] },
        { id: "a1-s1-w8", en: "name", fa: "اسم", examples: ["What is your name?", "My name is Ali."] },
        { id: "a1-s1-w9", en: "house", fa: "خانه", examples: ["We live in a small house.", "Her house is near the park."] },
        { id: "a1-s1-w10", en: "family", fa: "خانواده", examples: ["I love my family.", "Our family is very close."] }
      ]
    },
    {
      id: "a1-set-2",
      name: { en: "Set 2: Food & Drink", fa: "مجموعه ۲: غذا و نوشیدنی" },
      words: [
        { id: "a1-s2-w1", en: "water", fa: "آب", examples: ["I drink water every morning.", "Can I have a glass of water?"] },
        { id: "a1-s2-w2", en: "bread", fa: "نان", examples: ["We eat bread with breakfast.", "She bought fresh bread."] },
        { id: "a1-s2-w3", en: "milk", fa: "شیر", examples: ["I like milk in my tea.", "The baby drinks milk."] },
        { id: "a1-s2-w4", en: "apple", fa: "سیب", examples: ["An apple a day is healthy.", "He is eating a red apple."] },
        { id: "a1-s2-w5", en: "coffee", fa: "قهوه", examples: ["I drink coffee in the morning.", "This coffee is very hot."] },
        { id: "a1-s2-w6", en: "tea", fa: "چای", examples: ["Would you like some tea?", "She makes tea every afternoon."] },
        { id: "a1-s2-w7", en: "rice", fa: "برنج", examples: ["We eat rice for dinner.", "Rice is popular in many countries."] },
        { id: "a1-s2-w8", en: "egg", fa: "تخم‌مرغ", examples: ["I had an egg for breakfast.", "Can you boil an egg for me?"] },
        { id: "a1-s2-w9", en: "fish", fa: "ماهی", examples: ["We had fish for lunch.", "He likes to eat fish."] },
        { id: "a1-s2-w10", en: "chicken", fa: "مرغ", examples: ["She is cooking chicken tonight.", "Chicken is my favorite food."] }
      ]
    }
    // Sets 3–30 go here with the same structure.
  ]
};

// Flat lookup: word id -> word object (used by the mistakes review deck)
const wordLookup = {};
Object.values(vocabLevels).flat().forEach((set) => {
  set.words.forEach((word) => { wordLookup[word.id] = word; });
});

// ---------- App state ----------
let currentWords = [];
let currentIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let currentLang = "en";
let isReviewMode = false;
let currentOpenLevel = null;
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
const backToSetsBtn = document.getElementById("backToSets");

const levelSelectScreen = document.getElementById("levelSelect");
const setSelectScreen = document.getElementById("setSelect");
const quizScreen = document.getElementById("main-content");
const levelGrid = document.getElementById("levelGrid");
const setGrid = document.getElementById("setGrid");
const setSelectTitle = document.getElementById("setSelectTitle");

// ---------- Language / RTL-LTR switch ----------
const uiText = {
  en: {
    tagline: "Learn English",
    previous: "Previous",
    next: "Next",
    flip: "Flip Card",
    flipLabel: "Flip flashcard",
    progress: "Overall Progress",
    cardCounter: (current, total) => `Card ${current} of ${total}`,
    chooseLevel: "Choose a Level",
    backToLevels: "← Levels",
    reviewMistakes: "🔁 Review Mistakes",
    setsTitle: (level) => `${level} Sets`,
    backToSets: "← Sets",
    knewIt: "I knew it ✓",
    didntKnow: "I didn't know ✗"
  },
  fa: {
    tagline: "آموزش انگلیسی",
    previous: "قبلی",
    next: "بعدی",
    flip: "مشاهده جواب",
    flipLabel: "مشاهده جواب کارت",
    progress: "پیشرفت کلی",
    cardCounter: (current, total) => `کارت ${toPersianDigits(current)} از ${toPersianDigits(total)}`,
    chooseLevel: "انتخاب سطح",
    backToLevels: "← سطح‌ها",
    reviewMistakes: "🔁 مرور اشتباهات",
    setsTitle: (level) => `مجموعه‌های ${level}`,
    backToSets: "← مجموعه‌ها",
    knewIt: "بلد بودم ✓",
    didntKnow: "بلد نبودم ✗"
  }
};

const taglineEl = document.getElementById("taglineText");
const prevLabelEl = document.getElementById("prevLabel");
const nextLabelEl = document.getElementById("nextLabel");
const progressLabelEl = document.getElementById("progressLabel");
const languageSwitchBtn = document.querySelector(".language-switch");
const chooseLevelTitleEl = document.getElementById("chooseLevelTitle");
const backToLevelsLabelEl = document.getElementById("backToLevelsLabel");
const reviewMistakesLabelEl = document.getElementById("reviewMistakesLabel");
const backToSetsLabelEl = document.getElementById("backToSetsLabel");
const knewItLabelEl = document.getElementById("knewItLabel");
const didntKnowLabelEl = document.getElementById("didntKnowLabel");

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
  chooseLevelTitleEl.textContent = text.chooseLevel;
  backToLevelsLabelEl.textContent = text.backToLevels;
  reviewMistakesLabelEl.textContent = text.reviewMistakes;
  backToSetsLabelEl.textContent = text.backToSets;
  knewItLabelEl.textContent = text.knewIt;
  didntKnowLabelEl.textContent = text.didntKnow;

  cardCounter.textContent = text.cardCounter(currentIndex + 1, currentWords.length || 1);

  if (currentOpenLevel) {
    setSelectTitle.textContent = text.setsTitle(currentOpenLevel);
  }
  refreshSetGridLabels();
}

languageSwitchBtn.addEventListener("click", () => {
  applyLanguage(currentLang === "en" ? "fa" : "en");
});

// ---------- Screen navigation ----------
function showScreen(screen) {
  [levelSelectScreen, setSelectScreen, quizScreen].forEach((el) => {
    el.hidden = el !== screen;
  });

  backToSetsBtn.hidden = screen !== quizScreen;
}

function renderLevelGrid() {
  levelGrid.innerHTML = "";
  Object.keys(vocabLevels).forEach((level) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = level;
    btn.addEventListener("click", () => openLevel(level));
    levelGrid.appendChild(btn);
  });
}

function openLevel(level) {
  currentOpenLevel = level;
  setSelectTitle.textContent = uiText[currentLang].setsTitle(level);
  refreshSetGridLabels();
  showScreen(setSelectScreen);
}

function refreshSetGridLabels() {
  if (!currentOpenLevel) return;
  setGrid.innerHTML = "";

  vocabLevels[currentOpenLevel].forEach((set) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = set.name[currentLang];
    btn.addEventListener("click", () => startSet(set.words));
    setGrid.appendChild(btn);
  });
}

function startSet(words) {
  // isReviewMode = false;
  currentWords = words;
  currentIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  answeredCards.clear();

  showScreen(quizScreen);
  renderCard();
  updateResultCard();
}

document.getElementById("backToLevels").addEventListener("click", () => showScreen(levelSelectScreen));
backToSetsBtn.addEventListener("click", () => showScreen(setSelectScreen));

// ---------- Wrong-answer storage ----------
function getWrongWordIds() {
  const stored = localStorage.getItem("vocabBridgeWrongWords");
  return stored ? JSON.parse(stored) : [];
}

function saveWrongWordIds(ids) {
  localStorage.setItem("vocabBridgeWrongWords", JSON.stringify(ids));
}

function addWrongWord(wordId) {
  const ids = getWrongWordIds();
  if (!ids.includes(wordId)) {
    ids.push(wordId);
    saveWrongWordIds(ids);
  }
}

function removeWrongWord(wordId) {
  saveWrongWordIds(getWrongWordIds().filter((id) => id !== wordId));
}

document.getElementById("reviewMistakesBtn").addEventListener("click", () => {
  const wrongIds = getWrongWordIds();
  if (wrongIds.length === 0) {
    alert("No mistakes saved yet.");
    return;
  }
  const reviewWords = wrongIds.map((id) => wordLookup[id]).filter(Boolean);
  isReviewMode = true;
  startSet(reviewWords);
});

// ---------- Render current card ----------
function renderCard() {
  const word = currentWords[currentIndex];
  if (!word) return;

  testWordFront.textContent = word.en;
  testWordBack.textContent = word.en;
  testTranslation.textContent = word.fa;

  exampleList.innerHTML = "";
  word.examples.forEach((sentence) => {
    const li = document.createElement("li");
    li.textContent = sentence;
    exampleList.appendChild(li);
  });

  cardCounter.textContent = uiText[currentLang].cardCounter(currentIndex + 1, currentWords.length);
  cardInner.classList.remove("is-flipped");

  const alreadyAnswered = answeredCards.has(currentIndex);
  correctBtn.disabled = alreadyAnswered;
  wrongBtn.disabled = alreadyAnswered;

  updateProgressBar();
}

// ---------- Progress bar ----------
function updateProgressBar() {
  const percent = (answeredCards.size / currentWords.length) * 100;
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
  currentIndex = (index + currentWords.length) % currentWords.length;
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

  const wordId = currentWords[currentIndex].id;
  if (isCorrect) {
    correctCount++;
    removeWrongWord(wordId);
  } else {
    wrongCount++;
    addWrongWord(wordId);
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

voiceBtn.addEventListener("click", () => speak(currentWords[currentIndex].en, "en-US"));

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
  const isFinished = answeredCards.size === currentWords.length;
  if (!isFinished) return;

  const scorePercent = (correctCount / currentWords.length) * 100;
  if (scorePercent > 50) {
    playCelebration();
  }
}

// ---------- Footer copyright year ----------
const footerYear = document.getElementById("footer-year");
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

// ---------- Initial screen ----------
renderLevelGrid();
showScreen(levelSelectScreen);
