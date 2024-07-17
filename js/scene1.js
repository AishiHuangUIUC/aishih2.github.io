// Load the CSV data
d3.csv("data/athlete_events.csv").then(function(data) {
  // Parse data
  data.forEach(d => {
    d.Age = +d.Age;
    d.Height = +d.Height;
    d.Weight = +d.Weight;
  });

  const margin = { top: 50, right: 30, bottom: 100, left: 60 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const svg = d3.select("#plot-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 100) // Increase height to accommodate legend
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // X axis
  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Age))
    .nice()
    .range([0, width]);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .append("text")
    .attr("class", "axis-title")
    .attr("x", width / 2) // Center the label
    .attr("y", 40) // Move the label below the axis
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .text("Age")
    .style("font-family", "Arial")
    .style("font-size", "12px");

  // Y axis
  const y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Height))
    .nice()
    .range([height, 0]);

  svg.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("class", "axis-title")
    .attr("x", -height / 2) // Center the label vertically
    .attr("y", -50) // Move the label to the left of the axis
    .attr("fill", "#000")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Height (cm)")
    .style("font-family", "Arial")
    .style("font-size", "12px");

  // Color scale for sports
  const sportColors = Array.from(new Set(data.map(d => d.Sport)));
  const color = d3.scaleOrdinal(d3.schemeCategory10)
    .domain(sportColors);

  // Tooltip
  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Scatter plot
  svg.selectAll("dot")
    .data(data.filter(d => d.Age && d.Height)) // Filter out missing data
    .enter()
    .append("circle")
    .attr("cx", d => x(d.Age))
    .attr("cy", d => y(d.Height))
    .attr("r", 3)
    .style("fill", d => color(d.Sport))
    .on("mouseover", function(event, d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.html("Name: " + d.Name + "<br/>" +
                   "Age: " + d.Age + "<br/>" +
                   "Height: " + d.Height + " cm<br/>" +
                   "Team: " + d.Team + "<br/>" +
                   "Sport: " + d.Sport)
        .style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

  // Add legend
  const legend = svg.selectAll(".legend")
    .data(sportColors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => "translate(" + ((i % 10) * 80) + "," + (height + 40 + Math.floor(i / 10) * 20) + ")"); // Adjust position to multiple rows

  legend.append("rect")
    .attr("x", 0)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

  legend.append("text")
    .attr("x", 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(d => d);

  // Adjust plot-container height to accommodate the legend
  d3.select("#plot-container svg")
    .attr("height", height + margin.top + margin.bottom + 60);
});
