import NodeBase from './NodeBase';

function sampleRate(image, {rate}) {
  // TODO: sample rate processing
  return image || null;
}

function sampleRateNodeInit({inputNode = null } = {inputNode: null}) {
  if (inputNode) {
    this.input.set('image', inputNode);
  }
  // rate
  // Infinity : full resolution
  // 1~x : sample 1~x pixel on width
  // 0 : sample only 1 pixel
  this.parameter = {
    rate: Infinity,
  };
  this.output = () => {
    let source = null;
    if (this.input.get('image')) {
      source = this.input.get('image').output();
    }
    return sampleRate(source, this.parameter);
  };
}

function SampleRateNode(options) {
  return new NodeBase(sampleRateNodeInit, options);
}

export default SampleRateNode;
