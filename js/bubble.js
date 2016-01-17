(function() {

  "use strict";

  var height, width, svg, dataGlobal;

  var selectedClass,
    selectedClassCircle,
    selectedClassLine, 
    dataAvg, 
    tmp;

  var getViewportDimensions = function () { 
    width = document.getElementById("bubbleChart").offsetWidth;
    height = window.innerHeight * 0.95;
  };

  getViewportDimensions();

  var drawSvg = function () {
    svg = d3.select("#bubbleChart")
      .append("svg");
      setSvgSize();
  };

  var setSvgSize = function () {
    svg
      .attr({
        width: width,
        height: height
      });
  };

  var xScale = d3.scale.linear()
    .domain([5,0])
    .range([width/2,0]);


  var yScale = d3.scale.linear()
    .domain([25,0])
    .range([(height * 0.9),0]);

  var bubbleScale = d3.scale.linear()
    .domain([15000,10160000])
    .range([3,15]);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("top")
    .ticks(5)
    .tickFormat(function(d,i){ 
      return xTickLabels[i];
    });

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("right")  
    .ticks(25)
    .tickSize(-width * 0.5)
    .tickFormat(function(d,i){
      return yTickLabels[i][0];
    });

  var drawCircles = function () {
    svg.selectAll("circle")
      .data(dataGlobal.data)
      .enter()
      .append("g")
      .attr({
        "class" : function(d,i) {
          return d[4];
        }
      })
      .append("circle")
      .attr({
        "cx" : function(d) {
          return xScale(d[0]);
        },
        "cy" : function(d) {
          return yScale(d[1]);
        },
        "r" : function(d) {
          return bubbleScale(d[3]);
         
        },
        "class" : function(d,i) {
           return " circle" + " " + d[5];
        },
        "data-avg" : function(d,i) {
          return d[3];
        }
      });


    svg
      .append("g")
      .attr({
        "class" : "xAxis",
      })
      .call(xAxis);

    var yAxis2 = svg
      .append("g")
      .attr({
        "class" : "yAxis"
      })
      .style({
        "transform" : function () {
          return "translate(" + ((width/2) + 62) + "px,2em)";
        }
      })
      .call(yAxis);

    yAxis2.selectAll("line")
      .attr({
        "class" : function (d,i) {
          return "c-" + d;
        }
      });

    yAxis2.selectAll("text")  
      .attr({
        "class" : function(d,i) {
          return "c-" + d;
        }
      })
      .on("mouseover", function() {
        selectedClass = this.className.baseVal;

        // circle
        selectedClassCircle = "circle." + selectedClass;
        d3.selectAll(selectedClassCircle).classed("circleHover", true);

        // text
        dataAvg = d3.select(selectedClassCircle).attr("data-avg");
        tmp = d3.select(this).text();
        d3.select(this)
          .classed("textHover", true)
          .text(function(){
            return dataAvg;
          });

        //line 
        selectedClassLine = "line." + selectedClass;
        d3.selectAll(selectedClassLine).classed("lineHover", true);
        
      })
      .on("mouseout", function() {

        // circle 
        d3.selectAll(selectedClassCircle).classed("circleHover", false);


        // text
         d3.select(this)
          .classed("textHover", false)
          .text(function(){
            return tmp;
          });

        // line 
        d3.selectAll(selectedClassLine).classed("lineHover", false);

      });

  };


  d3.json("data/bubbleChartData.json", function(error, json){

    if (error) console.warn(error);

    else {
      dataGlobal = json; 
      drawSvg();
      drawCircles();
    }
 
  });


  d3.select(window).on('resize', resize);

  function resize() {

    getViewportDimensions();
    setSvgSize();


    // update scales 
    xScale
      .range([width/2,0]);

    yScale
      .range([(height * 0.9),0]);

    bubbleScale
      .range([3,15]);

    // update the circle positions and radius  
    svg.selectAll("circle")
      .attr({
        "cx" : function(d) {
          return xScale(d[0]);
        },
        "cy" : function(d) {
          return yScale(d[1]);
        },
        "r" : function(d) {
          return bubbleScale(d[3]);
         
        },
        "class" : function(d) {
          return d[2] + " circle";
        }
      });

    // update the axes 
    xAxis
      .scale(xScale);

    yAxis
      .scale(yScale);

    svg.selectAll(".xAxis")
      .call(xAxis);
 
    svg.selectAll(".yAxis")
     .style({
        "transform" : function () {
          return "translate(" + ((width/2) + 62) + "px,2em)";
        }
      })
      .call(yAxis);
 

  }

  var xTickLabels = ["Birth", "School", "University", "Work", "Family", "Retirement"];
  var yTickLabels = [
    ["Cadastre", "c-0"],
    ["Car Registration", "c-1"],
    ["Certification of Personal Documents (Marriage, Divorce...)", "c-2"],
    ["Civil Register Authentication", "c-3"],
    ["Cleaning of Judicial Record", "c-4"],
    ["Diploma Certification", "c-5"],
    ["Driving Licence", "c-6"],
    ["Driving Licence Replacement", "c-7"],
    ["Electricity Request", "c-8"],
    ["Fines: Parking Ticket", "c-9"],
    ["Hospital Admission", "c-10"],
    ["Housing Loan", "c-11"],
    ["Housing Permit", "c-12"],
    ["Identity card", "c-13"],
    ["Judicial Record", "c-14"],
    ["License for Commercial Enterprise", "c-15"],
    ["Mecanique", "c-16"],
    ["Passport", "c-17"],
    ["Permit to issue an approval for foreigners' competency licence holders", "c-18"],
    ["Redemption request a financial guarantee (certificate of deposit)", "c-19"],
    ["Passport Renewal", "c-20"],
    ["Results of Official Examinations", "c-21"],
    ["Social Security Procedures", "c-22"],
    ["Social Security Paperwok", "c-23"],
    ["Subscription to Lebanese University", "c-24"],
    ["Water Request", "c-25"]
  ];




})();
