// Load the CSV data
d3.csv("data/athlete_events.csv").then(function(data) {
  // Group data by Year
  const yearData = d3.nest()
    .key(d => d.Year)
    .rollup(v => ({
      totalAthletes: v.length,
      totalCountries: d3.set(v.map(d => d.NOC)).size(),
      totalSports: d3.set(v.map(d => d.Sport)).size()
    }))
    .entries(data);

  const margin = { top: 50, right: 30, bottom: 100, left: 60 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const svg = d3.select("#line-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // X axis
  const x = d3.scaleLinear()
    .domain(d3.extent(yearData, d => d.key))
    .range([0, width]);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  // Y axis
  const y = d3.scaleLinear()
    .domain([0, d3.max(yearData, d => d.value.totalAthletes)])
    .nice()
    .range([height, 0]);

  svg.append("g")
    .call(d3.axisLeft(y));

  // Line generator
  const line = d3.line()
    .x(d => x(d.key))
    .y(d => y(d.value.totalAthletes))
    .curve(d3.curveMonotoneX);

  // Add the line
  svg.append("path")
    .datum(yearData)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("d", line);

  // Tooltip
  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Add points
  svg.selectAll(".dot")
    .data(yearData)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", d => x(d.key))
    .attr("cy", d => y(d.value.totalAthletes))
    .attr("r", 5)
    .on("mouseover", function(event, d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.html("Year: " + d.key + "<br/>" +
                   "Total Athletes: " + d.value.totalAthletes + "<br/>" +
                   "Total Countries: " + d.value.totalCountries + "<br/>" +
                   "Total Sports: " + d.value.totalSports)
        .style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

  // Add axis labels
  svg.append("text")
    .attr("class", "axis-title")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .text("Year")
    .style("font-family", "Arial")
    .style("font-size", "12px");

  svg.append("text")
    .attr("class", "axis-title")
    .attr("x", -height / 2)
    .attr("y", -50)
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Total Athletes")
    .style("font-family", "Arial")
    .style("font-size", "12px");
});
