import React from 'react';
import Slider from 'material-ui/lib/slider';

const SampleRate = React.createClass({
  propTypes: {
    willProcess: React.PropTypes.func.isRequired,
  },
  getInitialState() {
    return {
      param: {
        distance: 1,
      },
    };
  },
  componentDidMount() {
    this._handleChange(null, 1);
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div>
        <Slider
          name="slider-samplerate"
          onChange={this._handleChange}
          onDragStop={this._compute}
          max={256}
          min={1}
          step={1}
          description="采样距离"
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
