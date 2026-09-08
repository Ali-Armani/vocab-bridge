<div align="center">



![Header](https://capsule-render.vercel.app/api?type=waving&color=6366F1&height=200&section=header&text=VocabBridge&fontSize=50&fontColor=ffffff&animation=fadeIn)





![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&pause=1000&color=6366F1&center=true&vCenter=true&width=600&lines=Persian+%E2%86%94+English+Vocabulary+Flashcards;Built+with+Vanilla+HTML%2C+CSS%2C+JS;Accessible+%7C+Bilingual+%7C+Lightweight)





![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)




![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)




![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)




![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-222?style=for-the-badge&logo=github)




![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)



🔗 **[Live Site](https://ali-armani.github.io/vocab-bridge/)**

</div>

---

## 📖 About

**VocabBridge** is a Persian–English vocabulary flashcard app built to help learners practice words through flippable cards, native browser pronunciation, and instant progress feedback.

It's also a personal portfolio project combining two backgrounds: **English Language Teaching** and **self-taught web development** — built to solve the exact vocabulary-drilling problem seen in real classrooms.

---

## ✨ Features

- 🔄 **Flip-card animation** — question on the front, translation + example sentences on the back
- 🔊 **Native pronunciation** — powered by the Web Speech API, no external service required
- ✅❌ **Answer tracking** — mark each card as known/unknown, with a live correct/wrong tally
- 📊 **Progress visualization** — a top progress bar plus a correct/wrong donut chart
- 🌗 **Dark / light mode** — persisted across sessions with `localStorage`
- ♿ **Accessibility-first** — ARIA live regions, keyboard navigation, visible focus states, and proper `lang`/`dir` handling for bilingual text
- 🎉 **Celebration animation** — a rewarding emoji burst when you finish a lesson with over 50% correct
- 🔁 **One-click reset** — restart the whole quiz from the first card

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | Semantic HTML5 |
| Styling | CSS3 (Flexbox, Grid, custom properties, keyframe animations) |
| Logic | Vanilla JavaScript (ES6+) |
| Voice | Web Speech API (`SpeechSynthesis`) |
| Hosting | GitHub Pages |

No frameworks, no build step — just clean, dependency-free front-end code.

---

## 📂 Project Sttructure

vocab-bridge/
├── index.html
├── assets/
│   ├── style.css
│   ├── script.js
│   └── images/
└── README.md

---

## 🚀 Getting Started

```bash
git clone https://github.com/Ali-Armani/vocab-bridge.git
cd vocab-bridge
```
Then just open index.html in your browser — no build tools or dependencies needed.
Or try it live, no setup required:
👉 https://ali-armani.github.io/vocab-bridge/
♿ Accessibility Notes
This project was built with WCAG guidance in mind:
All interactive icons have descriptive aria-labels
Score and progress updates are announced via aria-live="polite"
Persian text is wrapped with lang="fa" / dir="rtl" for correct screen-reader pronunciation and layout
Focus states are always visible for keyboard navigation
Animations respect prefers-reduced-motion
🗺️ Roadmap
[ ] Full RTL/LTR interface language switch
[ ] Larger, categorized word bank
[ ] Dictionary API integration for auto-generated definitions and audio

## 📬 Contact

<div align="center">

<a href="https://github.com/Ali-Armani" target="_blank">
  <img src="https://cdn.simpleicons.org/github/181717" width="40" height="40" alt="GitHub" />
</a>
&nbsp;&nbsp;
<a href="https://linkedin.com/in/aliarmani" target="_blank">
  <img src="https://cdn.simpleicons.org/linkedin/0A66C2" width="40" height="40" alt="LinkedIn" />
</a>
&nbsp;&nbsp;
<a href="https://t.me/ali_armani_dev" target="_blank">
  <img src="https://cdn.simpleicons.org/telegram/26A5E4" width="40" height="40" alt="Telegram" />
</a>
&nbsp;&nbsp;
<a href="mailto:armani.ali@proton.me">
  <img src="https://cdn.simpleicons.org/gmail/EA4335" width="40" height="40" alt="Email" />
</a>

</div>
