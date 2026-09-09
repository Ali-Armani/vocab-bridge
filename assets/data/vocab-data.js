// ---------- Combine all level files into one lookup ----------
const vocabLevels = {
  A1: vocabLevelA1,
  A2: vocabLevelA2
  // B1: vocabLevelB1,
  // B2: vocabLevelB2,
  // C1: vocabLevelC1,
  // C2: vocabLevelC2
};

const wordLookup = {};
Object.values(vocabLevels).flat().forEach((set) => {
  set.words.forEach((word) => { wordLookup[word.id] = word; });
});
