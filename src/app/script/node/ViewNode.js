import NodeBase from './NodeBase';

function ViewNodeInit(options) {}

function ViewNode(options) {
  return new NodeBase(ViewNodeInit, options);
}

export default ViewNode;
