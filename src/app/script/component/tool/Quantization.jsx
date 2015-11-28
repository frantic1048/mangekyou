import React from 'react';

const Quantization = React.createClass({
  // TODO: Quantization controls
  propTypes: {
    willProcess: React.PropTypes.func.isRequired,
    currentImage: React.PropTypes.shape({
      width: React.PropTypes.number.isRequired,
      height: React.PropTypes.number.isRequired,
    }),
  },
  getInitialState() {
    return {
      param: { },
    };
  },
  componentDidMount() {},
  render() {
    return ( // eslint-disable-line no-extra-parens
      <div>Quantization</div>
    );
  },
});

export default Quantization;
