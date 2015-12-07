import React            from 'react';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import RadioButton      from 'material-ui/lib/radio-button';
import mangekyouStore   from '../../store/mangekyouStore';
import {range}          from '../../worker/util';

const BitPlane = React.createClass({
  // TODO: configurable plane depth
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
        planeIndex: 0,
      },
      indexOptions: [...range(0, 8)].map(v => {
        return {label: `第 ${v} 平面`, value: `${v}`, key: `${v}`};
      }),
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
        <RadioButtonGroup
          onChange={this._handleChange}
          name="bitplane"
          defaultSelected="0"
        >
          {this.state.indexOptions.map(({key, value, label}) => ( // eslint-disable-line no-extra-parens
            <RadioButton
              key={key}
              value={value}
              label={label}
            />
          ))}
        </RadioButtonGroup>
      </div>
    );
  },
  _handleChange(event, selected) {
    this.setState({
      param: Object.assign({},
        this.state.param,
        { planeIndex: selected }
      ),
    });
    this._compute(Object.assign({},
      this.state.param,
      { planeIndex: selected }
    ));
  },
  _compute(param) {
    this.props.willProcess({
      operationName: 'BitPlane',
      operationParam: param || this.state.param,
    });
  },
});

export default BitPlane;
