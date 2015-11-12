import { EventEmitter } from 'events';

import mangekyouConstant from './../constant/mangekyouConstant';
import mangekyouDispatcher from './../dispatcher/mangekyouDispatcher';

const CHANGE_EVENT = {
  HISTORY: 'HISTORY',
  CURRENT_IMAGE: 'CURRENT_IMAGE',
  SHOWING: 'SHOWING',
};

const _store = {
  history: [],
  currentImage: null,
  showing: {
    historyPanel: true,
    toolPanel: true,
  },
};

function addHistory({operation, image}) {
  _store.history.push({operation, image});
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

function triggerShowing(componentName) {
  _store.showing[componentName] = !_store.showing[componentName];
}

const mangekyouStore = Object.assign({}, EventEmitter.prototype, {
  addHistoryChangeListener(cb) {
    this.on(CHANGE_EVENT.HISTORY, cb);
  },
  removeHistoryChangeListener(cb) {
    this.removeListener(CHANGE_EVENT.HISTORY, cb);
  },
  getHistory() {
    return _store.history;
  },
  addCurrentImageChangeListener(cb) {
    this.on(CHANGE_EVENT.CURRENT_IMAGE, cb);
  },
  removeCurrentImageChangeListener(cb) {
    this.removeListener(CHANGE_EVENT.CURRENT_IMAGE, cb);
  },
  getCurrentImage() {
    return _store.currentImage;
  },
  addShowingChangeListener(cb) {
    this.on(CHANGE_EVENT.SHOWING, cb);
  },
  removeShowingChangeListener(cb) {
    this.removeListener(CHANGE_EVENT.SHOWING, cb);
  },
  getShowing() {
    return _store.showing;
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
  case mangekyouConstant.TRIGGER_SHOWING:
    triggerShowing(data);
    mangekyouStore.emit(CHANGE_EVENT.SHOWING);
    break;
  default:
    return true;
  }
});

export default mangekyouStore;
