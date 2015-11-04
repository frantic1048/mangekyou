// a general Node prototype
function Node(callback, options) {
  // input is a NodeId:Node Map
  this.input = new Map();

  // data is a node-type related map
  this.data = {};

  // output is a function return a output-type:processed data object
  this.output = null;

  callback.call(this, options);
}

export default Node;
