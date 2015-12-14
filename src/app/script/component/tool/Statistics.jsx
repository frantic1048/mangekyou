import React             from 'react';
import Table             from 'material-ui/lib/table/table';
import TableBody         from 'material-ui/lib/table/table-body';
import TableRow          from 'material-ui/lib/table/table-row';
import TableRowColumn    from 'material-ui/lib/table/table-row-column';
import TableHeader       from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';

const Statistics = React.createClass({
  propTypes: {
    statistics: React.PropTypes.shape({
      width: React.PropTypes.number,
      height: React.PropTypes.number,
      pixelCount: React.PropTypes.number,
      averange: React.PropTypes.object,
      median: React.PropTypes.object,
      standardDeviation: React.PropTypes.object,
    }),
  },
  render() {
    const stat = this.props.statistics;
    const columnPadding = {
      paddingLeft: '8px',
      paddingRight: '8px',
    };
    const lumaRowColor = {color: 'rgba(53, 53, 53, 0.8)'};
    const redRowColor = {color: 'rgba(227, 45, 70, 0.8)'};
    const greenRowColor = {color: 'rgba(65, 164, 22, 0.8)'};
    const blueRowColor = {color: 'rgba(30, 123, 217, 0.8)'};
    const headerColumnStyle = Object.assign({}, columnPadding, {
      color: 'rgba(0, 0, 0, 0.8)',
    });
    const rowColumnStyle = Object.assign({}, columnPadding, {});
    return ( // eslint-disable-line no-extra-parens
      <div
        style={{
          marginTop: '1rem',
          fontSize: '14px',
        }}
      >
        <Table
          selectable={false}
          style={{backgroundColor: 'transparent'}}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
          <TableRow/>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
          <TableRow>
            <TableRowColumn style={rowColumnStyle}>宽×高</TableRowColumn>
            <TableRowColumn style={Object.assign({}, rowColumnStyle, lumaRowColor)}>{`${stat.width}×${stat.height}`}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn style={rowColumnStyle}>像素量</TableRowColumn>
            <TableRowColumn style={Object.assign({}, rowColumnStyle, lumaRowColor)}>{stat.pixelCount}</TableRowColumn>
          </TableRow>
          </TableBody>
        </Table>
        <Table
          selectable={false}
          style={{backgroundColor: 'transparent'}}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn style={headerColumnStyle}>通道</TableHeaderColumn>
              <TableHeaderColumn style={Object.assign({}, headerColumnStyle, lumaRowColor)}>Rec. 709</TableHeaderColumn>
              <TableHeaderColumn style={Object.assign({}, headerColumnStyle, redRowColor)}>Red</TableHeaderColumn>
              <TableHeaderColumn style={Object.assign({}, headerColumnStyle, greenRowColor)}>Green</TableHeaderColumn>
              <TableHeaderColumn style={Object.assign({}, headerColumnStyle, blueRowColor)}>Blue</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            <TableRow>
              <TableRowColumn style={rowColumnStyle}>平均值</TableRowColumn>
              <TableRowColumn style={Object.assign({}, headerColumnStyle, lumaRowColor)}>{Math.round(stat.averange.luma)}</TableRowColumn>
              <TableRowColumn style={Object.assign({}, headerColumnStyle, redRowColor)}>{Math.round(stat.averange.red)}</TableRowColumn>
              <TableRowColumn style={Object.assign({}, headerColumnStyle, greenRowColor)}>{Math.round(stat.averange.green)}</TableRowColumn>
              <TableRowColumn style={Object.assign({}, headerColumnStyle, blueRowColor)}>{Math.round(stat.averange.blue)}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn style={rowColumnStyle}>中值</TableRowColumn>
              <TableRowColumn style={Object.assign({}, headerColumnStyle, lumaRowColor)}>{stat.median.luma}</TableRowColumn>
              <TableRowColumn style={Object.assign({}, headerColumnStyle, redRowColor)}>{stat.median.red}</TableRowColumn>
              <TableRowColumn style={Object.assign({}, headerColumnStyle, greenRowColor)}>{stat.median.green}</TableRowColumn>
              <TableRowColumn style={Object.assign({}, headerColumnStyle, blueRowColor)}>{stat.median.blue}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn style={rowColumnStyle}>标准差</TableRowColumn>
              <TableRowColumn style={Object.assign({}, headerColumnStyle, lumaRowColor)}>{Math.round(stat.standardDeviation.luma)}</TableRowColumn>
              <TableRowColumn style={Object.assign({}, headerColumnStyle, redRowColor)}>{Math.round(stat.standardDeviation.red)}</TableRowColumn>
              <TableRowColumn style={Object.assign({}, headerColumnStyle, greenRowColor)}>{Math.round(stat.standardDeviation.green)}</TableRowColumn>
              <TableRowColumn style={Object.assign({}, headerColumnStyle, blueRowColor)}>{Math.round(stat.standardDeviation.blue)}</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  },
});

export default Statistics;
