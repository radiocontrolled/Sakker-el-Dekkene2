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
      width = document.getElementById("pie").offsetWidth / 2;
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
          case 1 : console.log("birth");
          break; 

          case 2 : console.log("school");
          break; 

          case 3 : console.log("uni");
          break; 

          case 4 : console.log("work");
          break;

          case 5 : console.log("family");
          break; 

          case 6 : console.log("retirement");
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
