import React          from 'react';
import Paper          from 'material-ui/lib/paper';
import Histogram      from './tool/Histogram';
import Statistics     from './tool/Statistics';
import mangekyouStore from './../store/mangekyouStore';

const StatusPanel = React.createClass({
  // TODO:30 implement StatusPanel, intergrate to main view.
  getInitialState() {
    return {
      showing: mangekyouStore.getShowing().statusPanel,
    };
  },
  componentDidMount() {
    mangekyouStore.addShowingChangeListener(this._handleShowingChange);
  },
  componentWillUnmount() {
    mangekyouStore.removeShowingChangeListener(this._handleShowingChange);
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <Paper
        data-showing={this.state.showing}
        zDepth={2}
        rounded={false}
        id="status-panel"
        style={{
          position: 'fixed',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'space-between',
          alignItems: 'strech',
          width: 'auto',
          right: this.state.showing ? '0rem' : '-16rem',
          bottom: '0',
          transform: `scaleX(${this.state.showing ? 1 : 0})`,
          transformOrigin: 'right center',
          zIndex: 4,
          userSelect: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        <Histogram />
        <Statistics />
      </Paper>
    );
  },
  _handleShowingChange() {
    this.setState({
      showing: mangekyouStore.getShowing().statusPanel,
    });
  },
});

export default StatusPanel;
