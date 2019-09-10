// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.json("gender-data.json", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 80])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 10])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  for(i=0;i<data.length;i++){
    if(data[i].GovEduExp2016 === '..'){
    data.splice(i--,1);
    }
  }
  
/*
for(i=0;i<data.length;i++){
    if(data[i].GDPperCap2016 === '..'){
    data.splice(i--,1);
    }
  }
*/
//testing ======= which countries have 0 female legislatures 
    for(i=0;i<data.length;i++){
      var j = 0;
      if (data[i].govSeat2016 == 0) {
        console.log(data[i].Country)
        console.log(j++)
      }
    }

  // Add dots
 
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
      .append("circle")
      .attr("cx", function (d) { return x(d.govSeat2016); } )
      .attr("cy", function (d) { return y(d.GovEduExp2016); } )
     //   .attr("cy", function (d) { return y(d.GDPperCap2016); } )
      .attr("r", 2)
      .style("fill", "#69b3a2")

    



})


 