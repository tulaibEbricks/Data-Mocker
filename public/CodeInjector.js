function injectHTML() {
    document.body.innerHTML += `<!-- The Modal -->
        <div id="myModal" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close" onclick="buttonTapped();">&times;</span>
                <table id="csvData">
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th> 
                        <th>Age</th>
                    </tr>
                    <tr>
                        <td>Jill</td>
                        <td>Smith</td> 
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>Eve</td>
                        <td>Jackson</td> 
                        <td>94</td>
                    </tr>
                    </table>
            </div>
        </div>`;
}
// injectHTML();
getCSVData();

function buttonTapped() {
   console.log('Button tapped');
}

function getCSVData() {
    console.log('getCSVData');

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               const responselist = JSON.parse(xmlhttp.responseText);
               makeHTML(responselist);
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

function makeHTML(responselist) {
    var injectableHtml = `<!-- The Modal -->
    <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close" onclick="buttonTapped();">&times;</span>
            <table id="csvData">`;
    
    for (var i = 0; i < responselist.length; i++) {
        const dataList = responselist[i];
        injectableHtml += `
            <tr>
        `;
        for (var j = 0; j < dataList.length; j++) {
            if(i === 0) {
                injectableHtml += `<th>` + dataList[j] + `</th>`
            } else {
                injectableHtml += `<td>` + dataList[j] + `</td>`
            }
        }
        injectableHtml += `
            </tr>
        `;
    }
    injectableHtml += `</table>
        </div>
    </div>`;
    console.log('Data', injectableHtml);
    document.body.innerHTML += injectableHtml
}

