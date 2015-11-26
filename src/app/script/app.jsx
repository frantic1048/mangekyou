import React            from 'react';
import ThemeManager     from 'material-ui/lib/styles/theme-manager';
import LightRawTheme    from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import TitleBar         from './component/TitleBar';
import MainView         from './component/MainView';
import KeyboardShortcut from './component/KeyboardShortcut';
import keyMap           from './keyMap';

const main = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getInitialState() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  },
  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div id="main">
        <TitleBar />
        <MainView />
        <KeyboardShortcut descriptors={keyMap} />
      </div>
    );
  },
});

export default main;
