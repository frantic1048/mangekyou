import React        from 'react';
import ToolPanel    from './ToolPanel';
import HistoryPanel from './HistoryPanel';
import StatusPanel  from './StatusPanel';
import Preview      from './Preview';

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
        <HistoryPanel/>
        <Preview/>
        <ToolPanel/>
        <StatusPanel/>
      </div>
    );
  },
});

export default MainView;
