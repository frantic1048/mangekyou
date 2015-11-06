// a general Node prototype
function NodeBase(callback, options) {
  // input is a NodeId:Node Map
  this.input = new Map();

  // data is a node-type related map
  this.data = {};

  // description of transform params
  this.parameter = {};

  // output is a function return a output-type:processed data object
  this.output = null;

  callback.call(this, options);
}

export default NodeBase;
