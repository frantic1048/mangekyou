import NodeBase from './NodeBase';

function quantization(image, {level}) {
  // TODO: sample rate processing
  return image || null;
}

function QuantizationNodeInit({inputNode = null } = {inputNode: null}) {
  this.name = 'Quantization';

  if (inputNode) {
    this.input.set('image', inputNode);
  }
  // level: V (of HSV) level
  // Infinity : full level
  // 2~x : 2~x level
  // 1 : no level ( full black)
  this.parameter = {
    level: Infinity,
  };
  this.output = () => {
    let source = null;
    if (this.input.get('image')) {
      source = this.input.get('image').output();
    }
    return quantization(source, this.parameter);
  };
}

function QuantizationNode(options) {
  return new NodeBase(QuantizationNodeInit, options);
}

export default QuantizationNode;
