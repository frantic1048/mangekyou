import React from 'react';

const Statistics = React.createClass({
  // TODO:20 implement Statistics component
  propTypes: {
    statistics: React.PropTypes.shape({
      width: React.PropTypes.number,
      height: React.PropTypes.number,
      pixelCount: React.PropTypes.number,
      averange: React.PropTypes.object,
      median: React.PropTypes.object,
      standardDeviation: React.PropTypes.object,
    }),
  },
  render() {
    // TODO: display all channel statistics info.
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
        <div>通道信息（Rec. 709 亮度，红，绿，蓝）</div>
        <div>
          平均值：{Math.round(stat.averange.luma)}
        </div>
        <div>
          中值：{stat.median.luma}
        </div>
        <div>
          标准差：{Math.round(stat.standardDeviation.luma)}
        </div>
      </div>
    );
  },
});

export default Statistics;
