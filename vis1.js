// Reference Code: 
// https://bl.ocks.org/danasilver/cc5f33a5ba9f90be77d96897768802ca
// https://bl.ocks.org/d3noob/204d08d309d2b2903e12554b0aef6a4d


// Geometry variables
var width = 400,
    height = 400,
    resolution = 40,
    r = 15;

var margin = {top: 0, right: 0, bottom: 0, left: 0};

// Label variables
var labels = ['A','B','C'];

var AB = 0,
    AC = 0,
    BC = 4;

// Origin data
var myData = {
  points: [
    {"x" : 5*resolution, "y": 3*resolution},
    {"x" : 2*resolution, "y": 6*resolution},
    {"x" : 8*resolution, "y": 7*resolution}
  ],
  lines : [
    {"source":  {x : 4*resolution, y: 4*resolution}, "target":  {x : 4*resolution, y: 6*resolution}},
    {"source":  {x : 4*resolution, y: 4*resolution}, "target":  {x : 6*resolution, y: 4*resolution}},
    {"source":  {x : 4*resolution, y: 6*resolution}, "target":  {x : 6*resolution, y: 4*resolution}}
  ]
}


// Chart 1
var svg1 = d3.select('#vis1a').append('svg')
    .attr('width', width)
    .attr('height', height);

// Vertical gridlines
svg1.selectAll('.vertical')
    .data(d3.range(1, width / resolution))
  .enter().append('line')
    .attr('class', 'vertical')
    .attr('x1', function(d) { return d * resolution; })
    .attr('y1', 0)
    .attr('x2', function(d) { return d * resolution; })
    .attr('y2', height);

// Horizontal gridlines
svg1.selectAll('.horizontal')
    .data(d3.range(1, height / resolution))
  .enter().append('line')
    .attr('class', 'horizontal')
    .attr('x1', 0)
    .attr('y1', function(d) { return d * resolution; })
    .attr('x2', width)
    .attr('y2', function(d) { return d * resolution; });


// Group
var labeledcirc = svg1.selectAll('g')
  .data(myData.points)
  .enter().append("g")
  .attr("transform", 
        "translate(" + margin.left + "," + margin.top + ")")
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended));


// Circle
var circ = labeledcirc.append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", r)
    .attr("id", function(d,i) {return labels[i]; });

// Label
var lbl = labeledcirc.append("text")
    .attr("x", function(d) { return d.x - 8; })
    .attr("y", function(d) { return d.y + 8; })
    .attr("text-anchor", "start")
    .style("fill", "white")
    .text(function(d,i) {return labels[i];})
    .attr("class", 'label')
    .attr("pointer-events", "none");


// Drag Functions
function dragstarted(d) {
  d3.select(this).raise().classed("active", true);
}

function dragged(d) {
  var x = d3.event.x,
      y = d3.event.y,
      gridX = round(Math.max(r, Math.min(width - r, x)), resolution),
      gridY = round(Math.max(r, Math.min(height - r, y)), resolution);

  d3.select(this).select("text")
      .attr('x', d.x = gridX - 8 ).attr('y', d.y = gridY + 8);
  d3.select(this).select("circle")
      .attr('cx', d.x = gridX).attr('cy', d.y = gridY);
  
  var Ax = A.cx.animVal.value,
      Ay = A.cy.animVal.value,
      Bx = B.cx.animVal.value,
      By = B.cy.animVal.value,
      Cx = C.cx.animVal.value,
      Cy = C.cy.animVal.value;
  
  AB = (Math.hypot(Bx-Ax, By-Ay))/40;
  AC = (Math.hypot(Cx-Ax, Cy-Ay))/40;
  BC = (Math.hypot(Cx-Bx, Cy-By))/40;
    
  document.getElementById("AB1").innerHTML = Math.round( AB * 10 ) / 10;
  document.getElementById("AB2").innerHTML = Math.round( AB * 10 ) / 10;
  document.getElementById("AC1").innerHTML = Math.round( AC * 10 ) / 10;
  document.getElementById("AC2").innerHTML = Math.round( AC * 10 ) / 10;
  document.getElementById("BC1").innerHTML = Math.round( BC * 10 ) / 10;
  document.getElementById("BC2").innerHTML = Math.round( BC * 10 ) / 10;
  
  if (AB == "3") {
    document.getElementById("AB1").classList.add("active");
    document.getElementById("AB2").classList.add("active");
    document.getElementById("row2 column3").classList.add("match");
    document.getElementById("row3 column2").classList.add("match");
  }
  else { 
    document.getElementById("AB1").classList.remove("active");
    document.getElementById("AB2").classList.remove("active");
    document.getElementById("row2 column3").classList.remove("match");
    document.getElementById("row3 column2").classList.remove("match");
  }
  
  if (BC == "4") {
    document.getElementById("BC1").classList.add("active");
    document.getElementById("BC2").classList.add("active");
    document.getElementById("row3 column4").classList.add("match");
    document.getElementById("row4 column3").classList.add("match");
  }
  else { 
    document.getElementById("BC1").classList.remove("active");
    document.getElementById("BC2").classList.remove("active");
    document.getElementById("row3 column4").classList.remove("match");
    document.getElementById("row4 column3").classList.remove("match");
  }
  
  if (AC == "5") {
    document.getElementById("AC1").classList.add("active");
    document.getElementById("AC2").classList.add("active");
    document.getElementById("row4 column2").classList.add("match");
    document.getElementById("row2 column4").classList.add("match");
  }
  else { 
    document.getElementById("AC1").classList.remove("active");
    document.getElementById("AC2").classList.remove("active");
    document.getElementById("row4 column2").classList.remove("match");
    document.getElementById("row2 column4").classList.remove("match");
  }
  
  if (AB == "3" && BC == "4" && AC == "5") {
	  document.getElementById("current").classList.add("match");
	  document.getElementById("target").classList.add("match");
    labeledcirc.attr("pointer-events", "none");
  }
   else {
	   document.getElementById("current").classList.remove("match");
	   document.getElementById("target").classList.remove("match");
  }
	
}

function dragended(d) {
  d3.select(this).classed("active", false);
}


// Snap to Grid
function round(p, n) {
  return p % n < n / 2 ? p - (p % n) : p + n - (p % n);
}

function dist(x1,x2,y1,y2) {
  return (Math.hypot(Bx-Ax, By-Ay)/40)
}