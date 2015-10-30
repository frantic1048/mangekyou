import { Dispatcher } from 'flux';

const mangekyouDispatcher = new Dispatcher();

Object.assign(mangekyouDispatcher, {
  handleAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action,
    });
  },
});

export default mangekyouDispatcher;
