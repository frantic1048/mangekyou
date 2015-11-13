import React from 'react';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import DorpDownMenu from 'material-ui/lib/drop-down-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import mangekyouAction from '../action/mangekyouAction';
import mangekyouStore from '../store/mangekyouStore';

const ToolPanel = React.createClass({
  getInitialState() {
    return {
      showing: mangekyouStore.getShowing().toolPanel,
    };
  },
  componentDidMount() {
    mangekyouStore.addShowingChangeListener(this._onShowingChange);
  },
  componentWillUnmount() {
    mangekyouStore.removeShowingChangeListener(this._onShowingChange);
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <Paper
        data-showing={this.state.showing}
        zDepth={2}
        rounded={false}
        id="tool-panel"
        style={{
          flexGrow: '1',
          flexBasis: '12rem',
          zIndex: 4,
          userSelect: 'none',
        }}
      >
        <h1>Tool Panel</h1>
      </Paper>
    );
  },
  _onShowingChange() {
    this.setState({
      showing: mangekyouStore.getShowing().toolPanel,
    });
  },
});

export default ToolPanel;
