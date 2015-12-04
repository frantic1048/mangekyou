import React          from 'react';
import DropDownMenu   from 'material-ui/lib/drop-down-menu';
import mangekyouStore from '../../store/mangekyouStore';
import {range}        from '../../worker/util';

const BitPlane = React.createClass({
  propTypes: {
    willProcess: React.PropTypes.func.isRequired,
    currentImage: React.PropTypes.shape({
      width: React.PropTypes.number.isRequired,
      height: React.PropTypes.number.isRequired,
    }),
  },
  getInitialState() {
    return {
      param: {
        depth: 8,
        planeIndex: 1,
      },
      indexOptions: [...range(0, 8)].map(v => { return {payload: v, text: v}; }),
    };
  },
  componentDidMount() {
    mangekyouStore.addComputeListener(this._compute);
    this._compute();
  },
  componentWillUnmount() {
    mangekyouStore.removeComputeListener(this._compute);
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div>
        <p>8 个位平面</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
          }}
        >
          <div style={{
            display: 'inline-block',
            paddingBottom: '8px',
          }}>第</div>
          <DropDownMenu menuItems={this.state.indexOptions} onChange={this._handleChange}/>
          <div style={{
            display: 'inline-block',
            paddingBottom: '8px',
          }}>平面</div>
      </div>
      </div>
    );
  },
  _handleChange(event, selectedIndex, menuItem) {
    this.setState({
      param: {
        planeIndex: menuItem.payload,
      },
    });
    this._compute({
      depth: this.state.param.depth,
      planeIndex: menuItem.payload,
    });
  },
  _compute(param) {
    this.props.willProcess({
      operationName: 'BitPlane',
      operationParam: param || this.state.param,
    });
  },
});

export default BitPlane;
