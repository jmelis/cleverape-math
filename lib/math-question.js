function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const choose = (array) => array[Math.floor(Math.random() * array.length)];

export function shuffleArray(_array) {
  const array = _array.slice();
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function mathQuestion() {
  let a = getRandomInt(1, 10);
  let b = getRandomInt(1, 10);

  const ops = ['+', '-'];
  const op = choose(ops);

  let question;
  let result;

  if (op === '+') {
    question = `${a}+${b}`;
    result = a + b;
  } else {
    if (a < b) {
      [a, b] = [b, a]
    }
    question = `${a}-${b}`;
    result = a - b;
  }

  const spread = 7;
  const otherChoices = shuffleArray(Array.apply(null, Array(2 * spread + 1))
    .map(function (_, i) {return result + i - spread;})
    .filter(e => e > 0 && e != result)).slice(0, 3);

  return { question, result, otherChoices };
}

export default mathQuestion;