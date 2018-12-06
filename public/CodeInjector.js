var csvData;
var inputElementsData;
var selectedInputElementsDict = {}

getCSVData();

function buttonTapped() {
   console.log('Button tapped');
}

function checkboxTapped(checkbox) {
    if(checkbox.checked) {
        const dropDownList = Array.from(document.getElementsByTagName('select')).filter(value => {
            return value.id === checkbox.id;
        });
        selectedInputElementsDict[checkbox.id] = dropDownList[0].value;
    }  else {
        delete selectedInputElementsDict[checkbox.id];
    }
 }

 function dropDownValueSelected(dropDown) {
    if(selectedInputElementsDict.hasOwnProperty(dropDown.id)) {
        selectedInputElementsDict[dropDown.id] = dropDown.value;
    }
 }

 function doneButtonTapped() {
    console.log('Done Button Tapped');
    console.log(selectedInputElementsDict);
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
    var inputElements = Array.from(document.getElementsByTagName('input'));
    for (var key in selectedInputElementsDict) {
       var selectedElements = inputElements.filter(inputElement => {
            return inputElement.name === key;
       });
       const indexOfName = csvData[0].indexOf(selectedInputElementsDict[key])
       selectedElements[0].value = csvData[1][indexOfName];
      }
 }

function getCSVData() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
           if (xmlhttp.status == 200) {
                csvData = JSON.parse(xmlhttp.responseText);
                getInputElements();
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned', xmlhttp.status);
           }
        }
    };

    xmlhttp.open("GET", "/readMockData", true);
    xmlhttp.send();
}

function getInputElements() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
           if (xmlhttp.status == 200) {
            inputElementsData = JSON.parse(xmlhttp.responseText);
               makeHTML();
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned', xmlhttp.status);
           }
        }
    };

    xmlhttp.open("GET", "/inputFields", true);
    xmlhttp.send();
}

function makeHTML() {
    var injectableHtml = `<!-- The Modal -->
    <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close" onclick="buttonTapped();">&times;</span>
            <h3>Select form fields that you want to be filled along with desired mappings</h3>
            <table id="csvData">
                <tr>
                    <th>Selected Fields</th>
                    <th>Input Fields</th>
                    <th>CSV Fields</th>
                </tr>
                <tr>
                `;
    
    for (var i = 0; i < inputElementsData.length; i++) {
        const inputElementDict = inputElementsData[i];
        injectableHtml += `<td><input type="checkbox" id="`+ inputElementDict['name'] + `" onchange="checkboxTapped(this);"/></td>`
        injectableHtml += `<td>` + inputElementDict['name'] + `</td>`;
        injectableHtml += `
            <td>
                <select onchange="dropDownValueSelected(this);" id="`+ inputElementDict['name'] + `">`;
        for (var j = 0; j < csvData[0].length; j++) {
            injectableHtml += `<option value="` + csvData[0][j] + `">` + csvData[0][j] +  `</option>`
        }
        injectableHtml += `
                    </select>
                </td>
            </tr>`
    }
    injectableHtml += `
                </table>
                <button type="button" onclick="doneButtonTapped();">DONE!</button>
            </div>
        </div>
        `;
    // console.log('Data', injectableHtml);
    document.body.innerHTML += injectableHtml
}

// function makeHTML(responselist) {
//     var injectableHtml = `<!-- The Modal -->
//     <div id="myModal" class="modal">
//         <!-- Modal content -->
//         <div class="modal-content">
//             <span class="close" onclick="buttonTapped();">&times;</span>
//             <table id="csvData">`;
    
//     for (var i = 0; i < responselist.length; i++) {
//         const dataList = responselist[i];
//         injectableHtml += `
//             <tr>
//         `;
//         for (var j = 0; j < dataList.length; j++) {
//             if(i === 0) {
//                 injectableHtml += `<th>` + dataList[j] + `</th>`
//             } else {
//                 injectableHtml += `<td>` + dataList[j] + `</td>`
//             }
//         }
//         injectableHtml += `
//             </tr>
//         `;
//     }
//     injectableHtml += `</table>
//         </div>
//     </div>`;
//     console.log('Data', injectableHtml);
//     document.body.innerHTML += injectableHtml
// }

