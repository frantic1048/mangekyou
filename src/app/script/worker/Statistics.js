import {getAllPositions, range} from './util';

function Statistics({width, height, data}) {
  const allPos = getAllPositions(width, height);
  const pixelCount = width * height;
  const lCount = new Array(256).fill(0); // count of luma levels
  const rCount = new Array(256).fill(0); // count of red levels
  const gCount = new Array(256).fill(0); // count of green levels
  const bCount = new Array(256).fill(0); // count of blue levels
  for (const [,, index] of allPos()) {
    const [r, g, b] = [data[index], data[index + 1], data[index + 2]];
    ++rCount[r];
    ++gCount[g];
    ++bCount[b];
  }

  for (const i of range(0, 256)) {
    lCount[i] = Math.min(rCount[i], Math.min(gCount[i], bCount[i]));
  }

  const lFreq = lCount.map(v => v / pixelCount);
  const rFreq = rCount.map(v => v / pixelCount);
  const gFreq = gCount.map(v => v / pixelCount);
  const bFreq = bCount.map(v => v / pixelCount);

  return [
    {
      proceed: true,
      width,
      height,
      pixelCount,
      frequency: {
        luma: lFreq,
        red: rFreq,
        green: gFreq,
        blue: bFreq,
      },
    },
  ];
}

export default Statistics;
