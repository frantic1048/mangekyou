import mangekyouDispatcher from './../dispatcher/mangekyouDispatcher';
import mangekyouConstant from './../constant/mangekyouConstant';

const mangekyouAction = {
  addFile(newFile) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.ADD_FILE_NODE,
      data: newFile,
    });
  },
  removeFile(index) {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.REMOVE_FILE_NODE,
      data: index,
    });
  },
  clearFile() {
    mangekyouDispatcher.handleAction({
      actionType: mangekyouConstant.CLEAR_FILE_NODE,
    });
  },
};

export default mangekyouAction;
