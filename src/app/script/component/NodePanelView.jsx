import React from 'react';
import NodePanelViewItem from './NodePanelViewItem';
import mangekyouStore from './../store/mangekyouStore';

const NodePanelView = React.createClass({
  getInitialState() {
    return {
      nodes: mangekyouStore.getTransformNodes(),
    };
  },
  componentDidMount() {
    mangekyouStore.addTransformNodeChangeListener(this._onChange);
  },
  componentWillUnmount() {
    mangekyouStore.removeTransformNodeChangeListener(this._onChange);
  },
  render() {
    const items = [];
    for (const [key, node] of this.state.nodes.entries()) {
      items.push(
        <NodePanelViewItem
          key={key}
          node={node}
        />
      );
    }
    return ( // eslint-disable-line no-extra-parens
      <div
          //            Height(viewPort - titlebar - tabbar - toolbar - padding)
          style={{ height: 'calc(100vh - 64px - 48px - 56px - 2rem)',
                   overflowY: 'auto',
                   padding: '1rem',
                }}
      >
        {items}
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
