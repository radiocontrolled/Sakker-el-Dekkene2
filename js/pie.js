(function() {
  "use strict";

  var height, width, svg, pie, arc, arcs, data, outerRadius;

  function getViewportDimensions () { 
     // if portrait
    if(window.innerHeight > window.innerWidth){
      width = document.getElementById("pie").offsetWidth;
    }

    // if landscape
    else {
      width = document.getElementById("pie").offsetWidth / 2.5;
    }

    height = width;
  };

  function setSvgSize() {
    svg
      .attr({
        width: width,
        height: height
      })
  }

  function drawSvg() {
    svg = d3.select("article")
      .append("svg")
      .attr({
    
        "viewBox" : "0 0 " + width + " " + height + " "
      })
      setSvgSize();

    svg
      .append("g")
      .classed("contain", true)
  }

 
  getViewportDimensions();
  drawSvg();


  d3.json("data/dataPieSummary.json", function(error, json) {
    if (error) return console.warn(error);
    data = json;
    visualise();
  });

  function visualise() {
    
    outerRadius = width / 2.5;
    arc = d3.svg.arc()
      .innerRadius(width/4) 
      .outerRadius(outerRadius);

  
    pie = d3.layout.pie()
      .sort(null)
      .padAngle(.01)
      .startAngle(0)
      .value(function(d){
        return d.Avg; 
      });
    
    arcs = svg.select(".contain")
      .selectAll(" g.arc") 
      .data(pie(data)) 
      .enter()
      .append("g")
      .attr({
        "transform" : "translate(" + outerRadius + "," + outerRadius + ")",
        "class": function(d,i){
        return d.data.Stage;
        }       
      });

    //Draw arc paths  
    arcs.append("path")
      .attr({
        "d": arc,
        "class" : function(d,i) {
           return "arc";
        }
      });
  }

  var swiperInit = function () {
   var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      direction: 'vertical',
      a11y: true,
      mousewheelControl: true,
      keyboardControl: true,
      onSlideChangeEnd: function() {
        
        switch(swiper.activeIndex) {
          case 1 : 
          break; 

          case 2 : d3.selectAll(".school").transition().duration(500).style("fill", "#7FB9E6");
          break; 

          case 3 : d3.selectAll(".university").transition().duration(500).style("fill", "#7FB9E6");
          break; 

          case 4 : d3.selectAll(".work").transition().duration(500).style("fill", "#7FB9E6");
          break;

          case 5 : d3.selectAll(".family").transition().duration(500).style("fill", "#7FB9E6");
          break; 

          case 6 : d3.selectAll(".retirement").transition().duration(500).style("fill", "#7FB9E6");
          break; 

          default: 
          break; 


        }
      },
      onSlidePrevEnd: function () {

           
        switch(swiper.activeIndex) {
        
          case 1 : d3.selectAll(".school").transition().duration(500).style("fill", "#fff"); 
          break; 

          case 2 : d3.selectAll(".university").transition().duration(500).style("fill", "#fff"); 
          break; 

          case 3 : d3.selectAll(".work").transition().duration(500).style("fill", "#fff"); 
          break; 
         
          case 4 : d3.selectAll(".family").transition().duration(500).style("fill", "#fff"); 
          break; 

          case 5 : d3.selectAll(".retirement").transition().duration(500).style("fill", "#fff"); 
          break; 

          default: 
          break; 


        }


        
      }
    });
  }();
   


  d3.select(window).on('resize', resize);

  function resize() {
    getViewportDimensions();
    setSvgSize();


    var arcs = svg.selectAll(".arc")
      .attr({
        "d": arc
      })
  
    d3.select(".contain")
      .style("transform", "translate(10%,10%)!important");
  

  }
 

})();
