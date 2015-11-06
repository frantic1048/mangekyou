import NodeBase from './NodeBase';

function sampleRate(image, {rate}) {
  // TODO: sample rate processing
  return image;
}

function sampleRateNodeInit({inputNode}) {
  this.input.set('image', inputNode);
  this.parameter = {
    rate: {
      displayName: '采样率',
      value: 256,
      type: 'range',
      min: 1,
      max: 256,
      step: 1,
    },
  };
  this.output = () => {
    const source = this.input.get('image').output();
    return sampleRate(source, param);
  };
}

function SampleRateNode(options) {
  return new NodeBase(sampleRateNodeInit, options);
}

export default SampleRateNode;
