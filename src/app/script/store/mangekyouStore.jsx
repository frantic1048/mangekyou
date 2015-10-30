import { EventEmitter } from 'events';

import mangekyouConstant from './../constant/mangekyouConstant';
import mangekyouDispatcher from './../dispatcher/mangekyouDispatcher';

const CHANGE_EVENT = 'change';

const _store = {
  fileNodeList: [],
  TransformNodeList: [],
};

function addFileNode(newFile) {
  _store.fileNodeList.push(newFile);
}

function removeFileNode(index) {
  _store.fileNodeList.splice(index, 1);
}

function clearFileNode() {
  _store.fileNodeList.splice(0, _store.fileNodeList.length);
}

const mangekyouStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  getFileList() {
    return _store.fileNodeList;
  },
});

mangekyouDispatcher.register(payload => {
  const action = payload.action;
  switch (action.actionType) {
  case mangekyouConstant.ADD_FILE_NODE:
    addFileNode(action.data);
    mangekyouStore.emit(CHANGE_EVENT);
    break;
  case mangekyouConstant.REMOVE_FILE_NODE:
    removeFileNode(action.data);
    mangekyouStore.emit(CHANGE_EVENT);
    break;
  case mangekyouConstant.CLEAR_FILE_NODE:
    clearFileNode();
    mangekyouStore.emit(CHANGE_EVENT);
    break;
  default:
    return true;
  }
});

export default mangekyouStore;
