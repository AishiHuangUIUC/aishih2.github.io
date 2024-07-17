// Load the CSV data
d3.csv("data/athlete_events.csv").then(function(data) {
  // Extract the year from the "Year" field and convert it to a number
  data.forEach(function(d) {
    d.Year = +d.Year;
  });

  const years = Array.from(new Set(data.map(d => d.Year))).sort();

  // Populate the year dropdown
  const select = d3.select("#yearFilter");
  years.forEach(year => {
    select.append("option").text(year).attr("value", year);
  });

  // Define the color scale for the years
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  // Define the dimensions and margins of the plot
  const margin = { top: 50, right: 50, bottom: 100, left: 80 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  // Create the SVG container for the plot
  const svg = d3
    .select("#plot-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip");

  function updatePlot(selectedYear) {
    let filteredData = data;
    if (selectedYear !== "all") {
      filteredData = data.filter(d => d.Year == selectedYear);
    }

    const participation = d3.rollup(filteredData, v => v.length, d => d.Year);
    const years = Array.from(participation.keys());
    const counts = Array.from(participation.values());

    const x = d3.scaleBand()
      .domain(years)
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(counts)])
      .nice()
      .range([height, 0]);

    svg.selectAll("g").remove();
    svg.selectAll(".bar").remove();

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    svg.selectAll(".bar")
      .data(years)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d))
      .attr("y", d => y(participation.get(d)))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(participation.get(d)))
      .attr("fill", "steelblue");
  }

  // Initially load with all data
  updatePlot("all");

  // Add event listener to dropdown
  d3.select("#yearFilter").on("change", function() {
    const selectedYear = d3.select(this).property("value");
    updatePlot(selectedYear);
  });

  // Create a separate SVG container for the legend
  const legendContainer = d3.select("#legend-container")
    .append("svg")
    .attr("width", 300)
    .attr("height", 200);

  // Extract unique years from the data
  const uniqueYears = Array.from(new Set(data.map(d => d.Year)));

  // Create a legend group with two columns
  const legendGroup = legendContainer.append("g")
    .attr("transform", "translate(10, 10)");

  // Set the position for the legend entries
  const legendRowHeight = 20;
  const legendColumnWidth = 150;
  const numRows = Math.ceil(uniqueYears.length / 2);

  // Create legend entries (circles and text)
  const legendEntries = legendGroup.selectAll(".legend-entry")
    .data(uniqueYears)
    .enter()
    .append("g")
    .attr("class", "legend-entry")
    .attr("transform", (d, i) => {
      if (i < numRows) {
        return `translate(0,${i * legendRowHeight})`;
      } else {
        return `translate(${legendColumnWidth},${(i - numRows) * legendRowHeight})`;
      }
    });

  // Append colored circles to the legend
  legendEntries.append("circle")
    .attr("cx", 6)
    .attr("cy", 6)
    .attr("r", 6)
    .attr("fill", d => colorScale(d));

  // Append text labels to the legend
  legendEntries.append("text")
    .attr("x", 20)
    .attr("y", 10)
    .text(d => d)
    .style("font-family", "Arial")
    .style("font-size", "10px");
});
