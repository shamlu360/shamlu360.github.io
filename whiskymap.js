// This is the geo map code

var w = 1000,
    h = 400;

var margin = {top:5, right:5, bottom:100, left:100};

var map = d3.select("#map")
            .append("svg")
            .attr("width",w)
            .attr("height",h)
            .append("g")
            .attr('transform', 'translate(0,0)');

var g = map.append("g");

var path = d3.geoPath().projection(d3.geoEquirectangular());

var summ = d3.select("#summary")
            .append("svg")
            .attr("width",w)
            .attr("height",h)
            .attr('transform', 'translate(' + w/2 +','+ h/2 + ')')
            .append("g");

d3.json("https://gist.githubusercontent.com/shamlu360/7d3c9a6d36d0a3e6c7610dc225069e12/raw/901d0d870d82d3f98777a6333bac31be4d8d7158/whiskymap.json",function(json){
    g.selectAll("path")
       .data(json.features)
       .enter()
       .append("path")
       .attr("d",path)
       .attr("id", function(d){return d.properties.sovereignt;})
       .style("fill","teal")
       ;

/*for (var i = 0; i<json.features.length; i++){
	console.log(json.features[i].properties.sovereignt);
}*/

var country = d3.selectAll("path");

var mouseoverCountry;

country.on("mouseover", function(map){
	mouseoverCountry = d3.select(this).attr("id");
	console.log("It works!");
	console.log(mouseoverCountry);

  
  var xPos = parseFloat(d3.select(this).attr("x"));
  var yPos = parseFloat(d3.select(this).attr("y"));

  xPos = 100;
  yPos = 100;

  console.log("("+xPos+","+yPos+")");

  g.append("text")
     .attr("id","tooltip")
     .attr("x",xPos)
     .attr("y",yPos)
     .attr("text-anchor", "middle")
     .attr("font-family", "sans-serif")
     .attr("font-size", "11px")
     .attr("font-weight", "bold")
     .attr("fill", "black")
     .text(map.properties.sovereignt);

  
  summ.append("text")
     .attr("id","summary")
     .attr("x",xPos)
     .attr("y",yPos)
     .attr("text-anchor", "middle")
     .attr("font-family", "sans-serif")
     .attr("font-size", "14px")
     .attr("fill", "black")
     .text(mouseoverCountry);
       
});

country.on("mouseout", function(map){
	console.log("See you!");
  d3.select("#tooltip").remove();
  d3.select("#summary").selectAll("text")
    .remove();
})

    


});
