import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardActions from 'material-ui/lib/card/card-actions';
import RaisedButton from 'material-ui/lib/raised-button';
import mangekyouAction from './../action/mangekyouAction';

const FilePanelCard = React.createClass({
  propTypes: {
    file: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      index: React.PropTypes.number.isRequired,
      image: React.PropTypes.shape({
        data: React.PropTypes.any.isRequired,
        height: React.PropTypes.number.isRequired,
        width: React.PropTypes.number.isRequired,
      }),
    }).isRequired,
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <Card style={{display: 'inline-block', width: `${1 / 5}%`}}>
        <CardMedia />
        <CardTitle title={this.props.file.name} subtitle={`#${this.props.file.index}`} />
        <CardActions>
          <RaisedButton onClick={this.handleRemoveFile}>移除</RaisedButton>
        </CardActions>
      </Card>
    );
  },
  handleRemoveFile() {
    mangekyouAction.removeFile(this.props.file.index);
  },
});

export default FilePanelCard;
