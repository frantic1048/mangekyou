import mangekyouDispatcher from './../dispatcher/mangekyouDispatcher';
import mangekyouConstant from './../constant/mangekyouConstant';

const mangekyouAction = {
  addFile(fileNode) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.ADD_FILE_NODE,
      data: fileNode,
    });
  },
  removeFile(key) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.REMOVE_FILE_NODE,
      data: key,
    });
  },
  clearFile() {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.CLEAR_FILE_NODE,
    });
  },
  addTransformNode(transformNode) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.ADD_TRANSFORM_NODE,
      data: transformNode,
    });
  },
  removeTransformNode(key) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.REMOVE_TRANSFORM_NODE,
      data: key,
    });
  },
  clearTransformNode() {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.CLEAR_TRANSFORM_NODE,
    });
  },
};

export default mangekyouAction;
