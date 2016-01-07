import React          from 'react';
import DropDownMenu   from 'material-ui/lib/drop-down-menu';
import MenuItem       from 'material-ui/lib/menus/menu-item';
import Slider         from 'material-ui/lib/slider';
import mangekyouStore from '../../store/mangekyouStore';

const ChannelAdjust = React.createClass({
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
        space: 'rgb',
        delta: [0, 0, 0],
      },
      options: {
        /* eslint-disable key-spacing */
        rgb: {
          displayName   : 'RGB',
          channels: ['Red', 'Green', 'Blue'],
          param   : {space: 'rgb'},
        },
        hsl: {
          displayName   : 'HSL',
          channels: ['Hue', 'Saturation', 'Lightness'],
          param   : {space: 'hsl'},
        },
        hsv: {
          displayName   : 'HSV',
          channels: ['Hue', 'Saturation', 'Value'],
          param   : {space: 'hsv'},
        },
        hsy709: {
          displayName   : 'HSY, Rec. 709',
          channels: ['Hue', 'Saturation', 'Luma'],
          param   : {space: 'hsy709'},
        },
        hsy601: {
          displayName   : 'HSY, Rec. 601',
          channels: ['Hue', 'Saturation', 'Luma'],
          param   : {space: 'hsy601'},
        },
        /* eslint-enable key-spacing */
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
    const menuItems = [];

    for (const space of Object.keys(this.state.options)) {
      menuItems.push(
        <MenuItem
          key={space}
          value={space}
          primaryText={this.state.options[space].displayName}
        />
    );
    }

    return ( // eslint-disable-line no-extra-parens
      <div>
        色彩空间:
        <DropDownMenu
            onChange={this._handleSpaceChange}
            value={this.state.param.space}
          >
            {menuItems}
        </DropDownMenu>
        <Slider
          name="channel0"
          onChange={this._handleDeltaChange.bind(this, 0)}
          onClick={this._compute}
          onDragStop={this._compute}
          max={100}
          min={-100}
          step={1}
          description={`${this.state.options[this.state.param.space].channels[0]}`}
          style={{marginTop: '1rem'}}
        />
        <Slider
          name="channel1"
          onChange={this._handleDeltaChange.bind(this, 1)}
          onClick={this._compute}
          onDragStop={this._compute}
          max={100}
          min={-100}
          step={1}
          description={`${this.state.options[this.state.param.space].channels[1]}`}
          style={{marginTop: '1rem'}}
        />
        <Slider
          name="channel2"
          onChange={this._handleDeltaChange.bind(this, 2)}
          onClick={this._compute}
          onDragStop={this._compute}
          max={100}
          min={-100}
          step={1}
          description={`${this.state.options[this.state.param.space].channels[2]}`}
          style={{marginTop: '1rem'}}
        />
      </div>
    );
  },
  _handleSpaceChange(event, selectedIndex, value) {
    this.setState({
      param: {
        ...this.state.param,
        ...this.state.options[value].param,
      },
    });
  },
  _handleDeltaChange(channelIndex, event, value) {
    const newDelta = this.state.param.delta;
    newDelta[channelIndex] = value * 0.01; // scale value to [-1, 1]
    this.setState({
      param: {
        ...this.state.param,
        delta: newDelta,
      },
    });
  },
  _compute() {
    this.props.willProcess({
      operationName: 'ChannelAdjust',
      operationParam: this.state.param,
    });
  },
});

export default ChannelAdjust;
