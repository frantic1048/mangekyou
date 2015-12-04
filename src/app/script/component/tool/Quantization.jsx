import React          from 'react';
import Slider         from 'material-ui/lib/slider';
import mangekyouStore from '../../store/mangekyouStore';

const Quantization = React.createClass({
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
  componentDidMount() {
    mangekyouStore.addComputeListener(this._compute);
  },
  componentWillUnmount() {
    mangekyouStore.removeComputeListener(this._compute);
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div>
        <Slider
          name="slider-quantization"
          onChange={this._handleChange}
          onClick={this._compute}
          onDragStop={this._compute}
          defaultValue={256}
          max={256}
          min={2}
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
