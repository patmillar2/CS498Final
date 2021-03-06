!(function (d3) {

$("dcontent").empty();

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);
		  
var xAxis = d3.axisBottom(x);
		  
var yAxis = d3.axisLeft(y);

var svg = d3.select("dcontent").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("./CSV/Both.csv", function(error, data) {
if (error) throw error;

data.forEach(function(d) {
    d.Rate = +d.Rate;
    d.dataset = +d.dataset
});
	
  x.domain(d3.extent(data, function(d) { return d.dataset; })).nice();
  y.domain(d3.extent(data, function(d) { return d.Rate; })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Sepal Width (cm)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Sepal Length (cm)")

  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.dataset); })
      .attr("cy", function(d) { return y(d.Rate); })
      .style("fill", function(d) { return "steelblue"; })
      .append("svg:title")
      .text(function(d) { return d.Country; });
});    

})(d3);
