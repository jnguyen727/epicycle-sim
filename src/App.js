import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import './App.css';

function generateOrbitPoints(radius, steps = 60,
                             cx = 200, cy = 200) {
  const points = [];
  for (let i = 0; i < steps; i++) {
    const θ = (i / steps) * 2 * Math.PI;
    points.push({
      x: cx + radius * Math.cos(θ),
      y: cy + radius * Math.sin(θ),
    });
  }
  return points;
}

function App() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    /*  This clears all previous elements. */
    svg.selectAll('*').remove();

    /* Generates 60 points on a circle of radius 100 */
    const orbit = generateOrbitPoints(100, 60);
    
    /* Binds data & draw one small circle per point... */
    svg
      .selectAll('circle')
      .data(orbit)
      .join('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 3)
        .attr('fill', 'steelblue');
  }, [])

  useEffect(() => {
    console.log('SVG element is:', svgRef.current);
  }, []);

  return (
    <div className="App">
      <h1>Epicycle vs Heliocentric</h1>
      <svg
        ref={svgRef}
        width={400}
        height={400}
        style={{ border: '1px solid #ccc' }}
      />
    </div>
  );
}

export default App;
