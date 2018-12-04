var csvData;
var inputElements;

getCSVData();

function buttonTapped() {
   console.log('Button tapped');
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
            console.log('xmlhttp.responseText');
               inputElements = JSON.parse(xmlhttp.responseText);
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
            <table id="csvData">
                <tr>
                    <th>Selected Fields</th>
                    <th>Input Fields</th>
                    <th>CSV Fields</th>
                </tr>
                <tr>
                `;
    
    for (var i = 0; i < inputElements.length; i++) {
        injectableHtml += `<td><input type="checkbox"/></td>`
        const inputElementDict = inputElements[i];
        injectableHtml += `<td>` + inputElementDict['name'] + `</td>`;
        injectableHtml += `
            <td>
                <select>`;
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

