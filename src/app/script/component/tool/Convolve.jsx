import React            from 'react';
import DropDownMenu     from 'material-ui/lib/drop-down-menu';
import MenuItem         from 'material-ui/lib/menus/menu-item';
import RadioButtonGroup from 'material-ui/lib/radio-button-group'
import RadioButton      from 'material-ui/lib/radio-button';
import mangekyouStore   from '../../store/mangekyouStore';

const Convolve = React.createClass({
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
        core: [[0, -1, 0],
              [-1, 5, -1],
              [0, -1, 0]],
      },
      spaces: {
        /* eslint-disable key-spacing */
        rgb: {
          displayName   : 'RGB',
          param   : {space: 'rgb'},
        },
        hsl: {
          displayName   : 'HSL',
          param   : {space: 'hsl'},
        },
        hsv: {
          displayName   : 'HSV',
          param   : {space: 'hsv'},
        },
        hsy709: {
          displayName   : 'HSY, Rec. 709',
          param   : {space: 'hsy709'},
        },
        hsy601: {
          displayName   : 'HSY, Rec. 601',
          param   : {space: 'hsy601'},
        },
        /* eslint-enable key-spacing */
      },
      cores: {
        highpass: {
          label: '高通滤波',
          key: 'highpass',
          value: 'highpass',
          param: {
            core: [[0, -1, 0],
                  [-1, 5, -1],
                  [0, -1, 0]],
          },
        },
        highpass2: {
          label: '高通滤波2',
          key: 'highpass2',
          value: 'highpass2',
          param: {
            core: [[1, -2, 1],
                  [-2, 5, -2],
                  [1, -2, 1]],
          },
        },
        highpass3: {
          label: '高通滤波3',
          key: 'highpass3',
          value: 'highpass3',
          param: {
            core: [[1, -1, 1],
                  [-1, 9, -1],
                  [1, -1, 1]],
          },
        },
        lowpass: {
          label: '低通滤波',
          key: 'lowpass',
          value: 'lowpass',
          param: {
            core: [[0.1, 0.1, 0.1],
                  [0.1, 0.2, 0.1],
                  [0.1, 0.1, 0.1]],
          },
        },
        lowpass2: {
          label: '低通滤波2',
          key: 'lowpass2',
          value: 'lowpass2',
          param: {
            core: [[1 / 9, 1 / 9, 1 / 9],
                  [1 / 9, 1 / 9, 1 / 9],
                  [1 / 9, 1 / 9, 1 / 9]],
          },
        },
        lowpass3: {
          label: '低通滤波3',
          key: 'lowpass3',
          value: 'lowpass3',
          param: {
            core: [[1 / 16, 2 / 16, 1 / 16],
                  [2 / 16, 4 / 16, 2 / 16],
                  [1 / 16, 2 / 16, 1 / 16]],
          },
        },
        move: {
          label: '平移和差分边缘检测',
          key: 'move',
          value: 'move',
          param: {
            core: [[0, 0, 0],
                  [-1, 1, 0],
                  [0, 0, 0]],
          },
        },
        move2: {
          label: '平移和差分边缘检测2',
          key: 'move2',
          value: 'move2',
          param: {
            core: [[0, -1, 0],
                  [0, 1, 0],
                  [0, 0, 0]],
          },
        },
        move3: {
          label: '平移和差分边缘检测3',
          key: 'move3',
          value: 'move3',
          param: {
            core: [[-1, 0, 0],
                  [0, 1, 0],
                  [0, 0, 0]],
          },
        },
        edge: {
          label: '边缘检测',
          key: 'edge',
          value: 'edge',
          param: {
            core: [[-1, 0, -1],
                  [0, 4, 0],
                  [-1, 0, -1]],
          },
        },
        edge2: {
          label: '边缘检测2',
          key: 'edge2',
          value: 'edge2',
          param: {
            core: [[1, -2, 1],
                  [-2, 4, -2],
                  [1, -2, 1]],
          },
        },
        edge3: {
          label: '边缘检测3',
          key: 'edge3',
          value: 'edge3',
          param: {
            core: [[-1, -1, -1],
                  [-1, 8, -1],
                  [-1, -1, -1]],
          },
        },
        laplace: {
          label: '拉普拉斯边缘检测',
          key: 'laplace',
          value: 'laplace',
          param: {
            core: [[0, 0, 1, 0, 0],
                   [0, 1, 2, 1, 0],
                   [1, 2, -16, 2, 1],
                   [0, 1, 2, 1, 0],
                   [0, 0, 1, 0, 0]],
          },
        },
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
    const spaceMenuItems = [];

    for (const space of Object.keys(this.state.spaces)) {
      spaceMenuItems.push(
        <MenuItem
          key={space}
          value={space}
          primaryText={this.state.spaces[space].displayName}
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
            {spaceMenuItems}
        </DropDownMenu>
        <RadioButtonGroup
          onChange={this._handleCoreChange}
          name="core"
          defaultSelected="highpass"
          style={{marginTop: '1rem'}}
          >
          {Object.keys(this.state.cores).map(keyName => ( // eslint-disable-line no-extra-parens
            <RadioButton
              key={this.state.cores[keyName].key}
              value={this.state.cores[keyName].value}
              label={this.state.cores[keyName].label}
              />
          ))}
        </RadioButtonGroup>
      </div>
    );
  },
  _handleSpaceChange(event, selectedIndex, value) {
    this.setState({
      param: {
        ...this.state.param,
        ...this.state.spaces[value].param,
      },
    }, this._compute());
  },
  _handleCoreChange(event, selected) {
    this.setState({
      param: {
        ...this.state.param,
        ...this.state.cores[selected].param,
      },
    }, this._compute);
  },
  _compute() {
    this.props.willProcess({
      operationName: 'Convolve',
      operationParam: this.state.param,
    });
  },
});

export default Convolve;
