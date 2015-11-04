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
};

export default mangekyouAction;
