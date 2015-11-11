import React from 'react';
import History from './History';
import Preview from './Preview';
import ToolPanel from './ToolPanel';

// TODO: MainView component
const MainView = React.createClass({
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div>
        <History/>
        <Preview/>
        <ToolPanel/>
      </div>
    );
  },
});

export default MainView;
