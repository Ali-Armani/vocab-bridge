/* ==================================================================================
                               UI translation strings
 ================================================================================== */

function toPersianDigits(num) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num).replace(/[0-9]/g, (digit) => persianDigits[digit]);
}

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
    didntKnow: "I didn't know ✗",
    correctCount: (count) => `Learned: ${count}`,
    wrongCount: (count) => `Learning: ${count}`
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
    didntKnow: "بلد نبودم ✗",
    correctCount: (count) => `یادگرفته: ${toPersianDigits(count)}`,
    wrongCount: (count) => `یادگرفتنی: ${toPersianDigits(count)}`
  }
}
