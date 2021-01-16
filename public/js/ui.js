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

// function for back button
function goBack() {
    window.history.back();
}




//render asset PC data
const renderAssetPC = (data, id) => {
    if(assetPC){
        const html = `
            <div class="card-panel assetPC white row" data-id="${id}">
                <div class="assetPC-details">
                    <div class="row" style="text-align: left;">           
                        <div class="assetPC-name col s6"><b>Asset Name:</b> ${data.assetName}</div>
                        <div class="assetPC-manufacturer col s6"><b>Manufacturer:</b> ${data.manufacturer}</div>
                    </div>
                    <div class="row" style="text-align: left;">
                        <div class="assetPC-brand col s6"><b>Brand:</b> ${data.brandName}</div>
                        <div class="assetPC-OS col s6"><b>OS:</b> ${data.OS}</div>
                    </div>
                    <div class="row" style="text-align: left;">
                        <div class="assetPC-processor col s6"><b>Processor:</b> ${data.Processor}</div>
                        <div class="assetPC-ram col s6"><b>RAM:</b> ${data.RAM}</div>
                    </div>
                    <div class="row" style="text-align: left;">
                        <div class="assetPC-storage col s6"><b>Storage:</b> ${data.Storage}</div>
                        <div class="assetPC-location col s6"><b>Level:</b> ${data.Location}</div>
                    </div>
                </div>
                <div class="assetPC-delete-update inline">
                    <div class="row">
                        <div class="col s7 push left">
                            <div class="assetPC-status col s12" style="text-align: center; color: white; background-color: #023047; font-weight: bold">Status: ${data.Status}</div>
                        </div>
                        <div class="col s3 right">
                            <div class="assetPC-delete buttonFloatStyle btn-floating red waves-effect right !important" style="margin-left: 5%;">
                                <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-deletePC">delete_outline</i>
                            </div>    
                            <div class="assetPC-update buttonFloatStyle btn-floating orange waves-effect right !important" style="margin-left: 5%;">
                                <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-editPC">edit</i>
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

    //close modal
    const modalPC = document.querySelector('#modal-deletePC');
    M.Modal.getInstance(modalPC).close();
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
                <div class="assetKB-details">
                    <div class="row" style="text-align: left;">           
                        <div class="assetKB-name col s6"><b>Asset Name:</b> ${data.KBassetName}</div>
                        <div class="assetKB-manufacturer col s6"><b>Manufacturer:</b> ${data.KBmanufacturer}</div>
                    </div>
                    <div class="row" style="text-align: left;">
                        <div class="assetKB-brand col s6"><b>Brand:</b> ${data.KBbrandName}</div>
                        <div class="assetKB-location col s6"><b>Location:</b> ${data.KBLocation}</div>
                    </div>
                </div>
                <div class="assetKB-delete-update inline">
                    <div class="row">
                        <div class="col s7 push left">
                            <div class="assetKB-status col s12" style="text-align: center; color: white; background-color: #023047; font-weight: bold">Status: ${data.KBStatus}</div>
                        </div>
                        <div class="col s3 right">
                            <div class="assetKB-delete buttonFloatStyle btn-floating red waves-effect right !important" style="margin-left: 5%;">
                                <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-deleteKB">delete_outline</i>
                            </div>
                            <div class="assetKB-update buttonFloatStyle btn-floating orange waves-effect right !important" style="margin-left: 5%;">
                                <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-editKB">edit</i>
                            </div>
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
    //close modal
    const modalKB = document.querySelector('#modal-deleteKB');
    M.Modal.getInstance(modalKB).close();
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
                <div class="assetMS-details">
                    <div class="row" style="text-align: left;">           
                        <div class="assetMS-name col s6"><b>Asset Name:</b> ${data.MSassetName}</div>
                        <div class="assetMS-manufacturer col s6"><b>Manufacturer:</b> ${data.MSmanufacturer}</div>
                    </div>
                    <div class="row" style="text-align: left;">
                        <div class="assetMS-brand col s6"><b>Brand:</b> ${data.MSbrandName}</div>
                        <div class="assetMS-location col s6"><b>Location:</b> ${data.MSLocation}</div>
                    </div>
                    
                </div>
                <div class="assetMS-delete-update inline">
                    <div class="row">
                        <div class="col s7 push left">
                            <div class="assetMS-status col s12" style="text-align: center; color: white; background-color: #023047; font-weight: bold">Status: ${data.MSStatus}</div>
                        </div>
                        <div class="col s3 right">
                            <div class="assetMS-delete buttonFloatStyle btn-floating red waves-effect right !important" style="margin-left: 5%;">
                                <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-deleteMS">delete_outline</i>
                            </div>
                            <div class="assetMS-update buttonFloatStyle btn-floating orange waves-effect right !important" style="margin-left: 5%;">
                                <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-editMS">edit</i>
                            </div>
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
    //close modal
    const modalMS = document.querySelector('#modal-deleteMS');
    M.Modal.getInstance(modalMS).close();
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

        data.forEach((doc) =>{
          const assetPC = doc.data();
          const id11 = doc.id;
          
          const liPC = `
            <li data-id="${id11}">
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
                <div class="row">
                    <div class="col" style="float:right">
                        <div class="assetPC-delete buttonFloatStyle btn-floating red waves-effect right !important" style="margin-left: 5%;">
                            <i class="material-icons modal-trigger" data-id="${id11}" data-target="modal-deletePC">delete_outline</i>
                        </div>
                    </div>
                    <div class="col" style="float:right">
                        <div class="assetPC-update buttonFloatStyle btn-floating orange waves-effect right !important" style="margin-left: 5%;">
                            <i class="material-icons modal-trigger" data-id="${id11}" data-target="modal-editPC">edit</i>
                        </div>
                    </div>
                </div>        
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
          const id12 = doc.id;
  
          const liKB = `
            <li data-id="${id12}">
              <div class="collapsible-header grey lighten-4">${assetKB.KBassetName} : ${assetKB.KBStatus} (${assetKB.KBLocation})</div>
              <div class="collapsible-body white"> 
                <table>
                    <tr> <td style="font-weight: bold;">Asset Name  </td> <td>:</td> <td>${assetKB.KBassetName}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Manufacturer</td> <td>:</td> <td>${assetKB.KBmanufacturer} </td> </tr>
                    <tr> <td style="font-weight: bold;">Brand Name  </td> <td>:</td> <td>${assetKB.KBbrandName}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Location    </td> <td>:</td> <td>${assetKB.KBLocation}     </td> </tr>
                    <tr style="background-color: #B0C4DE"> <td style="font-weight: bold;">Status      </td> <td>:</td> <td>${assetKB.KBStatus}       </td> </tr>
                </table>
                <div class="row">
                    <div class="col" style="float:right">
                        <div class="assetKB-delete buttonFloatStyle btn-floating red waves-effect right !important" style="margin-left: 5%;">
                            <i class="material-icons modal-trigger" data-id="${id12}" data-target="modal-deleteKB">delete_outline</i>
                        </div>
                    </div>
                    <div class="col" style="float:right">
                        <div class="assetKB-update buttonFloatStyle btn-floating orange waves-effect right !important" style="margin-left: 5%;">
                            <i class="material-icons modal-trigger" data-id="${id12}" data-target="modal-editKB">edit</i>
                        </div>
                    </div>
                </div> 
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
          const id13 = doc.id;
  
          const liMS = `
            <li  data-id="${id13}">
              <div class="collapsible-header grey lighten-4">${assetMS.MSassetName} : ${assetMS.MSStatus} (${assetMS.MSLocation})</div>
              <div class="collapsible-body white">
                <table>
                    <tr> <td style="font-weight: bold;">Asset Name  </td> <td>:</td> <td>${assetMS.MSassetName}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Manufacturer</td> <td>:</td> <td>${assetMS.MSmanufacturer} </td> </tr>
                    <tr> <td style="font-weight: bold;">Brand Name  </td> <td>:</td> <td>${assetMS.MSbrandName}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Location    </td> <td>:</td> <td>${assetMS.MSLocation}     </td> </tr>
                    <tr style="background-color: #B0C4DE"> <td style="font-weight: bold;">Status      </td> <td>:</td> <td>${assetMS.MSStatus}       </td> </tr>
                </table> 
                <div class="row">
                    <div class="col" style="float:right">
                        <div class="assetMS-delete buttonFloatStyle btn-floating red waves-effect right !important" style="margin-left: 5%;">
                            <i class="material-icons modal-trigger" data-id="${id13}" data-target="modal-deleteMS">delete_outline</i>
                        </div>
                    </div>
                    <div class="col" style="float:right">
                        <div class="assetMS-update buttonFloatStyle btn-floating orange waves-effect right !important" style="margin-left: 5%;">
                            <i class="material-icons modal-trigger" data-id="${id13}" data-target="modal-editMS">edit</i>
                        </div>
                    </div>
                </div>                 
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

// /////////////////////////////TICKETS//////////////////////////////////////

// const setupTickets = (data) => {
//     if (ticketList) { //remove "Cannot set property 'innerHTML' of null" error
//       if (data.length) {
//         let html = '';
//         //forEach is to iterate
//         data.forEach(doc => {
//           const ticket = doc.data();
//           // console.log(ticket);
//           const li = `
//             <li>
//               <div class="collapsible-header grey lighten-4">${ticket.type} : ${ticket.category}</div>
//               <div class="collapsible-body white"> ${ticket.description} <br> Location: ${ticket.location}</div>
//             </li>
//           `;
//           html += li;
//         });
//         ticketList.innerHTML = html;
//       } else {
//         ticketList.innerHTML = '<h5 class="center-align">Login to view ticket</h5>';
//       }
//     }  
//   };


//setup view ticket collapsible - PENDING
const ticketList = document.querySelector('.tickets'); // DOM elements
const setupTicketPending = (data) => {
    if(ticketList){
      if(data.length){
        let html = '';

        data.forEach((doc) =>{
          const ticket = doc.data();
          const id = doc.id;
          
          const li = `
            <li data-id="${id}">
              <div class="collapsible-header grey lighten-4">${ticket.date} : ${ticket.type} (${ticket.category})</div>
              <div class="collapsible-body white">
                <table>
                    <tr> <td style="font-weight: bold;">Ticket ID   </td> <td>:</td>  <td>${id}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Category    </td> <td>:</td>  <td>${ticket.category} </td> </tr>
                    <tr> <td style="font-weight: bold;">Description </td> <td>:</td>  <td>${ticket.description}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Location    </td> <td>:</td>  <td>${ticket.location}           </td> </tr>
                    <tr style="background-color: #B0C4DE"> <td style="font-weight: bold;">Status      </td> <td>:</td>  <td>${ticket.status}       </td> </tr>
                    <tr> <td style="font-weight: bold;">PIC         </td> <td>:</td>  <td>${ticket.PIC}          </td> </tr>
                    <tr> <td style="font-weight: bold;">Remarks     </td> <td>:</td>  <td>${ticket.remarks}      </td> </tr>
                </table>
                <div class="row">
                    <div class="col" style="float:right">
                        <div class="ticket-delete buttonFloatStyle btn-floating red waves-effect right !important" style="margin-left: 5%;">
                            <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-deleteTicket">delete_outline</i>
                        </div>
                    </div>
                    <div class="col" style="float:right">
                        <div class="pending-update buttonFloatStyle btn-floating orange waves-effect right !important" style="margin-left: 5%;">
                            <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-assignTech">assignment_ind</i>
                        </div>
                    </div>
                </div>        
              </div>
            </li>
          `;
          html += li;
        });
        ticketList.innerHTML = html;        
      }else{
        ticketList.innerHTML = '<h5 class="center-align">Not available</h5>'
      }
    }
};



// INCIDENT REPORT PART - ticket 
// const tickets = document.querySelector('.tickets');

//     // render ticket data - ticket PENDING
//     const renderTicket = (data, id) => {
//         if (tickets){
//             // store.ref('users/' + id + '/ticket.jpg').getDownloadURL().then(imgUrl => {
//             //     img.src = imgUrl;
//             // })
//             const htmlTicket = `
//                 <div class="card-panel ticket white row" data-id="${id}">
//                     <div class="row flow-text">
                    
//                         <div class="ticket-details flow-text col">
//                         <table>
//                             <tr> <td> Ticket id </td> <td> : </td> <td><div class="ticket-title">${id}</div> </td>
//                             <tr> <td> Ticket created </td> <td> : </td> <td><div class="ticket-desc">${data.date}</div> </td>
//                             <tr> <td> Category </td> <td> : </td> <td><div class="ticket-title">${data.category}</div> </td>
//                             <tr> <td> Description </td> <td> : </td> <td><div class="ticket-desc">${data.description}</div> </td>
//                             <tr> <td> Location </td> <td> : </td> <td><div class="ticket-desc">${data.location}</div> </td>
//                             <tr> <td> Ticket Type </td> <td> : </td> <td><div class="ticket-desc">${data.type}</div> </td>
//                             <tr id="statusTick" style="background-color: #B0C4DE" > <td> Status </td> <td> : </td> <td><div class="ticket-desc">${data.status}</div> </td>
//                             <tr> <td> PIC </td> <td> : </td> <td><div class="ticket-desc">${data.PIC}</div> </td>
//                             <tr> <td> Remarks </td> <td> : </td> <td><div class="ticket-desc">${data.remarks}</div> </td>
//                         </table>    
//                         </div>
//                     </div>
//                     <div class="row">
//                         <div class="ticket-delete btn-floating red waves-effect right !important">
//                             <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-deleteTicket">delete_outline</i>
//                         </div>
//                         <div class="ticket-update btn-floating orange waves-effect right !important" >
//                             <i class="material-icons modal-trigger" id="editBtn" data-id="${id}" data-target="modal-assignTech">assignment_ind</i>
//                         </div>
//                     </div>
//                 </div>
//             `; 
//             tickets.innerHTML += htmlTicket;
//         }
//     };

// ticket ASSIGNED


// const ticketAssignedList = document.querySelector('.ticketAssigned'); // DOM elements
// const setupTicketAssigned = (data) => {
//     if(ticketAssignedList){
//       if(data.length){
//         let html = '';

//         data.forEach((doc) =>{
//           const ticket = doc.data();
//           const id = doc.id;
          
//           const li = `
//             <li data-id="${id}">
//               <div class="collapsible-header grey lighten-4">${ticket.date} : ${ticket.type} (${ticket.PIC})</div>
//               <div class="collapsible-body white">
//                 <table>
//                     <tr> <td style="font-weight: bold;">Ticket ID   </td> <td>:</td>  <td>${id}    </td> </tr>
//                     <tr> <td style="font-weight: bold;">Category    </td> <td>:</td>  <td>${ticket.category} </td> </tr>
//                     <tr> <td style="font-weight: bold;">Description </td> <td>:</td>  <td>${ticket.description}    </td> </tr>
//                     <tr> <td style="font-weight: bold;">Location    </td> <td>:</td>  <td>${ticket.location}           </td> </tr>
//                     <tr style="background-color: #B0C4DE"> <td style="font-weight: bold;">Status      </td> <td>:</td>  <td>${ticket.status}       </td> </tr>
//                     <tr> <td style="font-weight: bold;">PIC         </td> <td>:</td>  <td>${ticket.PIC}          </td> </tr>
//                     <tr> <td style="font-weight: bold;">Remarks     </td> <td>:</td>  <td>${ticket.remarks}      </td> </tr>
//                 </table>
//                 <div class="row">
//                     <div class="col" style="float:right">
//                         <div class="assetPC-delete buttonFloatStyle btn-floating red waves-effect right !important" style="margin-left: 5%;">
//                             <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-deleteTicket">delete_outline</i>
//                         </div>
//                     </div>
//                     <div class="col" style="float:right">
//                         <div class="assetPC-update buttonFloatStyle btn-floating orange waves-effect right !important" style="margin-left: 5%;">
//                             <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-editTicket">edit</i>
//                         </div>
//                     </div>
//                 </div>        
//               </div>
//             </li>
//           `;
//           html += li;
//         });
//         ticketAssignedList.innerHTML = html;        
//       }else{
//         ticketAssignedList.innerHTML = '<h5 class="center-align">Not available</h5>'
//       }
//     }
// };

    // render ticket data - ticket ASSIGNED
    // const ticketAssigned = document.querySelector('.ticketAssigned');
    // const renderTicketAssigned = (data, id) => {
    //     if (ticketAssigned){
    //         // store.ref('users/' + id + '/ticket.jpg').getDownloadURL().then(imgUrl => {
    //         //     img.src = imgUrl;
    //         // })
            
    //         const htmlTicket = `
    //             <div class="card-panel ticket white row" data-id="${id}">
    //                 <div class="row flow-text">
                    
    //                     <div class="ticket-details flow-text col">
    //                     <table>
    //                         <tr> <td> Ticket id </td> <td> : </td> <td><div class="ticket-title">${id}</div> </td>
    //                         <tr> <td> Ticket created </td> <td> : </td> <td><div class="ticket-desc">${data.date}</div> </td>
    //                         <tr> <td> Category </td> <td> : </td> <td><div class="ticket-title">${data.category}</div> </td>
    //                         <tr> <td> Description </td> <td> : </td> <td><div class="ticket-desc">${data.description}</div> </td>
    //                         <tr> <td> Location </td> <td> : </td> <td><div class="ticket-desc">${data.location}</div> </td>
    //                         <tr> <td> Ticket Type </td> <td> : </td> <td><div class="ticket-desc">${data.type}</div> </td>
    //                         <tr id="statusTick" style="background-color: #B0C4DE" > <td> Status </td> <td> : </td> <td><div class="ticket-desc">${data.status}</div> </td>
    //                         <tr> <td> PIC </td> <td> : </td> <td><div class="ticket-desc">${data.PIC}</div> </td>
    //                         <tr> <td> Remarks </td> <td> : </td> <td><div class="ticket-desc">${data.remarks}</div> </td>
    //                     </table>    
    //                     </div>
    //                 </div>
    //                 <div class="row">
    //                     <div class="ticket-delete btn-floating red waves-effect right !important">
    //                         <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-deleteTicket">delete_outline</i>
    //                     </div>
    //                     <div class="ticket-update btn-floating orange waves-effect right !important" >
    //                         <i class="material-icons modal-trigger" id="editBtn" data-id="${id}" data-target="modal-editTicket">edit</i>
    //                     </div>
    //                 </div>
    //             </div>
    //         `; 
    //         ticketAssigned.innerHTML += htmlTicket;
    //     }
    // };

    //setup view ticket collapsible : IN PROGRESS


const ticketProgressList = document.querySelector('.ticketInProgress'); // DOM elements
const setupTicketProgressing = (data) => {
    if(ticketProgressList){
      if(data.length){
        let html = '';

        data.forEach((doc) =>{
          const ticket = doc.data();
          const id = doc.id;
          
          const li = `
            <li data-id="${id}">
              <div class="collapsible-header grey lighten-4">${ticket.date} : ${ticket.type} (${ticket.status}) - ${ticket.PIC} </div>
              <div class="collapsible-body white">
                <table>
                    <tr> <td style="font-weight: bold;">Ticket ID   </td> <td>:</td>  <td>${id}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Category    </td> <td>:</td>  <td>${ticket.category} </td> </tr>
                    <tr> <td style="font-weight: bold;">Description </td> <td>:</td>  <td>${ticket.description}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Location    </td> <td>:</td>  <td>${ticket.location}           </td> </tr>
                    <tr style="background-color: #B0C4DE"> <td style="font-weight: bold;">Status      </td> <td>:</td>  <td>${ticket.status}       </td> </tr>
                    <tr> <td style="font-weight: bold;">PIC         </td> <td>:</td>  <td>${ticket.PIC}          </td> </tr>
                    <tr> <td style="font-weight: bold;">Remarks     </td> <td>:</td>  <td>${ticket.remarks}      </td> </tr>
                </table>
                <div class="row" style="padding-top: 15px;">
                    <div class="col" style="float:right">
                        <div class="see-details buttonFloatStyle btn-floating blue waves-effect right !important" style="margin-left: 5%;">
                            <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-detailProgress">format_list_bulleted</i>
                        </div>
                    </div>
                    <div class="col" style="float:right">
                        <div class="updateProgress btn modal-trigger orange waves-effect !important" data-id="${id}" data-target="modal-updateProgress">UPDATE PROGRESS
                            <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-updateProgress">add_to_photos</i>
                        </div>
                    </div>
                </div>        
              </div>
            </li>
          `;
          html += li;
        });
        ticketProgressList.innerHTML = html;        
      }else{
        ticketProgressList.innerHTML = '<h5 class="center-align">Not available</h5>'
      }
    }
};

// ticket lecturer
const lecturerTickets = document.querySelector('.tickInProgress'); // DOM elements
const setupTicketLecturer = (data) => {
    if(lecturerTickets){
      if(data.length){
        let html = '';

        data.forEach((doc) =>{
          const ticket = doc.data();
          const id = doc.id;
          
          const li = `
            <li data-id="${id}">
              <div class="collapsible-header grey lighten-4" style="font-weight: bold;">${ticket.date} : ${ticket.category} [${ticket.type}] - ${ticket.status} </div>
              <div class="collapsible-body white">
                <table>
                    <tr> <td style="font-weight: bold;">Ticket ID   </td> <td>:</td>  <td>${id}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Category    </td> <td>:</td>  <td>${ticket.category} </td> </tr>
                    <tr> <td style="font-weight: bold;">Description </td> <td>:</td>  <td>${ticket.description}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Location    </td> <td>:</td>  <td>${ticket.location}           </td> </tr>
                    <tr style="background-color: #B0C4DE"> <td style="font-weight: bold;">Status      </td> <td>:</td>  <td>${ticket.status}       </td> </tr>
                    <tr> <td style="font-weight: bold;">PIC         </td> <td>:</td>  <td>${ticket.PIC}          </td> </tr>
                </table>
                <div class="row" style="padding-top: 15px;">
                    <div class="col" style="float:right">
                        <div class="deleteLecturerTick buttonFloatStyle btn-floating red waves-effect right !important" style="margin-left: 5%;">
                            <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-deleteTicket">delete_outline</i>
                        </div>
                    </div>
                    <div class="col" style="float:right">
                        <div class="edit-tickets buttonFloatStyle btn-floating orange waves-effect right !important" style="margin-left: 5%;">
                            <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-editTicket" id="editBtn">edit</i>
                        </div>
                    </div>
                    <div class="col" style="float:right">
                        <div class="see-details buttonFloatStyle btn-floating blue waves-effect right !important" style="margin-left: 5%;">
                            <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-detailProgress">format_list_bulleted</i>
                        </div>
                    </div>
                </div>        
              </div>
            </li>
          `;
          html += li;
        });
        lecturerTickets.innerHTML = html;        
      }else{
        lecturerTickets.innerHTML = '<h5 class="center-align">Not available</h5>'
      }
    }
};

    
    // render ticket data - ticket IN PROGRESS
    // const ticketInProgress = document.querySelector('.ticketInProgress');
    // const renderTicketProgressing = (data, id) => {
    //     if (ticketInProgress){
    //         // store.ref('users/' + id + '/ticket.jpg').getDownloadURL().then(imgUrl => {
    //         //     img.src = imgUrl;
    //         // })
    //         const htmlTicket = `
    //             <div class="card-panel ticket white row" data-id="${id}">
    //                 <div class="row flow-text">
                    
    //                     <div class="ticket-details flow-text col">
    //                     <table>
    //                         <tr> <td> <mark> ${data.type} </mark> </td> <td> : </td> <td><div class="ticket-title">${id}</div> </td>
                           
    //                         <tr> <td> Ticket created </td> <td> : </td> <td><div class="ticket-desc">${data.date}</div> </td>
    //                         <tr> <td> Category </td> <td> : </td> <td><div class="ticket-desc">${data.category}</div> </td>
    //                         <tr> <td> Description </td> <td> : </td> <td><div class="ticket-desc">${data.description}</div> </td>
    //                         <tr> <td> Location </td> <td> : </td> <td><div class="ticket-desc">${data.location}</div> </td>
    //                         <tr id="statusTick" style="background-color: #B0C4DE" > <td> Status </td> <td> : </td> <td><div class="ticket-desc">${data.status}</div> </td>
    //                         <tr> <td> PIC </td> <td> : </td> <td><div class="ticket-desc">${data.PIC}</div> </td>
    //                         <tr> <td> Remarks </td> <td> : </td> <td><div class="ticket-desc">${data.remarks}</div> </td>
    //                     </table>    
    //                     </div>
    //                 </div>
    //                 <div class="row">
    //                     <div class="ticket-delete btn-floating red waves-effect right !important">
    //                         <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-deleteTicket">delete_outline</i>
    //                     </div>
    //                     <div class="ticket-update btn-floating orange waves-effect right !important" >
    //                         <i class="material-icons modal-trigger" id="editBtn" data-id="${id}" data-target="modal-editTicket">edit</i>
    //                     </div>
    //                 </div>
    //             </div>
    //         `; 
    //         ticketInProgress.innerHTML += htmlTicket;
    //     }
    // };

//setup view ticket collapsible : CLOSED


const ticketClosedList = document.querySelector('.ticketClosed'); // DOM elements
const setupTicketClosed = (data) => {
    if(ticketClosedList){
      if(data.length){
        let html = '';

        data.forEach((doc) =>{
          const ticket = doc.data();
          const id = doc.id;
          
          const li = `
            <li data-id="${id}">
              <div class="collapsible-header grey lighten-4">${ticket.date} : ${ticket.type} (${ticket.PIC})</div>
              <div class="collapsible-body white">
                <table>
                    <tr> <td style="font-weight: bold;">Ticket ID   </td> <td>:</td>  <td>${id}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Category    </td> <td>:</td>  <td>${ticket.category} </td> </tr>
                    <tr> <td style="font-weight: bold;">Description </td> <td>:</td>  <td>${ticket.description}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Location    </td> <td>:</td>  <td>${ticket.location}           </td> </tr>
                    <tr style="background-color: #B0C4DE"> <td style="font-weight: bold;">Status      </td> <td>:</td>  <td>${ticket.status}       </td> </tr>
                    <tr> <td style="font-weight: bold;">PIC         </td> <td>:</td>  <td>${ticket.PIC}          </td> </tr>
                    <tr> <td style="font-weight: bold;">Remarks     </td> <td>:</td>  <td>${ticket.remarks}      </td> </tr>
                </table>
                <div class="row">
                    <div class="col" style="float:right">
                        <div class="see-details buttonFloatStyle btn-floating blue waves-effect right !important" style="margin-left: 5%;">
                            <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-detailProgress">format_list_bulleted</i>
                        </div>
                    </div>
                </div>        
              </div>
            </li>
          `;
          html += li;
        });
        ticketClosedList.innerHTML = html;        
      }else{
        ticketClosedList.innerHTML = '<h5 class="center-align">Not available</h5>'
      }
    }
};

    
    // render ticket data - ticket CLOSED
    const ticketClosed = document.querySelector('.ticketClosed');
    // const renderTicketClosed = (data, id) => {
    //     if (ticketClosed){
    //         // store.ref('users/' + id + '/ticket.jpg').getDownloadURL().then(imgUrl => {
    //         //     img.src = imgUrl;
    //         // })
    //         const htmlTicket = `
    //             <div class="card-panel ticket white row" data-id="${id}">
    //                 <div class="row flow-text">
                    
    //                     <div class="ticket-details flow-text col">
    //                     <table>
    //                         <tr> <td> Ticket id </td> <td> : </td> <td><div class="ticket-title">${id}</div> </td>
    //                         <tr> <td> Ticket Type </td> <td> : </td> <td><div class="ticket-desc">${data.type}</div> </td>
    //                         <tr> <td> Ticket created </td> <td> : </td> <td><div class="ticket-desc">${data.date}</div> </td>
    //                         <tr> <td> Category </td> <td> : </td> <td><div class="ticket-title">${data.category}</div> </td>
    //                         <tr> <td> Description </td> <td> : </td> <td><div class="ticket-desc">${data.description}</div> </td>
    //                         <tr> <td> Location </td> <td> : </td> <td><div class="ticket-desc">${data.location}</div> </td>
    //                         <tr id="statusTick" style="background-color: #B0C4DE" > <td> Status </td> <td> : </td> <td><div class="ticket-desc">${data.status}</div> </td>
    //                         <tr> <td> PIC </td> <td> : </td> <td><div class="ticket-desc">${data.PIC}</div> </td>
    //                         <tr> <td> Remarks </td> <td> : </td> <td><div class="ticket-desc">${data.remarks}</div> </td>
    //                     </table>    
    //                     </div>
    //                 </div>
    //                 <div class="row">
    //                     <div class="ticket-delete btn-floating red waves-effect right !important">
    //                         <i class="material-icons modal-trigger" data-id="${id}" data-target="modal-deleteTicket">delete_outline</i>
    //                     </div>
    //                     <div class="ticket-update btn-floating orange waves-effect right !important" >
    //                         <i class="material-icons modal-trigger" id="editBtn" data-id="${id}" data-target="modal-editTicket">edit</i>
    //                     </div>
    //                 </div>
    //             </div>
    //         `; 
    //         ticketClosed.innerHTML += htmlTicket;
    //     }
    // };



    // remove ticket from DOM
    
    //setup view ticket collapsible : CLOSED


const progressTicketList = document.querySelector('#detailedProgress'); // DOM elements
const setupProgressTicket = (data) => {
    console.log("testing data: " + data);
    if(progressTicketList){
      if(data.length){
        let html = '';

        data.forEach((doc) =>{
            console.log("rendering the list progress of the ticket")
          const progress = doc.data();
          const id = doc.id;
          
          const li = `
            <li class="card-panel" data-id="${id}">           
                <table>
                    <tr> <td style="font-weight: bold;">Progress ID     </td> <td>:</td>  <td>${id}    </td> </tr>
                    <tr> <td style="font-weight: bold;">Date            </td> <td>:</td>  <td>${progress.deadline}</td> </tr>
                    <tr> <td style="font-weight: bold;">Update info     </td> <td>:</td>  <td>${progress.updateInfo}    </td> </tr>
                </table>
            </li>
          `;
          html += li;
        });
        progressTicketList.innerHTML = html;        
      }else{
        progressTicketList.innerHTML = '<h5 class="center-align">Not available</h5>'
      }
    }
};
    
    const removeTicket = (id) => {
        const ticket = document.querySelector( `.ticket[data-id=${id}]`);
        if(ticket != null){
            ticket.remove();
        }
    }

    //update ticket data: what happen after update
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
        // const modalTick = document.querySelector('#modal-editTicket');
        // M.Modal.getInstance(modalTick).close();

    }
