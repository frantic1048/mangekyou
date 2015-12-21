import React            from 'react';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import RadioButton      from 'material-ui/lib/radio-button';
import mangekyouStore   from '../../store/mangekyouStore';

const HistogramEqualization = React.createClass({
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
        space: 'hsy709',
        channelIndex: 2,
      },
      options: {
        /* eslint-disable key-spacing*/
        hsy709: {
          label: '亮度（HSY, Rec. 709）',
          value: 'hsy709',
          key  : 'hsy709',
          param: {space: 'hsy709', channelIndex: 2},
        },
        hsy601: {
          label: '亮度（HSY, Rec. 610）',
          value: 'hsy601',
          key  : 'hsy601',
          param: {space: 'hsy601', channelIndex: 2},
        },
        hsl: {
          label: '亮度（HSL）',
          value: 'hsl',
          key  : 'hsl',
          param: {space: 'hsl', channelIndex: 2},
        },
        hsv: {
          label: '亮度（HSV）',
          value: 'hsv',
          key  : 'hsv',
          param: {space: 'hsv', channelIndex: 2},
        },
        /* eslint-enable key-spacing*/
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
        <RadioButtonGroup
          onChange={this._handleChange}
          name="histogramequalization"
          defaultSelected="hsy709"
        >
          {Object.keys(this.state.options).map(key => ( // eslint-disable-line no-extra-parens
            <RadioButton
              key={this.state.options[key].key}
              value={this.state.options[key].value}
              label={this.state.options[key].label}
            />
          ))}
        </RadioButtonGroup>
      </div>
    );
  },
  _handleChange(event, selected) {
    this.setState({
      param: this.state.options[selected].param,
    });
    this._compute(this.state.options[selected].param);
  },
  _compute(param) {
    this.props.willProcess({
      operationName: 'HistogramEqualization',
      operationParam: param || this.state.param,
    });
  },
});

export default HistogramEqualization;
