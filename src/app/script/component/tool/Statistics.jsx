import React from 'react';

const Statistics = React.createClass({
  // TODO:20 implement Statistics component
  propTypes: {
    statistics: React.PropTypes.shape({
      width: React.PropTypes.number,
      height: React.PropTypes.number,
      pixelCount: React.PropTypes.number,
    }),
  },
  render() {
    const stat = this.props.statistics;
    return ( // eslint-disable-line no-extra-parens
      <div
        style={{
          marginTop: '1rem',
        }}
      >
        <div>
          宽×高：{`${stat.width}×${stat.height}`}
        </div>
        <div>
          像素数：{stat.pixelCount}
        </div>
      </div>
    );
  },
});

export default Statistics;
