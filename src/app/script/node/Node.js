import QuantizationNode from './QuantizationNode';
import SampleRateNode from './SampleRateNode';

const nodes = {
  Quantization: QuantizationNode,
  SampleRate: SampleRateNode,
};

function Node(typeName, options) {
  return new nodes[typeName](options);
}

export const nodeTypes = Object.keys(nodes);
export default Node;
