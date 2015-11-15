import React from 'react';

const SampleRate = React.createClass({
  propTypes: {
    willProcess: React.PropTypes.func.isRequired,
  },
  getInitialState() {
    return {
      param: {
        rate: Infinity,
      },
    };
  },
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div>this SampleRate</div>
    );
  },
  _handleChange() {
    // TODO: pass params to willProcess
    this.props.willProcess();
  },
});

export default SampleRate;
