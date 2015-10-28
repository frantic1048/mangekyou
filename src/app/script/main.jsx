import React  from 'react';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import AppBar  from 'material-ui/lib/app-bar';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import MoreVertIcon  from 'material-ui/lib/svg-icons/navigation/more-vert';

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
        <AppBar
          title="Magenkyou"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={
            <IconMenu iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }>
              <MenuItem primaryText="One" />
              <MenuItem primaryText="Two" />
              <MenuItem primaryText="San~" />
            </IconMenu>
        } />
        <Paper zDepth={1}>
          <Card>
            <CardHeader
              title="Add yoooo picture"
            />
            <CardText>
              <h1>Yooo</h1>
              <p>hahaha</p>
            </CardText>
          </Card>
        </Paper>
      </div>
    );
  },
});

export default main;
