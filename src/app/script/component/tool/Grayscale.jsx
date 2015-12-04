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
        {
          displayName: 'Rec. 709',
          value: 'rec709',
        }, {
          displayName: '平均值',
          value: 'average',
        }, {
          displayName: '最大值',
          value: 'max',
        }, {
          displayName: '最小值',
          value: 'min',
        },
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
          {this.state.options.map((op) => ( // eslint-disable-line no-extra-parens
            <RadioButton
              key={op.value}
              value={op.value}
              label={op.displayName}
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
