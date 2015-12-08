import mangekyouAction from './action/mangekyouAction';

const keyMap = [
  {
    char: 'h',
    action: () => { mangekyouAction.triggerShowing('historyPanel'); },
  }, {
    char: 't',
    action: () => { mangekyouAction.triggerShowing('toolPanel'); },
  }, {
    char: 'a',
    action: () => { mangekyouAction.triggerShowing('statusPanel'); },
  },
];

export default keyMap;
