import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const DynamicSVGComponent: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Create SVG element
    svg.attr("width", 100)
       .attr("height", 100);

    // Create child elements
    svg.append("rect")
       .attr("x", 10)
       .attr("y", 10)
       .attr("width", 80)
       .attr("height", 80)
       .attr("fill", "red");

    // Clean up function
    return () => {
      svg.selectAll("*").remove(); // Remove all child elements
    };
  }, []);

  return null; // This component doesn't render anything
};

export default DynamicSVGComponent;
