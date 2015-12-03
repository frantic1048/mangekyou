import React          from 'react';
import Slider         from 'material-ui/lib/slider';
import mangekyouStore from '../../store/mangekyouStore';

const SampleRate = React.createClass({
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
        distance: 1,
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
          name="slider-samplerate"
          onChange={this._handleChange}
          onClick={this._compute}
          onDragStop={this._compute}
          max={this.props.currentImage ? Math.min(this.props.currentImage.width, this.props.currentImage.height) : 20}
          min={1}
          step={1}
          description={`采样距离: ${this.state.param.distance} px`}
        />
      </div>
    );
  },
  _handleChange(event, value) {
    this.setState({
      param: {
        distance: value,
      },
    });
  },
  _compute() {
    this.props.willProcess({
      operationName: 'SampleRate',
      operationParam: this.state.param,
    });
  },
});

export default SampleRate;
