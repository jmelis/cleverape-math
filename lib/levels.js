import mathQuestion from './math';

const levelsData = require('./levels.json');
const defaults = levelsData.defaults;
const levels = levelsData.levels;

const choose = (array) => array[Math.floor(Math.random() * array.length)];

export function generateMathQuestion(levelId) {
  const level = levels.filter(l => l.id === levelId)[0];
  const q = choose(level.questions);
  return mathQuestion(Object.assign(defaults, q));
}

export default levels;