function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mathQuestion() {
  const a = getRandomInt(1, 10);
  const b = getRandomInt(1, 10);
  const question = `${a}+${b}`;
  const result = a + b;
  const otherChoices = [result - 10, result + 10, result + 20];
  return { question, result, otherChoices };
}

export default mathQuestion;