import React            from 'react';
import ThemeManager     from 'material-ui/lib/styles/theme-manager';
import LightRawTheme    from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors           from 'material-ui/lib/styles/colors';
import TitleBar         from './component/TitleBar';
import MainView         from './component/MainView';
import KeyboardShortcut from './component/KeyboardShortcut';
import keyMap           from './keyMap';

const main = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getInitialState() {
    let mangekyouTheme;
    mangekyouTheme = ThemeManager.getMuiTheme(LightRawTheme);
    mangekyouTheme = ThemeManager.modifyRawThemePalette(mangekyouTheme, {
      primary1Color: Colors.lightBlue500,
      primary2Color: Colors.lightBlue500,
      primary3Color: Colors.lightBlack,
      accent1Color: Colors.pinkA200,
      accent2Color: Colors.grey100,
      accent3Color: Colors.grey500,
    });
    return {
      muiTheme: mangekyouTheme,
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
