const SPREAD = 7; // for generateChoices

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateChoices(result, spread) {
  return  shuffleArray([result].concat(Array.apply(null, Array(2 * spread + 1))
    .map(function (_, i) { return result + i - spread; })
    .filter(e => e > 0 && e != result).slice(0, 3)));
}

function shuffleArray(_array) {
  const array = _array.slice();
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function qAdd(opts) {
  const aMin = opts.aMin || 1;
  const aMax = opts.aMax || 10;
  const bMin = opts.bMin || 1;
  const bMax = opts.bMax || 10;

  const a = getRandomInt(aMin, aMax);
  const b = getRandomInt(bMin, bMax);

  const question = `${a}+${b}`;
  const result = a + b;
  const choices = generateChoices(result, SPREAD)

  return { question, result, choices };
}

function qSubtract(opts) {
  const aMin = opts.aMin || 1;
  const aMax = opts.aMax || 10;
  const bMin = opts.bMin || 1;
  const bMax = opts.bMax || 10;

  let a = getRandomInt(aMin, aMax);
  let b = getRandomInt(bMin, bMax);

  if (opts.positiveResult && a < b) {
    [a, b] = [b, a];
  }

  const question = `${a}-${b}`;
  const result = a - b;
  const choices = generateChoices(result, SPREAD)

  return { question, result, choices };
}

export default function mathQuestion(opts) {
  if (opts.op === '+') {
    return qAdd(opts);
  } else if (opts.op === '-') {
    return qSubtract(opts);
  } else {
    throw `Unknown op: ${opts.op}`;
  }
};
