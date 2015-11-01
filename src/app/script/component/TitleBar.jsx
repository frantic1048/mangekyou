import React from 'react';
import AppBar  from 'material-ui/lib/app-bar';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import MoreVertIcon  from 'material-ui/lib/svg-icons/navigation/more-vert';

const TitleBar = React.createClass({
  render() {
    return ( // eslint-disable-line no-extra-parens
      <AppBar
        title="Magenkyou"
        style={{ WebkitAppRegion: 'drag', userSelect: 'none' }}
        iconElementLeft={
          <IconButton
            style={{ WebkitAppRegion: 'no-drag' }}>
            <NavigationClose/>
          </IconButton>}
        iconElementRight={
          <IconMenu
            style={{ WebkitAppRegion: 'no-drag' }}
            iconButtonElement={
            <IconButton><MoreVertIcon/></IconButton>
          }>
            <MenuItem primaryText="One"/>
            <MenuItem primaryText="Two"/>
            <MenuItem primaryText="San!"/>
          </IconMenu>
      }/>
    );
  },
});

export default TitleBar;
