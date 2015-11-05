import QuantizationNode from './QuantizationNode';
import SampleRateNode from './SampleRateNode';

const nodes = {
  Quantization: QuantizationNode,
  SampleRate: SampleRateNode,
};

function TransformNode(typeName, options) {
  return new nodes[typeName](options);
}

export const transformNodeTypes = Object.keys(nodes);
export default TransformNode;
