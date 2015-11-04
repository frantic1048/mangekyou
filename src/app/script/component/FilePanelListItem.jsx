import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import IconButton from 'material-ui/lib/icon-button';
import Avatar from 'material-ui/lib/avatar';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
import mangekyouAction from './../action/mangekyouAction';

const FilePanelListItem = React.createClass({
  propTypes: {
    node: React.PropTypes.shape({
      data: React.PropTypes.shape({
        key: React.PropTypes.string.isRequired,
        file: React.PropTypes.shape({
          name: React.PropTypes.string.isRequired,
          path: React.PropTypes.string.isRequired,
          image: React.PropTypes.shape({
            data: React.PropTypes.any.isRequired,
            height: React.PropTypes.number.isRequired,
            width: React.PropTypes.number.isRequired,
          }),
        }).isRequired,
      }).isRequired,
    }).isRequired,
  },
  render() {
    const {key, file} = this.props.node.data;
    return ( // eslint-disable-line no-extra-parens
      <ListItem
        key={key}
        leftAvatar={
          <Avatar
            src={file.path}
            style={{ objectFit: 'cover', borderRadius: 'none' }}/>
        }
        primaryText={file.name}
        secondaryText={`路径：${file.path}`}
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
    mangekyouAction.removeFile(this.props.node.data.key);
  },
});

export default FilePanelListItem;
