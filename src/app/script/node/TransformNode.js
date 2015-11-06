import QuantizationNode from './QuantizationNode';
import SampleRateNode from './SampleRateNode';

const nodes = {
  Quantization: QuantizationNode,
  SampleRate: SampleRateNode,
};

export const transformNodeTypes = {
  Quantization: '量化',
  SampleRate: '采样率',
};

function TransformNode(typeName, options) {
  return new nodes[typeName](options);
}

export default TransformNode;
