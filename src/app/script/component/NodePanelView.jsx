import React from 'react';
import NodePanelViewItem from './NodePanelViewItem';
import mangekyouStore from './../store/mangekyouStore';

const NodePanelView = React.createClass({
  getInitialState() {
    this.setState({
      nodes: mangekyouStore.getTransformNodes(),
    });
  },
  componentDidMount() {
    mangekyouStore.addTransformNodeChangeListener(this._onChange);
  },
  componentWillUnmount() {
    mangekyouStore.removeTransformNodeChangeListener(this._onChange);
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div
        style={{ padding: '1rem' }}
      >
        <NodePanelViewItem/>
      </div>
    );
  },
  _onChange() {
    this.setState({
      nodes: mangekyouStore.getTransformNodes(),
    });
  },
});

export default NodePanelView;
