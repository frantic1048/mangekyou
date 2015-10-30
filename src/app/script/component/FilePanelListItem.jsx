import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import IconButton from 'material-ui/lib/icon-button';
import Avatar from 'material-ui/lib/avatar';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
import mangekyouAction from './../action/mangekyouAction';

const FilePanelCard = React.createClass({
  propTypes: {
    file: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      path: React.PropTypes.string.isRequired,
      index: React.PropTypes.number,
      image: React.PropTypes.shape({
        data: React.PropTypes.any.isRequired,
        height: React.PropTypes.number.isRequired,
        width: React.PropTypes.number.isRequired,
      }),
    }).isRequired,
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <ListItem
        leftAvatar={<Avatar src={this.props.file.path} style={{ objectFit: 'cover' }}/>}
        primaryText={this.props.file.name}
        secondaryText={`路径：${this.props.file.path}`}
        rightIconButton={
          <IconButton
            tooltip="移除"
            tooltipPosition="bottom-center"
            onClick={this.handleRemoveFile}>
            <ActionDelete/>
          </IconButton>
        }
      />
    );
  },
  handleRemoveFile() {
    mangekyouAction.removeFile(this.props.file.index);
  },
});

export default FilePanelCard;
