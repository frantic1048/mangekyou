import React from 'react';
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
      <div
        data-showing={this.state.showing}
        id="tool-panel"
        style={{
          flexGrow: '1',
          flexBasis: '12rem',
          userSelect: 'none',
        }}
      ><h1>Tool Panel</h1></div>
    );
  },
  _onShowingChange() {
    this.setState({
      showing: mangekyouStore.getShowing().toolPanel,
    });
  },
});

export default ToolPanel;
