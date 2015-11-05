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
  getTransformNodeTypes() {
    return _store.transformNodeTypes;
  },
});

mangekyouDispatcher.register(payload => {
  const action = payload.action;
  switch (action.actionType) {
  case mangekyouConstant.ADD_FILE_NODE:
    addFileNode(action.data);
    mangekyouStore.emit(CHANGE_EVENT.FILE_NODE);
    break;
  case mangekyouConstant.REMOVE_FILE_NODE:
    removeFileNode(action.data);
    mangekyouStore.emit(CHANGE_EVENT.FILE_NODE);
    break;
  case mangekyouConstant.CLEAR_FILE_NODE:
    clearFileNode();
    mangekyouStore.emit(CHANGE_EVENT.FILE_NODE);
    break;
  default:
    return true;
  }
});

export default mangekyouStore;
