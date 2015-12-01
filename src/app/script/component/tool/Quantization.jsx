import React  from 'react';
import Slider from 'material-ui/lib/slider';

const Quantization = React.createClass({
  // TODO: Quantization controls
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
        level: 256,
      },
    };
  },
  componentDidMount() {},
  componentDidUpdate() {
    // trigger computing on history/tool change
    this._compute();
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div>
        <Slider
          name="slider-quantization"
          onChange={this._handleChange}
          onDragStop={this._compute}
          defaultValue={256}
          max={256}
          min={1}
          step={1}
          description={`量化等级：${this.state.param.level}`}
        />
      </div>
    );
  },
  _handleChange(event, value) {
    this.setState({
      param: {
        level: value,
      },
    });
  },
  _compute() {
    this.props.willProcess({
      operationName: 'Quantization',
      operationParam: this.state.param,
    });
  },
});

export default Quantization;
