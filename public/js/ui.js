<<<<<<< Updated upstream
//ASSET MANAGEMENT PART - for add, delete asset
const assetPC = document.querySelector('.assetPC');
const assetKB = document.querySelector('.assetKB');
const assetMS = document.querySelector('.assetMS');

//ASSET MANAGEMENT PART - for displaying asset
const assetPCList = document.querySelector('.displayPC');
const assetKBList = document.querySelector('.displayKB');
const assetMSList = document.querySelector('.displayMS');

//ASSET MANAGEMENT PART - report page
const ReportPageList = document.querySelector('.allAssetPC');
const ReportPageList2 = document.querySelector('.allAssetKB');
const ReportPageList3 = document.querySelector('.allAssetMS');



document.addEventListener('DOMContentLoaded', function() {
    const sideNav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sideNav, {edge: 'left'});
    
    //dropdown nav
    var dropdownNav = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdownNav, 
        {coverTrigger: false},
        {inDuration: 300},
        {outDuration: 225},
        {constraintWidth:false},
        {hover: true},          // Activate on hover
        {belowOrigin: true },   // Displays dropdown below the button
        {gutter: 0},            //spacing from edge
        {alignment: 'right'},
    );

    //updated when syncing dengan code miras
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
    
    // add ticket
    const forms = document.querySelectorAll('.ticket-form');
    M.Sidenav.init(forms, {edge: 'right'});

});

// INCIDENT REPORT PART - ticket
const tickets = document.querySelector('.tickets');

    // render ticket data
    const renderTicket = (data, id) => {
        if (tickets){
        const htmlTicket = `
        <div class="card-panel ticket white row" data-id="${id}">
            <div class="row card-panel">        
            <div class="ticket-details center-align">
                <div class="ticket-title"></div>
                <div class="ticket-title">[ ${data.type} ] ${data.category}</div>
                <div class="ticket-desc">Description: ${data.description}</div>
                <div class="ticket-desc">Location: ${data.location}</div>
                <div class="ticket-desc">Date: 1 Jan 2021</div>
                <div class="ticket-desc">Ticket ID: ${id} </div>
                <div class="ticket-desc col s12" style="margin: 10px; padding: 10px;text-align: center; color: cadetblue; background-color: #B0C4DE; font-weight: bold">Status: Pending </div>
            </div>
            <div class=" center">
                <div class="ticket-delete btn-floating red waves-effect center !important">
                    <i class="material-icons" data-id="${id}">delete_outline</i>
                </div>
                <div class="ticket-update btn-floating yellow waves-effect center !important" >
                    <i class="material-icons modal-trigger" id="editBtn" data-id="${id}" data-target="modal-editTicket">edit</i>
                </div>
            </div>
            </div>
        </div>
        `; 
        tickets.innerHTML += htmlTicket;
        }

    };
// <img src="/public/img/broken-pc.png" alt="ticket thumb">
{/* <div class="card-panel ticket white row" data-id="${id}">
                
<div class="ticket-details">
    <div class="ticket-title"></div>
    <div class="ticket-title">[ ${data.type} ] ${data.category}</div>
    <div class="ticket-desc">Ticket ID: ${id} </div>
    <div class="ticket-desc">Description: ${data.description}</div>
    <div class="ticket-desc">Location: ${data.location}</div>
    
</div>
<div class="ticket-delete btn-floating red waves-effect right !important">
    <i class="material-icons" data-id="${id}">delete_outline</i>
</div>
<div class="ticket-update btn-floating yellow waves-effect right !important" >
    <i class="material-icons modal-trigger" id="editBtn" data-id="${id}" data-target="modal-editTicket">edit</i>
</div>
</div> */}

  // remove ticket from DOM
  const removeTicket = (id) => {
    const ticket = document.querySelector( `.ticket[data-id=${id}]`);
    if(ticket != null){
        ticket.remove();
    }
  }

  //update assetPC data: what happen after update
    const updateTicket = () => {
        // if (tickets){
        //     const htmlTicket = `
        //     <div class="card-panel ticket white row" data-id="${id}">
        //             <img src="/public/img/broken-pc.png" alt="ticket thumb">
        //             <div class="ticket-details">
        //                 <div class="ticket-title">${id}</div>
        //                 <div class="ticket-title">${data.category}</div>
        //                 <div class="ticket-desc">${data.description}</div>
        //                 <div class="ticket-desc">${data.location}</div>
        //                 <div class="ticket-desc">${data.type}</div>
        //             </div>
        //             <div class="ticket-delete btn-floating red waves-effect right !important">
        //                 <i class="material-icons" data-id="${id}">delete_outline</i>
        //             </div>
        //             <div class="ticket-update btn-floating yellow waves-effect right !important" >
        //                 <i class="material-icons modal-trigger" id="editBtn" data-id="${id}" data-target="modal-editTicket">edit</i>
        //             </div>
        //     </div>
        //     `; 
        //     tickets.innerHTML += htmlTicket;
        //     }
        // setTimeout("location.reload(true);", 100);
        //close modal
        const modalTick = document.querySelector('#modal-editTicket');
        M.Modal.getInstance(modalTick).close();

    }




// $(document).ready(function(){
//     // nav menu
//     $('.sidenav').sidenav();
    
//     //dropdown for nav
//     $(".dropdown-trigger").dropdown({
//         coverTrigger: false,

//         inDuration: 300,
//         outDuration: 225,
//         constraintWidth:false,
//         hover: true, // Activate on hover
//         belowOrigin: true, // Displays dropdown below the button
//         gutter: 0,  //spacing from edge
//         alignment: 'right'
//     });

//     //dropdown in addAssetPC
//     $('select').formSelect();
// });

// function showHideDiv(){
//     var checkOthers = document.getElementById("checkOthers");
//     var newElementID = document.getElementById("newElementID");

//     newElementID.style.display = checkOthers.checked ? "block" : "none";
// }
// function createNewElement(){
//     var checkOthers = document.getElementById("checkOthers");
    
//     if(!checkOthers.checked){
//         document.getElementById('parent').remove();
//     }
//     else{
//         var txtNewInputBox = document.createElement('div');
//         txtNewInputBox.innerHTML = " <input placeholder='Put any description' id='parent' name='parent' type='text' class='validate'/>"
//         document.getElementById("newElementID").appendChild(txtNewInputBox);   
//     }
// }

//function for successfully added form: addAssetFormPC.html
var ALERT_TITLE = "STATUS";
var ALERT_BUTTON_TEXT = "OK";
if(document.getElementById) {
    window.alert = function(txt) {
        createCustomAlert(txt);
    }
}
function createCustomAlert(txt) {
    d = document;

    if(d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
    alertObj.style.visiblity="visible";

    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode(ALERT_TITLE));

    msg = alertObj.appendChild(d.createElement("p"));
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
    btn.href = "#";
    btn.focus();
    btn.onclick = function() { 
        removeCustomAlert();
        setTimeout("location.reload(true);", 100);
        // return false; 
    }

    alertObj.style.display = "block";

}
function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}
  
 
// ASSET MANAGEMENT PART
  
//render asset PC data
const renderAssetPC = (data, id) => {
    if(assetPC){
        const html = `
        <div class="card-panel assetPC white row" data-id="${id}">
            <div class="row card-panel">
                <div class="assetPC-details">
                    <div class="row">           
                        <div class="assetPC-name col s6">Asset Name: ${data.assetName}</div>
                        <div class="assetPC-manufacturer col s6">Manufacturer: ${data.manufacturer}</div>
                    </div>
                    <div class="row">
                        <div class="assetPC-brand col s6">Brand: ${data.brandName}</div>
                        <div class="assetPC-OS col s6">OS: ${data.OS}</div>
                    </div>
                    <div class="row">
                        <div class="assetPC-processor col s6">Processor: ${data.Processor}</div>
                        <div class="assetPC-ram col s6">RAM: ${data.RAM}</div>
                    </div>
                    <div class="row">
                        <div class="assetPC-storage col s6">Storage: ${data.Storage}</div>
                        <div class="assetPC-location col s6">Location: ${data.Location}</div>
                    </div>
                    <div class="row">
                        <div class="assetPC-status col s12" style="margin: 10px; padding: 10px;text-align: center; color: cadetblue; background-color: #B0C4DE; font-weight: bold">Status: ${data.Status}</div>
                    </div>
                </div>
                <div class="assetPC-delete-update center">
                    <div class="assetPC-update buttonFloatStyle btn-floating orange waves-effect center !important">
                        <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-editPC">edit</i>
                    </div>
                    <div class="assetPC-delete buttonFloatStyle btn-floating red waves-effect center !important">
                        <i class="material-icons" data-id="${id}">delete_outline</i>
                    </div>
                </div>
                </div>
            </div>
        </div>
    `;
    assetPC.innerHTML += html; 
    }    
};
//remove assetPC from DOM
const removeAssetPC = (id) =>{
    const assetPCs = document.querySelector(`.assetPC[data-id=${id}]`);
    if(assetPCs != null){
        assetPCs.remove();
    };
};
//update assetPC data: what happen after update
const updateAssetPC = () => {
    //close modal
    const modalPC = document.querySelector('#modal-editPC');
    M.Modal.getInstance(modalPC).close();
}







//render asset Keyboard data
const renderAssetKB = (data, id) => {
    if(assetKB) {
        const html2 = `
        <div class="card-panel assetKB white row" data-id="${id}">
            <div class="row card-panel">
                <div class="assetKB-details">
                    <div class="row">           
                        <div class="assetKB-name col s6">Asset Name: ${data.KBassetName}</div>
                        <div class="assetKB-manufacturer col s6">Manufacturer: ${data.KBmanufacturer}</div>
                    </div>
                    <div class="row">
                        <div class="assetKB-brand col s6">Brand: ${data.KBbrandName}</div>
                        <div class="assetKB-location col s6">Location: ${data.KBLocation}</div>
                    </div>
                    <div class="row">
                        <div class="assetKB-status col s12" style="margin: 10px; padding: 10px; text-align: center; color: cadetblue; background-color: #B0C4DE; font-weight: bold">Status: ${data.KBStatus}</div>
                    </div>
                </div>
                <div class="assetKB-delete-update center">
                    <div class="assetKB-update buttonFloatStyle btn-floating orange waves-effect center !important">
                        <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-editKB">edit</i>
                    </div>
                    <div class="assetKB-delete buttonFloatStyle btn-floating red waves-effect center !important">
                        <i class="material-icons" data-id="${id}">delete_outline</i>
                    </div>
                </div>
            </div>
        </div>
    `;
    assetKB.innerHTML += html2; 
    }
};
//remove assetKB from DOM
const removeAssetKB = (id2) =>{
    const assetKBs = document.querySelector(`.assetKB[data-id=${id2}]`);
    if(assetKBs != null){
        assetKBs.remove();
    };
};
//update assetKB data: what happen after update
const updateAssetKB = () => {
    //close modal
    const modalKB = document.querySelector('#modal-editKB');
    M.Modal.getInstance(modalKB).close();
}


//render asset Mouse data
const renderAssetMS = (data, id) => {
    if(assetMS){
        const html3 = `
        <div class="card-panel assetMS white row" data-id="${id}">
            <div class="row card-panel">
                <div class="assetMS-details">
                    <div class="row">           
                        <div class="assetMS-name col s6">Asset Name: ${data.MSassetName}</div>
                        <div class="assetMS-manufacturer col s6">Manufacturer: ${data.MSmanufacturer}</div>
                    </div>
                    <div class="row">
                        <div class="assetMS-brand col s6">Brand: ${data.MSbrandName}</div>
                        <div class="assetMS-location col s6">Location: ${data.MSLocation}</div>
                    </div>
                    <div class="row">
                        <div class="assetMS-status col s12" style="margin: 10px; padding: 10px; text-align: center; color: cadetblue; background-color: #B0C4DE; font-weight: bold">Status: ${data.MSStatus}</div>
                    </div>
                </div>
                <div class="assetMS-delete-update center">
                    <div class="assetMS-update buttonFloatStyle btn-floating orange waves-effect center !important">
                        <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-editMS">edit</i>
                    </div>
                    <div class="assetMS-delete buttonFloatStyle btn-floating red waves-effect center !important">
                        <i class="material-icons" data-id="${id}">delete_outline</i>
                    </div>
                </div>
            </div>
        </div>
    `;
    assetMS.innerHTML += html3; 
    }
};
//remove assetMS from DOM
const removeAssetMS = (id3) =>{
    const assetMSs = document.querySelector(`.assetMS[data-id=${id3}]`);
    if(assetMSs != null){
        assetMSs.remove();
    };
};
//update assetMS data: what happen after update
const updateAssetMS = () => {
    //close modal
    const modalMS = document.querySelector('#modal-editMS');
    M.Modal.getInstance(modalMS).close();
}




//FOR DISPLAY ALL ASSET BY CATEGORY IN viewAssetByType.html
//setup view asset by category: PC
const setupViewAssetByTypePC = (data) => {
    if(assetPCList){
      if(data.length){
        let html11 = '';
  
        data.forEach(doc =>{
          const assetPC = doc.data();
  
          const liPC = `
            <li>
              <div class="collapsible-header grey lighten-4">${assetPC.assetName} : ${assetPC.Status} (${assetPC.Location})</div>
              <div class="collapsible-body white"> 
                <table>
                    <tr> <td style="font-weight: bold;">Asset Name  </td> <td>:</td>  <td>${assetPC.assetName}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Manufacturer</td> <td>:</td>  <td>${assetPC.manufacturer} </td> </tr>
                    <tr> <td style="font-weight: bold;">Brand Name  </td> <td>:</td>  <td>${assetPC.brandName}    </td> </tr>
                    <tr> <td style="font-weight: bold;">OS          </td> <td>:</td>  <td>${assetPC.OS}           </td> </tr>
                    <tr> <td style="font-weight: bold;">Processor   </td> <td>:</td>  <td>${assetPC.Processor}    </td> </tr>
                    <tr> <td style="font-weight: bold;">RAM         </td> <td>:</td>  <td>${assetPC.RAM}          </td> </tr>
                    <tr> <td style="font-weight: bold;">Storage     </td> <td>:</td>  <td>${assetPC.Storage}      </td> </tr>
                    <tr> <td style="font-weight: bold;">Location    </td> <td>:</td>  <td>${assetPC.Location}     </td> </tr>
                    <tr style="background-color: #B0C4DE"> <td style="font-weight: bold;">Status      </td> <td>:</td>  <td>${assetPC.Status}       </td> </tr>
                </table>      
              </div>
            </li>
          `;
          html11 += liPC;
        });
        assetPCList.innerHTML = html11;        
      }else{
        assetPCList.innerHTML = '<h5 class="center-align">Not available</h5>'
      }
    }
};

//setup view asset by category: KB
const setupViewAssetByTypeKB = (data) => {
    if(assetKBList){
      if(data.length){
        let html12 = '';
  
        data.forEach(doc =>{
          const assetKB = doc.data();
  
          const liKB = `
            <li>
              <div class="collapsible-header grey lighten-4">${assetKB.KBassetName} : ${assetKB.KBStatus} (${assetKB.KBLocation})</div>
              <div class="collapsible-body white"> 
                <table>
                    <tr> <td style="font-weight: bold;">Asset Name  </td> <td>:</td> <td>${assetKB.KBassetName}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Manufacturer</td> <td>:</td> <td>${assetKB.KBmanufacturer} </td> </tr>
                    <tr> <td style="font-weight: bold;">Brand Name  </td> <td>:</td> <td>${assetKB.KBbrandName}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Location    </td> <td>:</td> <td>${assetKB.KBLocation}     </td> </tr>
                    <tr style="background-color: #B0C4DE"> <td style="font-weight: bold;">Status      </td> <td>:</td> <td>${assetKB.KBStatus}       </td> </tr>
                </table>
              </div>
            </li>
          `;
          html12 += liKB;
        });
        assetKBList.innerHTML = html12;        
      }else{
        assetKBList.innerHTML = '<h5 class="center-align">Not available</h5>'
      }
    }
};

//setup view asset by category: MS
const setupViewAssetByTypeMS = (data) => {
    if(assetMSList){
      if(data.length){
        let html13 = '';
  
        data.forEach(doc =>{
          const assetMS = doc.data();
  
          const liMS = `
            <li>
              <div class="collapsible-header grey lighten-4">${assetMS.MSassetName} : ${assetMS.MSStatus} (${assetMS.MSLocation})</div>
              <div class="collapsible-body white">
                <table>
                    <tr> <td style="font-weight: bold;">Asset Name  </td> <td>:</td> <td>${assetMS.MSassetName}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Manufacturer</td> <td>:</td> <td>${assetMS.MSmanufacturer} </td> </tr>
                    <tr> <td style="font-weight: bold;">Brand Name  </td> <td>:</td> <td>${assetMS.MSbrandName}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Location    </td> <td>:</td> <td>${assetMS.MSLocation}     </td> </tr>
                    <tr style="background-color: #B0C4DE"> <td style="font-weight: bold;">Status      </td> <td>:</td> <td>${assetMS.MSStatus}       </td> </tr>
                </table>                 
              </div>
            </li>
          `;
          html13 += liMS;
        });
        assetMSList.innerHTML = html13;        
      }else{
        assetMSList.innerHTML = '<h5 class="center-align">Not available</h5>'
      }
    }
};




//FOR REPORT
//get all the data (PC,Keyboard & Mouse) in one page

//PC part
const renderReportPagePC = (data) => {
    if(ReportPageList){
        if(data.length){
            let htmlReport = '';

            data.forEach(doc =>{
              const dataAssigned = doc.data();

              const dataReportPC = `
                    <tr>
                        <td>${dataAssigned.assetName}</td>
                        <td>PC</td>
                        <td>${dataAssigned.manufacturer}</td>
                        <td>${dataAssigned.brandName}</td>
                        <td>${dataAssigned.RAM}</td>
                        <td>${dataAssigned.Processor}</td>
                        <td>${dataAssigned.OS}</td>
                        <td>${dataAssigned.Storage}</td>
                        <td>${dataAssigned.Location}</td>
                        <td>${dataAssigned.Status}</td>
                    </tr>
                    <br>
              `;
              htmlReport += dataReportPC;

            });
            ReportPageList.innerHTML = htmlReport;        

          }else{
            ReportPageList.innerHTML = '<h5 class="center-align">Not available</h5>'
          }   
    }
};


//Keyboard part
const renderReportPageKB = (data) => {
    if(ReportPageList2){
        if(data.length){
            let htmlReport2 = '';

            data.forEach(doc =>{
              const dataAssigned2 = doc.data();
              const dataReportKB = `
                    <tr>
                        <td>${dataAssigned2.KBassetName}</td>
                        <td>Keyboard</td>
                        <td>${dataAssigned2.KBmanufacturer}</td>
                        <td>${dataAssigned2.KBbrandName}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>${dataAssigned2.KBLocation}</td>
                        <td>${dataAssigned2.KBStatus}</td>
                    </tr>
              `;
              htmlReport2 += dataReportKB;
            });
            ReportPageList2.innerHTML = htmlReport2;        

          }else{
            ReportPageList2.innerHTML = '<h5 class="center-align">Not available</h5>'
          }   
    }
};

//Mouse part
const renderReportPageMS = (data) => {
    if(ReportPageList3){
        if(data.length){
            let htmlReport3 = '';

            data.forEach(doc =>{
              const dataAssigned3 = doc.data();
              
              const dataReportMS = `
                    <tr>
                        <td>${dataAssigned3.MSassetName}</td>
                        <td>Mouse</td>
                        <td>${dataAssigned3.MSmanufacturer}</td>
                        <td>${dataAssigned3.MSbrandName}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>${dataAssigned3.MSLocation}</td>
                        <td>${dataAssigned3.MSStatus}</td>
                    </tr>
              `;
              htmlReport3 += dataReportMS;
            });
            ReportPageList3.innerHTML = htmlReport3;        

          }else{
            ReportPageList3.innerHTML = '<h5 class="center-align">Not available</h5>'
          }   
    }
};
=======
//ASSET MANAGEMENT PART - for add, delete asset
const assetPC = document.querySelector('.assetPC');
const assetKB = document.querySelector('.assetKB');
const assetMS = document.querySelector('.assetMS');

//ASSET MANAGEMENT PART - for displaying asset
const assetPCList = document.querySelector('.displayPC');
const assetKBList = document.querySelector('.displayKB');
const assetMSList = document.querySelector('.displayMS');

//ASSET MANAGEMENT PART - report page
const ReportPageList = document.querySelector('.allAssetPC');
const ReportPageList2 = document.querySelector('.allAssetKB');
const ReportPageList3 = document.querySelector('.allAssetMS');



document.addEventListener('DOMContentLoaded', function() {
    const sideNav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sideNav, {edge: 'left'});

    //dropdown nav
    var dropdownNav = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdownNav, 
        {coverTrigger: false},
        {inDuration: 300},
        {outDuration: 225},
        {constraintWidth:false},
        {hover: true},          // Activate on hover
        {belowOrigin: true },   // Displays dropdown below the button
        {gutter: 0},            //spacing from edge
        {alignment: 'right'},
    );


    //updated when syncing dengan code miras
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
    
    // add ticket
    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, {edge: 'right'});
});

// $(document).ready(function(){
//     // nav menu
//     $('.sidenav').sidenav();

//     //dropdown for nav
//     $(".dropdown-trigger").dropdown({
//         coverTrigger: false,

//         inDuration: 300,
//         outDuration: 225,
//         constraintWidth:false,
//         hover: true, // Activate on hover
//         belowOrigin: true, // Displays dropdown below the button
//         gutter: 0,  //spacing from edge
//         alignment: 'right'
//     });

//     //dropdown in addAssetPC
//     $('select').formSelect();
// });

// function showHideDiv(){
//     var checkOthers = document.getElementById("checkOthers");
//     var newElementID = document.getElementById("newElementID");

//     newElementID.style.display = checkOthers.checked ? "block" : "none";
// }

// function createNewElement(){
//     var checkOthers = document.getElementById("checkOthers");
    
//     if(!checkOthers.checked){
//         document.getElementById('parent').remove();
//     }
//     else{
//         var txtNewInputBox = document.createElement('div');
//         txtNewInputBox.innerHTML = " <input placeholder='Put any description' id='parent' name='parent' type='text' class='validate'/>"
//         document.getElementById("newElementID").appendChild(txtNewInputBox);   
//     }
// }



//function for successfully added form: addAssetFormPC.html

var ALERT_TITLE = "STATUS";
var ALERT_BUTTON_TEXT = "OK";
if(document.getElementById) {
    window.alert = function(txt) {
        createCustomAlert(txt);
    }
}
function createCustomAlert(txt) {
    d = document;

    if(d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth)/2 + "px";
    alertObj.style.visiblity="visible";

    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode(ALERT_TITLE));

    msg = alertObj.appendChild(d.createElement("p"));
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
    btn.href = "#";
    btn.focus();
    btn.onclick = function() { 
        removeCustomAlert();
        setTimeout("location.reload(true);", 100);
        // return false; 
    }

    alertObj.style.display = "block";

}
function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}



//render asset PC data
const renderAssetPC = (data, id) => {
    if(assetPC){
        const html = `
        <div class="card-panel assetPC white row" data-id="${id}">
            <div class="row card-panel">
                <div class="assetPC-details">
                    <div class="row">           
                        <div class="assetPC-name col s6">Asset Name: ${data.assetName}</div>
                        <div class="assetPC-manufacturer col s6">Manufacturer: ${data.manufacturer}</div>
                    </div>
                    <div class="row">
                        <div class="assetPC-brand col s6">Brand: ${data.brandName}</div>
                        <div class="assetPC-OS col s6">OS: ${data.OS}</div>
                    </div>
                    <div class="row">
                        <div class="assetPC-processor col s6">Processor: ${data.Processor}</div>
                        <div class="assetPC-ram col s6">RAM: ${data.RAM}</div>
                    </div>
                    <div class="row">
                        <div class="assetPC-storage col s6">Storage: ${data.Storage}</div>
                        <div class="assetPC-location col s6">Location: ${data.Location}</div>
                    </div>
                    <div class="row">
                        <div class="assetPC-status col s12" style="text-align: center; color: cadetblue; background-color: #B0C4DE; font-weight: bold">Status: ${data.Status}</div>
                    </div>
                </div>
                <div class="assetPC-delete-update center">
                    <div class="assetPC-update buttonFloatStyle btn-floating orange waves-effect center !important">
                        <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-editPC">edit</i>
                    </div>
                    <div class="assetPC-delete buttonFloatStyle btn-floating red waves-effect center !important">
                        <i class="material-icons" data-id="${id}">delete_outline</i>
                    </div>
                </div>
                </div>
            </div>
        </div>
    `;
        assetPC.innerHTML += html; 
    }
};
//remove assetPC from DOM
const removeAssetPC = (id) =>{
    const assetPCs = document.querySelector(`.assetPC[data-id=${id}]`);
    if(assetPCs != null){
        assetPCs.remove();
    };
};
//update assetPC data: what happen after update
const updateAssetPC = () => {
    //close modal
    const modalPC = document.querySelector('#modal-editPC');
    M.Modal.getInstance(modalPC).close();
}


//render asset Keyboard data
const renderAssetKB = (data, id) => {
    if(assetKB){
        const html2 = `
        <div class="card-panel assetKB white row" data-id="${id}">
            <div class="row card-panel">
                <div class="assetKB-details">
                    <div class="row">           
                        <div class="assetKB-name col s6">Asset Name: ${data.KBassetName}</div>
                        <div class="assetKB-manufacturer col s6">Manufacturer: ${data.KBmanufacturer}</div>
                    </div>
                    <div class="row">
                        <div class="assetKB-brand col s6">Brand: ${data.KBbrandName}</div>
                        <div class="assetKB-location col s6">Location: ${data.KBLocation}</div>
                    </div>
                    <div class="row">
                        <div class="assetKB-status col s12" style="text-align: center; color: cadetblue; background-color: #B0C4DE; font-weight: bold">Status: ${data.KBStatus}</div>
                    </div>
                </div>
                <div class="assetKB-delete-update center">
                    <div class="assetKB-update buttonFloatStyle btn-floating orange waves-effect center !important">
                        <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-editKB">edit</i>
                    </div>
                    <div class="assetKB-delete buttonFloatStyle btn-floating red waves-effect center">
                        <i class="material-icons" data-id="${id}">delete_outline</i>
                    </div>
                </div>
            </div>
        </div>
    `;
        assetKB.innerHTML += html2; 
    }
};
//remove assetKB from DOM
const removeAssetKB = (id2) =>{
    const assetKBs = document.querySelector(`.assetKB[data-id=${id2}]`);
    if(assetKBs != null){
        assetKBs.remove();
    };
};
//update assetKB data: what happen after update
const updateAssetKB = () => {
    //close modal
    const modalKB = document.querySelector('#modal-editKB');
    M.Modal.getInstance(modalKB).close();
}


//render asset Mouse data
const renderAssetMS = (data, id) => {
    if(assetMS){
        const html3 = `
        <div class="card-panel assetMS white row" data-id="${id}">
            <div class="row card-panel">
                <div class="assetMS-details">
                    <div class="row">           
                        <div class="assetMS-name col s6">Asset Name: ${data.MSassetName}</div>
                        <div class="assetMS-manufacturer col s6">Manufacturer: ${data.MSmanufacturer}</div>
                    </div>
                    <div class="row">
                        <div class="assetMS-brand col s6">Brand: ${data.MSbrandName}</div>
                        <div class="assetMS-location col s6">Location: ${data.MSLocation}</div>
                    </div>
                    <div class="row">
                        <div class="assetMS-status col s12" style="text-align: center; color: cadetblue; background-color: #B0C4DE; font-weight: bold">Status: ${data.MSStatus}</div>
                    </div>
                </div>
                <div class="assetMS-delete-update center">
                    <div class="assetMS-update buttonFloatStyle btn-floating orange waves-effect center !important">
                        <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-editMS">edit</i>
                    </div>
                    <div class="assetMS-delete buttonFloatStyle btn-floating red waves-effect center">
                        <i class="material-icons" data-id="${id}">delete_outline</i>
                    </div>
                </div>
            </div>
        </div>
    `;
        assetMS.innerHTML += html3; 
    }
};
//remove assetMS from DOM
const removeAssetMS = (id3) =>{
    const assetMSs = document.querySelector(`.assetMS[data-id=${id3}]`);
    if(assetMSs != null){
        assetMSs.remove();
    };
};
//update assetMS data: what happen after update
const updateAssetMS = () => {
    //close modal
    const modalMS = document.querySelector('#modal-editMS');
    M.Modal.getInstance(modalMS).close();
}




//FOR DISPLAY ALL ASSET BY CATEGORY IN viewAssetByType.html
//setup view asset by category: PC
const setupViewAssetByTypePC = (data) => {
    if(assetPCList){
      if(data.length){
        let html11 = '';
  
        data.forEach(doc =>{
          const assetPC = doc.data();
  
          const liPC = `
            <li>
              <div class="collapsible-header grey lighten-4">${assetPC.assetName} : ${assetPC.Status} (${assetPC.Location})</div>
              <div class="collapsible-body white"> 
                <table>
                    <tr> <td style="font-weight: bold;">Asset Name  </td> <td>:</td>  <td>${assetPC.assetName}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Manufacturer</td> <td>:</td>  <td>${assetPC.manufacturer} </td> </tr>
                    <tr> <td style="font-weight: bold;">Brand Name  </td> <td>:</td>  <td>${assetPC.brandName}    </td> </tr>
                    <tr> <td style="font-weight: bold;">OS          </td> <td>:</td>  <td>${assetPC.OS}           </td> </tr>
                    <tr> <td style="font-weight: bold;">Processor   </td> <td>:</td>  <td>${assetPC.Processor}    </td> </tr>
                    <tr> <td style="font-weight: bold;">RAM         </td> <td>:</td>  <td>${assetPC.RAM}          </td> </tr>
                    <tr> <td style="font-weight: bold;">Storage     </td> <td>:</td>  <td>${assetPC.Storage}      </td> </tr>
                    <tr> <td style="font-weight: bold;">Location    </td> <td>:</td>  <td>${assetPC.Location}     </td> </tr>
                    <tr style="background-color: #B0C4DE"> <td style="font-weight: bold;">Status      </td> <td>:</td>  <td>${assetPC.Status}       </td> </tr>
                    
                </table>      
              </div>
            </li>
          `;
          html11 += liPC;
        });
        assetPCList.innerHTML = html11;        
      }else{
        assetPCList.innerHTML = '<h5 class="center-align">Not available</h5>'
      }
    }
};

//setup view asset by category: KB
const setupViewAssetByTypeKB = (data) => {
    if(assetKBList){
      if(data.length){
        let html12 = '';
  
        data.forEach(doc =>{
          const assetKB = doc.data();
  
          const liKB = `
            <li>
              <div class="collapsible-header grey lighten-4">${assetKB.KBassetName} : ${assetKB.KBStatus} (${assetKB.KBLocation})</div>
              <div class="collapsible-body white"> 
                <table>
                    <tr> <td style="font-weight: bold;">Asset Name  </td> <td>:</td> <td>${assetKB.KBassetName}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Manufacturer</td> <td>:</td> <td>${assetKB.KBmanufacturer} </td> </tr>
                    <tr> <td style="font-weight: bold;">Brand Name  </td> <td>:</td> <td>${assetKB.KBbrandName}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Location    </td> <td>:</td> <td>${assetKB.KBLocation}     </td> </tr>
                    <tr style="background-color: #B0C4DE"> <td style="font-weight: bold;">Status      </td> <td>:</td> <td>${assetKB.KBStatus}       </td> </tr>
                </table>
              </div>
            </li>
          `;
          html12 += liKB;
        });
        assetKBList.innerHTML = html12;        
      }else{
        assetKBList.innerHTML = '<h5 class="center-align">Not available</h5>'
      }
    }
};

//setup view asset by category: MS
const setupViewAssetByTypeMS = (data) => {
    if(assetMSList){
      if(data.length){
        let html13 = '';
  
        data.forEach(doc =>{
          const assetMS = doc.data();
  
          const liMS = `
            <li>
              <div class="collapsible-header grey lighten-4">${assetMS.MSassetName} : ${assetMS.MSStatus} (${assetMS.MSLocation})</div>
              <div class="collapsible-body white">
                <table>
                    <tr> <td style="font-weight: bold;">Asset Name  </td> <td>:</td> <td>${assetMS.MSassetName}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Manufacturer</td> <td>:</td> <td>${assetMS.MSmanufacturer} </td> </tr>
                    <tr> <td style="font-weight: bold;">Brand Name  </td> <td>:</td> <td>${assetMS.MSbrandName}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Location    </td> <td>:</td> <td>${assetMS.MSLocation}     </td> </tr>
                    <tr style="background-color: #B0C4DE"> <td style="font-weight: bold;">Status      </td> <td>:</td> <td>${assetMS.MSStatus}       </td> </tr>
                </table>                 
              </div>
            </li>
          `;
          html13 += liMS;
        });
        assetMSList.innerHTML = html13;        
      }else{
        assetMSList.innerHTML = '<h5 class="center-align">Not available</h5>'
      }
    }
};




//FOR REPORT
//get all the data (PC,Keyboard & Mouse) in one page

//PC part
const renderReportPagePC = (data) => {
    if(ReportPageList){
        if(data.length){
            let htmlReport = '';

            data.forEach(doc =>{
              const dataAssigned = doc.data();

              const dataReportPC = `
                    <tr>
                        <td>${dataAssigned.assetName}</td>
                        <td>PC</td>
                        <td>${dataAssigned.manufacturer}</td>
                        <td>${dataAssigned.brandName}</td>
                        <td>${dataAssigned.RAM}</td>
                        <td>${dataAssigned.Processor}</td>
                        <td>${dataAssigned.OS}</td>
                        <td>${dataAssigned.Storage}</td>
                        <td>${dataAssigned.Location}</td>
                        <td>${dataAssigned.Status}</td>
                    </tr>
              `;
              htmlReport += dataReportPC;

            });
            ReportPageList.innerHTML = htmlReport;        

          }else{
            ReportPageList.innerHTML = '<h5 class="center-align">Not available</h5>'
          }   
    }
};
//Keyboard part
const renderReportPageKB = (data) => {
    if(ReportPageList2){
        if(data.length){
            let htmlReport2 = '';

            data.forEach(doc =>{
              const dataAssigned2 = doc.data();
              const dataReportKB = `
                    <tr>
                        <td>${dataAssigned2.KBassetName}</td>
                        <td>Keyboard</td>
                        <td>${dataAssigned2.KBmanufacturer}</td>
                        <td>${dataAssigned2.KBbrandName}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>${dataAssigned2.KBLocation}</td>
                        <td>${dataAssigned2.KBStatus}</td>
                    </tr>
              `;
              htmlReport2 += dataReportKB;
            });
            ReportPageList2.innerHTML = htmlReport2;        

          }else{
            ReportPageList2.innerHTML = '<h5 class="center-align">Not available</h5>'
          }   
    }
};
//Mouse part
const renderReportPageMS = (data) => {
    if(ReportPageList3){
        if(data.length){
            let htmlReport3 = '';

            data.forEach(doc =>{
              const dataAssigned3 = doc.data();
              
              const dataReportMS = `
                    <tr>
                        <td>${dataAssigned3.MSassetName}</td>
                        <td>Mouse</td>
                        <td>${dataAssigned3.MSmanufacturer}</td>
                        <td>${dataAssigned3.MSbrandName}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>${dataAssigned3.MSLocation}</td>
                        <td>${dataAssigned3.MSStatus}</td>
                    </tr>
              `;
              htmlReport3 += dataReportMS;
            });
            ReportPageList3.innerHTML = htmlReport3;        

          }else{
            ReportPageList3.innerHTML = '<h5 class="center-align">Not available</h5>'
          }   
    }
};




// INCIDENT REPORT PART - ticket
const tickets = document.querySelector('.tickets');

    // render ticket data
    const renderTicket = (data, id) => {
        if (tickets){
        const htmlTicket = `
        <div class="card-panel ticket white row" data-id="${id}">
                <img src="/public/img/broken-pc.png" alt="ticket thumb">
                <div class="ticket-details">
                    <div class="ticket-title">${id}</div>
                    <div class="ticket-title">${data.category}</div>
                    <div class="ticket-desc">${data.description}</div>
                    <div class="ticket-desc">${data.location}</div>
                    <div class="ticket-desc">${data.type}</div>
                </div>
                <div class="ticket-delete btn-floating red waves-effect right !important">
                    <i class="material-icons" data-id="${id}">delete_outline</i>
                </div>
                <div class="ticket-update btn-floating yellow waves-effect right !important" >
                    <i class="material-icons modal-trigger" id="editBtn" data-id="${id}" data-target="modal-editTicket">edit</i>
                </div>
        </div>
        `; 
        tickets.innerHTML += htmlTicket;
        }

    };

    // remove ticket from DOM
    const removeTicket = (id) => {
        const ticket = document.querySelector( `.ticket[data-id=${id}]`);
        if(ticket != null){
            ticket.remove();
        }
    }

    //update assetPC data: what happen after update
    const updateTicket = () => {
        // if (tickets){
        //     const htmlTicket = `
        //     <div class="card-panel ticket white row" data-id="${id}">
        //             <img src="/public/img/broken-pc.png" alt="ticket thumb">
        //             <div class="ticket-details">
        //                 <div class="ticket-title">${id}</div>
        //                 <div class="ticket-title">${data.category}</div>
        //                 <div class="ticket-desc">${data.description}</div>
        //                 <div class="ticket-desc">${data.location}</div>
        //                 <div class="ticket-desc">${data.type}</div>
        //             </div>
        //             <div class="ticket-delete btn-floating red waves-effect right !important">
        //                 <i class="material-icons" data-id="${id}">delete_outline</i>
        //             </div>
        //             <div class="ticket-update btn-floating yellow waves-effect right !important" >
        //                 <i class="material-icons modal-trigger" id="editBtn" data-id="${id}" data-target="modal-editTicket">edit</i>
        //             </div>
        //     </div>
        //     `; 
        //     tickets.innerHTML += htmlTicket;
        //     }
        // setTimeout("location.reload(true);", 100);
        //close modal
        const modalTick = document.querySelector('#modal-editTicket');
        M.Modal.getInstance(modalTick).close();

    }
>>>>>>> Stashed changes
