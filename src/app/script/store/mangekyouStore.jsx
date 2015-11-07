import { EventEmitter } from 'events';

import mangekyouConstant from './../constant/mangekyouConstant';
import mangekyouDispatcher from './../dispatcher/mangekyouDispatcher';
import {transformNodeTypes} from './../node/TransformNode';

const CHANGE_EVENT = {
  FILE_NODE: 'FILE_NODE',
  TRANSFORM_NODE: 'TRANSFORM_NODE',
  VIEW_NODE: 'VIEW_NODE',
};

const _store = {
  fileNodes: new Map(),
  viewNodes: new Map(),
  transformNodes: new Map(),
  transformNodeTypes: transformNodeTypes,
};

function addFileNode(fileNode) {
  _store.fileNodes.set(fileNode.data.key, fileNode);
}

function removeFileNode(key) {
  _store.fileNodes.delete(key);
}

function clearFileNode() {
  _store.fileNodes.clear();
}

let transformNodeId = 1;
function getTransformNodeId() {
  return transformNodeId++;
}

function addTransformNode(transformNode) {
  _store.fileNodes.set(getTransformNodeId(), transformNode);
}

function removeTransformNode(key) {
  _store.transformNodes.delete(key);
}

function clearTransformNode() {
  _store.transformNodes.clear();
}

const mangekyouStore = Object.assign({}, EventEmitter.prototype, {
  addFileNodeChangeListener(cb) {
    this.on(CHANGE_EVENT.FILE_NODE, cb);
  },
  removeFileNodeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT.FILE_NODE, cb);
  },
  getFileNodes() {
    return _store.fileNodes;
  },
  addTransformNodeChangeListener(cb) {
    this.on(CHANGE_EVENT.TRANSFORM_NODE, cb);
  },
  removeTransformNodeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT.TRANSFORM_NODE, cb);
  },
  getTransformNodeTypes() {
    return _store.transformNodeTypes;
  },
  getTransformNodes() {
    return _store.transformNodes;
  },
});

mangekyouDispatcher.register(payload => {
  const action = payload.action;
  const data = action.data;
  switch (action.actionType) {
  case mangekyouConstant.ADD_FILE_NODE:
    addFileNode(data);
    mangekyouStore.emit(CHANGE_EVENT.FILE_NODE);
    break;
  case mangekyouConstant.REMOVE_FILE_NODE:
    removeFileNode(data);
    mangekyouStore.emit(CHANGE_EVENT.FILE_NODE);
    break;
  case mangekyouConstant.CLEAR_FILE_NODE:
    clearFileNode();
    mangekyouStore.emit(CHANGE_EVENT.FILE_NODE);
    break;
  case mangekyouConstant.ADD_TRANSFORM_NODE:
    addTransformNode(data);
    mangekyouStore.emit(CHANGE_EVENT.TRANSFORM_NODE);
    break;
  case mangekyouConstant.REMOVE_TRANSFORM_NODE:
    removeTransformNode(data);
    mangekyouStore.emit(CHANGE_EVENT.TRANSFORM_NODE);
    break;
  case mangekyouConstant.CLEAR_TRANSFORM_NODE:
    clearTransformNode();
    mangekyouStore.emit(CHANGE_EVENT.TRANSFORM_NODE);
    break;
  default:
    return true;
  }
});

export default mangekyouStore;
