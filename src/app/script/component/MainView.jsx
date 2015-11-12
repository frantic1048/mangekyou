import React from 'react';
import History from './History';
import Preview from './Preview';
import ToolPanel from './ToolPanel';

// TODO: MainView component
const MainView = React.createClass({
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div
        id="main-view"
        style={{
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'strech',
        }}
      >
        <History/>
        <Preview/>
        <ToolPanel/>
      </div>
    );
  },
});

export default MainView;
