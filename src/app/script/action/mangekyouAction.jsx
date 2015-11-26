import mangekyouDispatcher from './../dispatcher/mangekyouDispatcher';
import mangekyouConstant   from './../constant/mangekyouConstant';

const mangekyouAction = {
  newImage(image) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.NEW_IMAGE,
      data: image,
    });
  },
  addHistory({operation, operationDisplayName, image}) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.ADD_HISTORY,
      data: {operation, operationDisplayName, image},
    });
  },
  loadHistory(index) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.LOAD_HISTORY,
      data: index,
    });
  },
  setProcessingState(isProcessing) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.SET_PROCESSING_STATE,
      data: isProcessing,
    });
  },
  updatePreviewImage(image) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.UPDATE_PREVIEW,
      data: image,
    });
  },
  triggerShowing(componentName) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.TRIGGER_SHOWING,
      data: componentName,
    });
  },
};

export default mangekyouAction;
