import NodeBase from './NodeBase';

function sampleRate(image, rate) {
  // TODO: sample rate processing
  return 0;
}

function sampleRateNodeInit({inputNode}) {
  this.input.set('image', inputNode.output);
  this.output = () => {
    return sampleRate(this.input.get('image')());
  };
}

function SampleRateNode(options) {
  return new NodeBase(sampleRateNodeInit, options);
}

export default SampleRateNode;
