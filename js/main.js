(function() {

  "use strict";

  jQuery(document).ready(function() {
  
    var dataGlobal, wrapper, table, thead, tbody, tr, runningTotal, runningTotalMobile;

    var tableWrap = document.getElementById("data");

    // force page scroll position to top at page refresh - FF only!
    // jQuery(document).scrollTop(0);

    jQuery("html, body").animate({ scrollTop: 0 }, 500);

    var sticky = new Waypoint.Sticky({
      element: $('#data')[0]
    })


    // sum of bribes @ each stage
    //birth, school, uni, working, family, retirement
    var intervals = [[1,406,155],[3,483,238],[4,839,985],[20,388,287],[32,898,689],[35,491,510]];


    // DATA TABLE FUNCTIONS 
    var drawTable = function (csvHeaders) {

      wrapper = document.getElementById("data");
      table = document.createElement("table");
      thead = document.createElement("thead");
      tbody = document.createElement("tbody");
      tr = document.createElement("tr");
      
      wrapper.appendChild(table);
      table.appendChild(thead);
      thead.appendChild(tr);
      table.appendChild(tbody);

      table.classList.add("table");
      tableWrap.classList.add("hidden");
    //  table.classList.add("hidden");

      for(var i = 0; i < csvHeaders.length; i++) {
        var td = document.createElement("td");
        tr.appendChild(td);
        td.innerHTML = csvHeaders[i];
      }

      createRunningTotal();
    

    };

    var createRunningTotal = function () {
      var div = document.createElement("div");
      var span = document.createElement("span");
      div.id = "runningTotal";
      // div.classList.add("hidden");
      wrapper.appendChild(div);
      div.appendChild(span);
    };

    var addRow = function (stage) {
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      var td2 = document.createElement("td");
      tbody.appendChild(tr);
      tr.appendChild(td1);
      tr.appendChild(td2);
      
      td1.innerHTML = stage["Life Stage"];
      td2.innerHTML = stage["Est. bribes per life stage (ل.ل)"];


      addRunningTotalDesktop();
    };

    var removeRow = function (stage) {
      var last = tbody.lastChild;
      last.parentNode.removeChild(last);
    };

    var addRunningTotalDesktop = function (stage) {
     
      runningTotal = document.getElementById("runningTotal");
      runningTotal.innerHTML = "<span class='italic'>Est. total bribes:</span> " + stage + " ل.ل";

    };

    var addRunningTotalMobile = function (stage) {

      runningTotalMobile  = document.getElementById("mobileCounter");
      runningTotalMobile.innerHTML = "Est. total bribes: " + stage + " ل.ل";
    
    };

    var showFooter = function() {
      var footer = document.getElementById("footer");
      footer.classList.add("navbar-fixed-bottom");    
    };  
    
    var hideFooter = function() {
      var footer = document.getElementById("footer");
      footer.classList.remove("navbar-fixed-bottom");    
    };  


    var waypointsInit = function () {
        // WAYPOINTS, where table add row / subtract row functions called 
      // initialised with horizontal = false

      var waypointBirth = new Waypoint({
        element: document.getElementById("stage-birth"),
        handler: function(direction) {
          if(direction === "down") {
            
            tableWrap.classList.remove("hidden");
           

            addRow(dataGlobal[0]);
            addRunningTotalDesktop(intervals[0]);
            addRunningTotalMobile(intervals[0]);
            showFooter();
          }

          else {
            tableWrap.classList.add("hidden");
            
            hideFooter();
            removeRow();

          }
        }
      });

      var waypointSchool = new Waypoint({
        element: document.getElementById('stage-school'),
        handler: function(direction) {
          if(direction === "down") {
            addRow(dataGlobal[1]);
            addRunningTotalDesktop(intervals[1]);
            addRunningTotalMobile(intervals[1]);
            
          }
          else {
            removeRow();
            addRunningTotalDesktop(intervals[0]);
            addRunningTotalMobile(intervals[0]);
          }
        }
      });

      var waypointUniversity = new Waypoint({
        element: document.getElementById('stage-university'),
        handler: function(direction) {
          if(direction === "down") {
            addRow(dataGlobal[2]);
            addRunningTotalDesktop(intervals[2]);
            addRunningTotalMobile(intervals[2]);
          }
          else {
            removeRow();
            addRunningTotalDesktop(intervals[1]);
            addRunningTotalMobile(intervals[1]);
          }
        }
      });

      var waypointWorkingLife = new Waypoint({
        element: document.getElementById('stage-workingLife'),
        handler: function(direction) {
          if(direction === "down") {
            addRow(dataGlobal[3]);
            addRunningTotalDesktop(intervals[3]);
            addRunningTotalMobile(intervals[3]);
          }
          else {
            removeRow();
            addRunningTotalDesktop(intervals[2]);
            addRunningTotalMobile(intervals[2]);
          }
        }
      });

      var waypointFamilyLife = new Waypoint({
        element: document.getElementById('stage-familyLife'),
        handler: function(direction) {
          if(direction === "down") {
            addRow(dataGlobal[4]);
            addRunningTotalDesktop(intervals[4]);
            addRunningTotalMobile(intervals[4]);
          }
          else {
            removeRow();
            addRunningTotalDesktop(intervals[3]);
            addRunningTotalMobile(intervals[3]);
          }
        }
      });

      var waypointRetirement = new Waypoint({
        element: document.getElementById('stage-retirement'),
        handler: function(direction) {
          if(direction === "down") {
            addRow(dataGlobal[5]);
            addRunningTotalDesktop(intervals[5]);
            addRunningTotalMobile(intervals[5]);
          }
          else {
            removeRow();
            addRunningTotalDesktop(intervals[4]);
            addRunningTotalMobile(intervals[4]);
            tableWrap.classList.remove("hidden");
          }
        }
      });

      var waypointMethodology = new Waypoint({
        element: document.getElementById("methodology"),
        handler: function(direction) {
          if(direction === "down") {
            tableWrap.classList.add("hidden");
          }
          else {
            tableWrap.classList.remove("hidden");
          }
        }, 
        offset: 500
      })

      var waypointRetirement = new Waypoint({
        element: document.getElementById('breakdown'),
        handler: function(direction) {
          if(direction === "down") {
            hideFooter();
          }
          else {
            showFooter();
          }
        }
      });
    };

    

     // DATA 

    d3.csv("data/data.csv", function(data){
      dataGlobal = data; 
      var headerNames = d3.keys(data[0]);
      drawTable(headerNames);    
      waypointsInit(); // need to call this after data is loaded or error in Chrome
    });

  });
})();
