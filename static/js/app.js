let data = "/api/"

d3.json("/api/", function(error, data) {
  if (error) throw error;
  console.log(data); 

// from data.js
var tbody = d3.select("tbody");

// // UFO report values
// // // Step 1: Loop Through `data` and console.log each UFO report object
data.forEach((Report) => {
// // // Step 2:  Use d3 to append one table row `tr` for each UFO report object
    var row = tbody.append("tr");
// // // Step 3:  Use `Object.entries` to console.log each UFO report value
    Object.entries(Report).forEach(([key, value]) => {
      var cell = row.append("td"); // // // Step 4: Use d3 to append 1 cell per UFO report value
      cell.text(value); // // Step 5: Use d3 to update each cell's text with
    });
  });

// create a update the table function
function update_table(data){
  // Update the table
     tbody.selectAll('tr').remove();
     var rows = tbody.selectAll('tr')
              .data(data)
              .enter()
              .append('tr');
  // create a cell in each row for each column
  data.forEach((Report) => {
      // // // Step 2:  Use d3 to append one table row `tr` for each UFO report object
          var row = tbody.append("tr");
      // // // Step 3:  Use `Object.entries` to console.log each UFO report value
          Object.entries(Report).forEach(([key, value]) => {
            var cell = row.append("td"); // // // Step 4: Use d3 to append 1 cell per UFO report value
            cell.text(value); // // Step 5: Use d3 to update each cell's text with
          });
        });
  }  


// // ******Filter Multiple Seach*****
// Select the button
var button = d3.select("#filter-btn");

// Select the form

var form = d3.select(".form-control");

// Create event handlers for clicking the button or pressing the enter key
button.on("click", runEnter);
form.on("submit", runEnter);

// Create the function to run for both events
function runEnter() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

   // Select the input element and get the raw HTML node
   var inputElement1 = d3.select("#cases");
 
   // Get the value property of the input element
   var inputValue1 = inputElement1.property("value");
   
   console.log(inputValue1);

   //Get the filter value in object
   var filterobject = {
    no_of_cases: parseInt(inputValue1),
  }
  
  console.log(filterobject)
 
  //do a loop to filter the data
  filtereddata = data.filter(function(item) {
    for (var key in filterobject) {
      if (item[key] === undefined || item[key] != filterobject[key])
        return false;
    }
    return true;
  });
  
  console.log(filtereddata);
  update_table(filtereddata); 
 
 };


//Reset Seach
var reset_btn = d3.select("#reset-btn");
reset_btn.on("click", function() {
    document.getElementById('cases').value = 500;
    update_table(data);
});  

});