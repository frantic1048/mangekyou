import mangekyouDispatcher from './../dispatcher/mangekyouDispatcher';
import mangekyouConstant from './../constant/mangekyouConstant';

const mangekyouAction = {
  newImage(image) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.NEW_IMAGE,
      data: image,
    });
  },
  addHistory({operation, image}) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.ADD_HISTORY,
      data: {operation, image},
    });
  },
  loadHistory(index) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.LOAD_HISTORY,
      data: index,
    });
  },
  updateCurrentImage(image) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.UPDATE_CURRENT_IMAGE,
      data: image,
    });
  },
};

export default mangekyouAction;
