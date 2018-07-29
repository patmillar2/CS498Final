!(function (d3) {

$("ccontent").empty();

var margin = {top: 20, right: 20, bottom: 30, left: 20},
    width = 960 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var svg = d3.select("ccontent").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
var x = d3.scaleLinear().rangeRound([width, 0]),
    y = d3.scaleLinear().rangeRound([height, 0]);
    
var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
// get the data
d3.csv("./CSV/Both.csv", function(error, data) {
if (error) throw error;

data.forEach(function(d) {
    d.Rate = +d.Rate;
    d.dataset = +d.dataset
});

  x.domain(data.map(function(d) { return d.Country; }));
  y.domain([0, d3.max(data, function(d) { return d.dataset; })]);
  
  // draw the x axis
  var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');

  g.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date')
	.call(xAxis);

  // draw the y axis
  var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left');

  g.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis);
  
  g.selectAll("scatter-dots")
  .data(data)
  .enter().append("svg:circle")
      .attr("cx", function (d,i) { return x(d.dataset); } )
      .attr("cy", function (d) { return y(d.Rate); } )
      .attr("r", 4);
      .append("svg:title")
      .text(function(d) { return d.Country; });
  });

})(d3);
