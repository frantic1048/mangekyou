import {getAllPositions, lumaLinear} from './util';

function freqCompute(pixelCount, value) {
  return value / pixelCount;
}

function Histogram({width, height, data}) {
  const allPos = getAllPositions(width, height);
  const pixelCount = width * height;
  const freqMapper = freqCompute.bind(this, pixelCount);
  let lFreq = new Array(256).fill(0); // frequency of luma
  let rFreq = new Array(256).fill(0); // frequency of red
  let gFreq = new Array(256).fill(0); // frequency of green
  let bFreq = new Array(256).fill(0); // frequency of blue
  for (const [,, index] of allPos()) {
    const [r, g, b] = [data[index], data[index + 1], data[index + 2]];
    ++lFreq[lumaLinear(r, g, b)];
    ++rFreq[r];
    ++gFreq[g];
    ++bFreq[b];
  }

  lFreq = lFreq.map(freqMapper);
  rFreq = rFreq.map(freqMapper);
  gFreq = gFreq.map(freqMapper);
  bFreq = bFreq.map(freqMapper);

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

export default Histogram;
