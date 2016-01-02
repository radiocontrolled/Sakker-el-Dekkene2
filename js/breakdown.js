(function(){

  "use strict";

  var wrapper, table, thead, tbody, tr, dataGlobal;
 
  d3.csv("data/breakdown.csv", function(data){
    dataGlobal = data; 
    var headerNames = d3.keys(data[0]);
    drawTable(headerNames);
  });


  // DATA TABLE FUNCTIONS 
  var drawTable = function (csvHeaders) {

    wrapper = document.getElementById("table");
    table = document.createElement("table");
    thead = document.createElement("thead");
    tbody = document.createElement("tbody");
    tr = document.createElement("tr");
    
    wrapper.appendChild(table);
    table.appendChild(thead);
    thead.appendChild(tr);
    table.appendChild(tbody);

    table.id = "table-breakdown";

    for(var i = 0; i < csvHeaders.length; i++) {
      var td = document.createElement("td");
      tr.appendChild(td);
      td.innerHTML = csvHeaders[i];
    }
  
    function drawRows() {

      for(var i = 0; i < dataGlobal.length; i++) {

        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        
        tbody.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        
        td1.innerHTML = dataGlobal[i]["Stage"];
        td2.innerHTML = dataGlobal[i]["Procedure"];
        td3.innerHTML = dataGlobal[i]["Avg Bribe"];

      }
    }

    drawRows();
  };


})();
