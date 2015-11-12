import { EventEmitter } from 'events';

import mangekyouConstant from './../constant/mangekyouConstant';
import mangekyouDispatcher from './../dispatcher/mangekyouDispatcher';

const CHANGE_EVENT = {
  HISTORY: 'HISTORY',
  CURRENT_IMAGE: 'CURRENT_IMAGE',
};

const _store = {
  history: [],
  currentImage: null,
};

function addHistory({operation, image}) {
  History.push({operation, image});
  _store.currentImage = image;
}

function loadHistory(index) {
  _store.currentImage = _store.history[index].image;
}

function updateCurrentImage(image) {
  _store.currentImage = image;
}

function newImage(image) {
  _store.history = [];
  addHistory({
    operation: '打开文件',
    image,
  });
}

const mangekyouStore = Object.assign({}, EventEmitter.prototype, {
  addHistoryChangeListener(cb) {
    this.on(CHANGE_EVENT.HISTORY, cb);
  },
  removeHistoryChangeListener(cb) {
    this.removeListener(CHANGE_EVENT.HISTORY, cb);
  },
  addCurrentImageChangeListener(cb) {
    this.on(CHANGE_EVENT.CURRENT_IMAGE, cb);
  },
  removeCurrentImageChangeListener(cb) {
    this.removeListener(CHANGE_EVENT.CURRENT_IMAGE, cb);
  },
  getHistory() {
    return _store.history;
  },
  getCurrentImage() {
    return _store.currentImage;
  },
});

mangekyouDispatcher.register(payload => {
  const {data, actionType} = payload.action;
  switch (actionType) {
  case mangekyouConstant.ADD_HISTORY:
    addHistory(data);
    mangekyouStore.emit(CHANGE_EVENT.HISTORY);
    break;
  case mangekyouConstant.LOAD_HISTORY:
    loadHistory(data);
    mangekyouStore.emit(CHANGE_EVENT.CURRENT_IMAGE);
    break;
  case mangekyouConstant.NEW_IMAGE:
    newImage(data);
    mangekyouStore.emit(CHANGE_EVENT.CURRENT_IMAGE);
    mangekyouStore.emit(CHANGE_EVENT.HISTORY);
    break;
  case mangekyouConstant.UPDATE_CURRENT_IMAGE:
    updateCurrentImage(data);
    mangekyouStore.emit(CHANGE_EVENT.CURRENT_IMAGE);
    break;
  default:
    return true;
  }
});

export default mangekyouStore;
