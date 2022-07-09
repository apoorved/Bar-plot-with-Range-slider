import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarPlot = props => {
  const svgRef = useRef(null);
  const { data, value } = props;
  const { width: outerWidth, height: outerHeight } = {
    width: 650,
    height: 320,
  };
  const margin = {
    top: 5,
    bottom: 60,
    left: 15,
    right: 5,
  };

  useEffect(
    () => {
      const x = d3.scaleBand();
      const y = d3.scaleLinear();

      const width = outerWidth - margin.right - margin.left;
      const height = outerHeight - margin.top - margin.bottom;
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();
      const totalYears = data.map(d => d.Year);
      let yearChange = [];
      totalYears.map(year => {
        if (year >= value[0] && year <= value[1]) {
          yearChange.push(year);
        }
      });
      x.domain(totalYears).range([0, width]);
      y.domain([0, d3.max(data, d => d.count)]).range([height, 0]);

      let colors = d3
        .scaleOrdinal()
        .domain(yearChange)
        .range(['#525252']);
      colors.unknown('#c4c4c4');

      const chart = svg
        .append('g')
        .attr(
          'transform',
          'translate(' + margin.left + ',' + margin.bottom + ')'
        );
      chart
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => x(d.Year))
        .attr('y', d => y(d.count))
        .attr('width', x.bandwidth())
        .attr('height', function(d) {
          return height - y(d.count);
        })
        .attr('fill', d => {
          return colors(d.Year);
        })
        .attr('stroke', d => {
          return colors(d.Year);
        });
    },
    [data, svgRef.current]
  );
  return (
    <>
      <svg
        className="d3-component"
        width={outerWidth}
        height={outerHeight}
        ref={svgRef}
      />
    </>
  );
};
export default BarPlot;