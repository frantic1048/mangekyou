import {getAllPositions, lumaLinear} from './util';


function Statistics({width, height, data}) {
  const allPos = getAllPositions(width, height);
  const pixelCount = width * height;
  let lFreq = new Array(256).fill(0); // frequency of luma
  let rFreq = new Array(256).fill(0); // frequency of red
  let gFreq = new Array(256).fill(0); // frequency of green
  let bFreq = new Array(256).fill(0); // frequency of blue
  for (const [,, index] of allPos()) {
    const [r, g, b] = [data[index], data[index + 1], data[index + 2]];
    ++lFreq[Math.round(lumaLinear(r, g, b))];
    ++rFreq[r];
    ++gFreq[g];
    ++bFreq[b];
  }

  lFreq = lFreq.map(v => v / pixelCount);
  rFreq = rFreq.map(v => v / pixelCount);
  gFreq = gFreq.map(v => v / pixelCount);
  bFreq = bFreq.map(v => v / pixelCount);

  return [
    {
      proceed: true,
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
