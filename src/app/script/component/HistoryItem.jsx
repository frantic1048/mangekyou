import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import IconButton from 'material-ui/lib/icon-button';
import ActionHistory from 'material-ui/lib/svg-icons/action/history';
import mangekyouAction from './../action/mangekyouAction';

const HistoryItem = React.createClass({
  propTypes: {
    history: React.PropTypes.shape({
      operation: React.PropTypes.string.isRequired,
      image: React.PropTypes.shape({
        data: React.PropTypes.any.isRequired,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    index: React.PropTypes.number.isRequired,
  },
  render() {
    const cv = document.createElement('canvas');
    cv.getContext('2d').drawImage(this.props.history.image, 0, 0);
    const dataURL = cv.toDataURL('image/png');
    return ( // eslint-disable-line no-extra-parens
      <ListItem
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
            tooltip="跳转"
            tooltipPosition="right-center"
            onClick={this.handleLoadHistory}
          >
            <ActionHistory/>
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
