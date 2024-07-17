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
    .attr("height", height + margin.top + margin.bottom)
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
    .attr("x", width)
    .attr("y", -10)
    .style("text-anchor", "end")
    .text("Age");

  // Y axis
  const y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Height))
    .nice()
    .range([height, 0]);

  svg.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("class", "axis-title")
    .attr("x", -10)
    .attr("y", 10)
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "end")
    .text("Height (cm)");

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
    .style("fill", "#69b3a2")
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
});
