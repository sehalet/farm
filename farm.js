/**
 * @name       Farm Assistent Filter (Min-Max)
 * @version    0.2
 * @description  Adds two input fields (min and max) to filter villages in the farm assistant based on a range of resources.
 * @copyright  TM4rkuS
 */

if (!twcheese) var twcheese = {};

// Locating the important DOM-Elements
var div = document.getElementById("am_widget_Farm");
var table = $('#plunder_list')[0];
var rows = table.getElementsByTagName("tr");

// Variables
var savedMinRess, savedMaxRess, ressArray, ressInt, cells;

// Get last input from local storage
savedMinRess = localStorage.getItem("tm4rkus_savedMinRess");
savedMaxRess = localStorage.getItem("tm4rkus_savedMaxRess");

// Add input fields
cells = rows[0].getElementsByTagName("th");

// Minimum input field
var minInput = document.createElement("input");
minInput.size = 6;
minInput.value = savedMinRess;
minInput.style.marginRight = "5px";
minInput.placeholder = "Min";
cells[5].insertBefore(minInput, cells[5].getElementsByTagName("img")[0]);

// Maximum input field
var maxInput = document.createElement("input");
maxInput.size = 6;
maxInput.value = savedMaxRess;
maxInput.style.marginRight = "5px";
maxInput.placeholder = "Max";
cells[5].insertBefore(maxInput, cells[5].getElementsByTagName("img")[0]);

// Update the list every time the user inserts anything
minInput.addEventListener("keyup", filter, false);
maxInput.addEventListener("keyup", filter, false);

function filter() {
    savedMinRess = minInput.value;
    savedMaxRess = maxInput.value;
    localStorage.setItem("tm4rkus_savedMinRess", savedMinRess);
    localStorage.setItem("tm4rkus_savedMaxRess", savedMaxRess);

    // Iterate through every row
    for (var i = 1; i < rows.length; i++) {
        cells = rows[i].getElementsByTagName("td");

        // Error prevention
        if (cells.length >= 10) {

            // Scrape and sum resources
            var cellBackup = String(cells[5].innerHTML);
            var res = $(cells[5]).find('.res, .warn_90, .warn').get();
            var ressInt = 0;
            for (var r = 0; r < res.length; r++) {
                res[r] = Number($(res[r]).text().replace('.', ''));
                ressInt += res[r];
            }
            cells[5].innerHTML = cellBackup;

            // Hide row if resources are out of range
            if (ressInt < minInput.value || (maxInput.value && ressInt > maxInput.value)) {
                rows[i].style.display = "none";
            } else {
                rows[i].style.display = "";
            }
        }
    }
}

// Initial filtering when the page loads
filter();
