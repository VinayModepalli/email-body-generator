let firstName = ''
let email = ''
let company = ''
let roles = ''

function generateEmailBody(ID){
    firstName = document.getElementById(ID+'-'+0).innerHTML;
    email = document.getElementById(ID+'-'+1).innerHTML;
    company = document.getElementById(ID+'-'+2).innerHTML;
    jobRoles = document.getElementById(ID+'-'+3).children[0].value;
    console.log('email generated',firstName, email, company);
    let bodyString = `
    Hello ${firstName},<br><br/>

    I hope this email finds you well. I am writing to express my interest in potential employment opportunities with ${company}. I have gone through ${company} career page and found these roles that I believe would fit me well. <br/><br/>Job: ${jobRoles} <br/><br/>

    I would greatly appreciate any referrals or recommendations. If there are any open roles at ${company}, I would be grateful if you could consider me for the position.

    <br/><br/>
    <strong>Resume:</strong> https://tinyurl.com/mvkresume <br/>
    <strong>LeetCode:</strong>  https://leetcode.com/vinaymodepalli/ <br/>
    <strong>GitHub:</strong>  https://github.com/VinayModepalli/ <br/>
    <strong>Phone:</strong> +91 85001 49027 <br/><br/>
    
    I am excited about the opportunity to apply my skills and experience, and I believe that I would be able to make meaningful contributions to ${company}. Thank you for your time and consideration. I look forward to hearing back from you soon.

    <br/><br/>
    Best regards,<br/>
    Vinay Modepalli.
    
    `
    document.getElementById('email-body').innerHTML = bodyString;
    document.getElementById('mail-link').href = `mailto:${email}?subject=Seeking for a referral at ${company}&attachment=resume.pdf` 
}


function readCSVFile(){
    var files = document.querySelector('#file').files;

    if(files.length > 0 ){

         // Selected file
         var file = files[0];

         // FileReader Object
         var reader = new FileReader();

         // Read file as string 
         reader.readAsText(file);

         // Load event
         reader.onload = function(event) {

              // Read file data
              var csvdata = event.target.result;

              // Split by line break to gets rows Array
              var rowData = csvdata.split('\n');

              // <table > <tbody>
              var tbodyEl = document.getElementById('tblcsvdata').getElementsByTagName('tbody')[0];
              tbodyEl.innerHTML = "";

              // Loop on the row Array (change row=0 if you also want to read 1st row)
              for (var row = 1; row < rowData.length; row++) {

                    // Insert a row at the end of table
                    var newRow = tbodyEl.insertRow();
                    newRow.setAttribute("id", row, 0);
                    newRow.setAttribute("onClick", "generateEmailBody(this)", 0);

                    // Split by comma (,) to get column Array
                    var rowColData = rowData[row].split(',');

                    // Loop on the row column Array
                    let data = [];
                    //for serial number
                    var newCellStart = newRow.insertCell();
                    newCellStart.innerHTML = row;
                    //for status
                    var newCellSerial = newRow.insertCell();
                    newCellSerial.innerHTML = `<input type="checkbox" >`;
                    var col;
                    for (col = 0; col < rowColData.length; col++) {
                        
                        // Insert a cell at the end of the row
                        var newCell = newRow.insertCell();
                        newCell.setAttribute("id", row+"-"+col)
                        data.push(rowColData[col]) //
                        newCell.innerHTML = rowColData[col];
                        
                    }
                    var newCellForJobs = newRow.insertCell();
                    newCellForJobs.setAttribute("id", row+"-"+col)

                    var inputElement= document.createElement("input");
                    inputElement.type="text";
                    newCellForJobs.appendChild(inputElement);
                    
                    var newCellForButton = newRow.insertCell();
                    newCellForButton.innerHTML += `<button onClick='generateEmailBody(${row})'>Generate</button>`;
                    // var newCellForSend = newRow.insertCell();
                    // newCellForSend.innerHTML += `<button onClick='send(${row})'>Copy</button>`;

                    //var newCellForCopy = newRow.insertCell();
                    //newCellForCopy.innerHTML += `<button onClick='copyContent()'>Copy</button>`;


                    //newCellForButton.setAttribute("onClick",`generateEmailBody(this.id)`)
                    //var newCellForCopy = newRow.insertCell();
                    //newCellForCopy.innerHTML += `<button onClick='copyContent()'>Send</button>`;
                    //newCellForCopy.setAttribute("onClick",`copyContent()`)

                    // var newCellEnd = newRow.insertCell();
                    // newCellEnd.innerHTML += `<button onClick='generateEmailBody(e)'>Send</button>`;
                    
                    //newRow.setAttribute('onClick',`generateEmailBody(this.id)`,0)
              }
         };

    }else{
         alert("Please select a file.");
    }

}

function copyDivToClipboard() {
    var range = document.createRange();
    range.selectNode(document.getElementById("email-body"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
   }