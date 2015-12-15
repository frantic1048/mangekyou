import {getAllPositions, range, lumaLinear, minOf} from './util';

function levelMedian(levelCountArray, itemCount) {
  return levelCountArray.reduce((pre, cur, idx) => {
    const result = Object.assign({}, pre);
    if (!pre.ok) {
      result.sum = pre.sum + cur;
      result.ok = result.sum > 0.5 * itemCount;
      if (result.ok) {
        result.mid = idx;
      }
    }
    return result;
  }, {ok: false, sum: 0, mid: 0}).mid;
}

function levelAverange(levelCountArray, itemCount) {
  return levelCountArray.reduce((pre, cur, idx) => pre + idx * cur, 0) / itemCount;
}

// https://en.wikipedia.org/wiki/Standard_deviation#Uncorrected_sample_standard_deviation
function levelStandardDeviation(levelCountArray, averangeValue, itemCount) {
  return Math.sqrt(levelCountArray.reduce((pre, cur, idx) => {
    return pre + Math.pow(cur - averangeValue, 2) * idx;
  }, 0) / itemCount);
}

function Statistics({width, height, data}) {
  const allPos = getAllPositions(width, height);
  const pixelCount = width * height;
  const lbCount = new Array(256).fill(0); // lowerbound count of least color levels
  const rCount = new Array(256).fill(0);  // count of red levels
  const gCount = new Array(256).fill(0);  // count of green levels
  const bCount = new Array(256).fill(0);  // count of blue levels
  const lCount = new Array(256).fill(0);  // count of Rec. 709 luma levels

  for (const [,, index] of allPos()) {
    const [r, g, b] = [data[index], data[index + 1], data[index + 2]];
    ++rCount[r];
    ++gCount[g];
    ++bCount[b];
    ++lCount[Math.round(lumaLinear(r, g, b))];
  }

  for (const i of range(0, 256)) {
    lbCount[i] = minOf(rCount[i], gCount[i], bCount[i]);
  }

  // color levels frequency
  const frequency = {
    red: rCount.map(v => v / pixelCount),         // frequency of red levels
    green: gCount.map(v => v / pixelCount),       // frequency of green levels
    blue: bCount.map(v => v / pixelCount),        // frequency of blue levels
    lowerbound: lbCount.map(v => v / pixelCount), // lowerbound frequency of rgb levels
  };

  // averange levels
  const averange = {
    red: levelAverange(rCount, pixelCount),
    green: levelAverange(gCount, pixelCount),
    blue: levelAverange(bCount, pixelCount),
    luma: levelAverange(lCount, pixelCount),
  };

  // median levels
  const median = {
    red: levelMedian(rCount, pixelCount),
    green: levelMedian(gCount, pixelCount),
    blue: levelMedian(bCount, pixelCount),
    luma: levelMedian(lCount, pixelCount),
  };

  // standard deviation
  const standardDeviation = {
    red: levelStandardDeviation(rCount, averange.red, pixelCount),
    green: levelStandardDeviation(rCount, averange.green, pixelCount),
    blue: levelStandardDeviation(rCount, averange.blue, pixelCount),
    luma: levelStandardDeviation(lCount, averange.luma, pixelCount),
  };

  return [
    {
      proceed: true,
      width,
      height,
      pixelCount,
      averange,
      median,
      standardDeviation,
      frequency,
    },
  ];
}

export default Statistics;
