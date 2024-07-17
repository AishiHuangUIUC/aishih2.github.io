// scenes.js

// Function to render the first scene
function renderScene1(data) {
  d3.select("#visualization").html("");

  const svg = d3.select("#visualization")
    .append("svg")
    .attr("width", 960)
    .attr("height", 500);

  svg.append("text")
    .attr("x", 480)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .text("Scene 1: Overview of Olympic Participation");

  const participation = d3.rollup(data, v => v.length, d => d.Year);
  const years = Array.from(participation.keys());
  const counts = Array.from(participation.values());

  const x = d3.scaleBand()
    .domain(years)
    .range([50, 900])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(counts)])
    .nice()
    .range([450, 50]);

  svg.append("g")
    .attr("transform", "translate(0,450)")
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", "translate(50,0)")
    .call(d3.axisLeft(y));

  svg.selectAll(".bar")
    .data(years)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d))
    .attr("y", d => y(participation.get(d)))
    .attr("width", x.bandwidth())
    .attr("height", d => 450 - y(participation.get(d)))
    .attr("fill", "steelblue");
}

// Function to render the second scene
function renderScene2(data) {
  d3.select("#visualization").html("");

  const svg = d3.select("#visualization")
    .append("svg")
    .attr("width", 960)
    .attr("height", 500);

  svg.append("text")
    .attr("x", 480)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .text("Scene 2: Medal Distribution by Country");

  // Additional code to visualize medal distribution by country
}

// Function to render the third scene
function renderScene3(data) {
  d3.select("#visualization").html("");

  const svg = d3.select("#visualization")
    .append("svg")
    .attr("width", 960)
    .attr("height", 500);

  svg.append("text")
    .attr("x", 480)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .text("Scene 3: Top Athletes Over the Years");

  // Additional code to visualize top athletes over the years
}
