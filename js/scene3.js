// Load the CSV data
d3.csv("data/athlete_events.csv").then(function(data) {
  // Group data by athlete and count medals
  const athleteMedals = d3.rollup(data, v => v.length, d => d.Name, d => d.Medal);
  const topAthletes = Array.from(athleteMedals, ([name, medals]) => ({
    name,
    gold: medals.get('Gold') || 0,
    silver: medals.get('Silver') || 0,
    bronze: medals.get('Bronze') || 0,
    total: (medals.get('Gold') || 0) + (medals.get('Silver') || 0) + (medals.get('Bronze') || 0)
  }));

  // Sort athletes by total medals
  topAthletes.sort((a, b) => b.total - a.total);

  const top10Athletes = topAthletes.slice(0, 10); // Take top 10 athletes

  const margin = { top: 50, right: 30, bottom: 100, left: 60 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const svg = d3.select("#plot-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const x = d3.scaleBand()
    .domain(top10Athletes.map(d => d.name))
    .range([0, width])
    .padding(0.1);

  const y = d3.scaleLinear()
    .domain([0, d3.max(top10Athletes, d => d.total)])
    .nice()
    .range([height, 0]);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom
