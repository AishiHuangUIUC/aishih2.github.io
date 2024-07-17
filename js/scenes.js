// scenes.js

// function renderScene1() {
//   d3.select("#visualization").html("");
  
//   const svg = d3.select("#visualization")
//     .append("svg")
//     .attr("width", 960)
//     .attr("height", 500);
  
//   svg.append("text")
//     .attr("x", 480)
//     .attr("y", 250)
//     .attr("text-anchor", "middle")
//     .text("Scene 1: Overview of Olympic Participation");
  
//   // Add more D3 code to render the actual data visualization
// }


function renderScene1() {
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

  d3.csv("data/athlete_events.csv").then(data => {
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
  });
}


function renderScene2() {
  d3.select("#visualization").html("");
  
  const svg = d3.select("#visualization")
    .append("svg")
    .attr("width", 960)
    .attr("height", 500);
  
  svg.append("text")
    .attr("x", 480)
    .attr("y", 250)
    .attr("text-anchor", "middle")
    .text("Scene 2: Medal Distribution by Country");
  
  // Add more D3 code to render the actual data visualization
}

function renderScene3() {
  d3.select("#visualization").html("");
  
  const svg = d3.select("#visualization")
    .append("svg")
    .attr("width", 960)
    .attr("height", 500);
  
  svg.append("text")
    .attr("x", 480)
    .attr("y", 250)
    .attr("text-anchor", "middle")
    .text("Scene 3: Top Athletes Over the Years");
  
  // Add more D3 code to render the actual data visualization
}
