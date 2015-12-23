import React            from 'react';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import RadioButton      from 'material-ui/lib/radio-button';
import Slider           from 'material-ui/lib/slider';
import mangekyouStore   from '../../store/mangekyouStore';

const Binarization = React.createClass({
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
        space: 'hsl',
        channelIndex: 2,
        threshold: 125,
      },
      options: {
        /* eslint-disable key-spacing */
        hsl: {
          label: 'HSL',
          value: 'hsl',
          key  : 'hsl',
          param: {space: 'hsl', channelIndex: 2},
        },
        hsv: {
          label: 'HSV',
          value: 'hsv',
          key  : 'hsv',
          param: {space: 'hsv', channelIndex: 2},
        },
        hsy709: {
          label: 'HSY, Rec. 709',
          value: 'hsy709',
          key  : 'hsy709',
          param: {space: 'hsy709', channelIndex: 2},
        },
        hsy601: {
          label: 'HSY, Rec. 601',
          value: 'hsy601',
          key  : 'hsy601',
          param: {space: 'hsy601', channelIndex: 2},
        },
        /* eslint-enable key-spacing */
      },
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
        <p>色彩空间</p>
        <RadioButtonGroup
          onChange={this._handleSpaceChange}
          name="binarization-color-space"
          defaultSelected="hsl"
        >
          {Object.keys(this.state.options).map(key => ( // eslint-disable-line no-extra-parens
            <RadioButton
              key={this.state.options[key].key}
              value={this.state.options[key].value}
              label={this.state.options[key].label}
            />
          ))}
        </RadioButtonGroup>
        <Slider
          name="slider-threshold"
          onChange={this._handleThresholdChange}
          onClick={this._compute}
          onDragStop={this._compute}
          defaultValue={125}
          max={254}
          min={0}
          step={1}
          description={`亮度阈值：${this.state.param.threshold} / 255`}
          style={{marginTop: '1rem'}}
        />
      </div>
    );
  },
  _handleSpaceChange(event, selected) {
    this.setState({
      param: {
        ...this.state.param,
        ...this.state.options[selected].param,
      },
    }, this._compute);
  },
  _handleThresholdChange(event, value) {
    this.setState({
      param: {
        ...this.state.param,
        threshold: value,
      },
    });
  },
  _compute() {
    this.props.willProcess({
      operationName: 'Binarization',
      operationParam: this.state.param,
    });
  },
});

export default Binarization;
