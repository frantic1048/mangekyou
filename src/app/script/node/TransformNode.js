import QuantizationNode from './QuantizationNode';
import SampleRateNode from './SampleRateNode';

const nodes = {
  [QuantizationNode.name]: QuantizationNode,
  [SampleRateNode.name]: SampleRateNode,
};

export const transformNodeTypes = {
  [QuantizationNode.name]: '量化',
  [SampleRateNode.name]: '采样率',
};

function TransformNode(typeName, options) {
  return new nodes[typeName](options);
}

export default TransformNode;
