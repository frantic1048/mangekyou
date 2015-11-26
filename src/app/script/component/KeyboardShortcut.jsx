import React from 'react';

const KeyboardShortcut = React.createClass({
  propTypes: {
    descriptors: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        action: React.PropTypes.func.isRequired,
        char: React.PropTypes.string,
        ctrl: React.PropTypes.bool,
        alt: React.PropTypes.bool,
        shift: React.PropTypes.bool,
      })
    ).isRequired,
  },
  getInitialState() {
    return {
      listeners: this.props.descriptors.map(this._KeyListenerGen),
    };
  },
  componentDidMount() {
    for (const listener of this.state.listeners) {
      window.addEventListener('keydown', listener);
    }
  },
  componentWillUnmount() {
    for (const listener of this.state.listeners) {
      window.removeEventListener('keydown', listener);
    }
  },
  render() {
    return <div style={{display: 'none'}}></div>;
  },
  _KeyListenerGen({
    action = () => {},
    ctrl = false,
    alt = false,
    shift = false,
    char = '',
  }) {
    return (ev) => {
      if (ev.ctrlKey === ctrl
        && ev.altKey === alt
        && ev.shiftKey === shift
        && String.fromCharCode(ev.keyCode).toLowerCase() === char
      ) {
        action();
      }
    };
  },
});

export default KeyboardShortcut;
