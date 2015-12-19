import React            from 'react';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import RadioButton      from 'material-ui/lib/radio-button';
import mangekyouStore   from '../../store/mangekyouStore';

const Grayscale = React.createClass({
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
        method: 'rec709',
      },
      options: [
        /* eslint-disable key-spacing */
        {
          label: '亮度（ITU-R BT.709）',
          value: 'rec709',
          key  : 'rec709',
        }, {
          label: '亮度（ITU-R BT.601）',
          value: 'rec601',
          key  : 'rec601',
        }, {
          label: '亮度（HSL）',
          value: 'hsl',
          key  : 'hsl',
        }, {
          label: '平均值',
          value: 'average',
          key  : 'average',
        }, {
          label: '最大值',
          value: 'max',
          key  : 'max',
        }, {
          label: '最小值',
          value: 'min',
          key  : 'min',
        },
        /* eslint-enable key-spacing */
      ],
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
        <RadioButtonGroup
          onChange={this._handleChange}
          name="grayscale"
          defaultSelected="rec709"
        >
          {this.state.options.map(({key, value, label}) => ( // eslint-disable-line no-extra-parens
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
      param: {
        method: selected,
      },
    });
    this._compute({method: selected});
  },
  _compute(method) {
    this.props.willProcess({
      operationName: 'Grayscale',
      operationParam: method || this.state.param,
    });
  },
});

export default Grayscale;
