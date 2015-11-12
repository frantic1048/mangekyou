import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import IconButton from 'material-ui/lib/icon-button';
import ContentForward from 'material-ui/lib/svg-icons/content/forward';
import mangekyouAction from './../action/mangekyouAction';

const HistoryItem = React.createClass({
  propTypes: {
    history: React.PropTypes.shape({
      operation: React.PropTypes.string.isRequired,
      image: React.PropTypes.shape({
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        toDataURL: React.PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    index: React.PropTypes.number.isRequired,
  },
  render() {
    const dataURL = this.props.history.image.toDataURL('image/png');
    return ( // eslint-disable-line no-extra-parens
      <ListItem
        style={{ userSelect: 'none' }}
        leftAvatar={
          <Avatar
            src={dataURL}
            style={{
              objectFit: 'contain',
              borderRadius: '0',
            }}
          />
        }
        primaryText={this.props.history.operation}
        rightIconButton={
          <IconButton
            tooltip="跳转到此记录"
            tooltipPosition="bottom-right"
            onClick={this.handleLoadHistory}
          >
            <ContentForward/>
          </IconButton>
        }
      />
    );
  },
  handleLoadHistory() {
    mangekyouAction.loadHistory(this.props.index);
  },
});

export default HistoryItem;
