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


//INCIDENT REPORT PART - ticket
// const tickets = document.querySelector('.tickets');
// const ticketList = document.querySelector('.ticket');



document.addEventListener('DOMContentLoaded', function() {
    const sideNav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sideNav, {edge: 'left'});

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



//render asset PC data
const renderAssetPC = (data, id) => {
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
                    <div class="assetPC-update buttonFloatStyle btn-floating orange waves-effect center" onClick=">
                        <i class="material-icons" data-id="${id}" id="update-PC">edit</i>
                    </div>
                    <div class="assetPC-delete buttonFloatStyle btn-floating red waves-effect center">
                        <i class="material-icons" data-id="${id}">delete_outline</i>
                    </div>
                </div>
                </div>
            </div>
        </div>
    `;
    assetPC.innerHTML += html; 
};

//remove assetPC from DOM
const removeAssetPC = (id) =>{
    const assetPCs = document.querySelector(`.assetPC[data-id=${id}]`);
    if(assetPCs != null){
        assetPCs.remove();
    };
};

//update assetPC data 
//what happen after update
const updateAssetPC = (dataPC, idPC) => {
    const PCData = document.querySelector(`.assetPC[data-id=${idPC}]`);

    if(idPC === PCData){
        if(PCData != null){
            const htmlUpdatePC = `
                <table id="PC-table-update" class="container" data-id="${idPC}">
                    <tr> <td>Asset Name  </td>  <td>${dataPC.assetName}     </td>   </tr>
                    <tr> <td>Manufacturer</td>  <td>${dataPC.manufacturer}  </td>   </tr>
                    <tr> <td>Brand       </td>  <td>${dataPC.brandName}     </td>   </tr>
                    <tr> <td>OS          </td>  <td>${dataPC.OS}            </td>   </tr>
                    <tr> <td>Processor   </td>  <td>${dataPC.Processor}     </td>   </tr>
                    <tr> <td>RAM         </td>  <td>${dataPC.RAM}           </td>   </tr>
                    <tr> <td>Storage     </td>  <td>${dataPC.Storage}       </td>   </tr>
                    <tr> <td>Location    </td>  <td>${dataPC.Location}      </td>   </tr>
                    <tr> <td>Status      </td>  <td>${dataPC.Status}        </td>   </tr>

                    <tr> <td><button class="input-field btn" type="submit">UPDATE</button></td></tr>
                </table>
            `;
            assetPC.innerHTML += htmlUpdatePC;
            
            // <ul class="collection assetPC" data-id="${idPC}">
            //     <li class="collection-item">Asset Name  : ${dataPC.assetName}    </li>
            //     <li class="collection-item">Manufacturer: ${dataPC.manufacturer} </li>
            //     <li class="collection-item">Brand       : ${dataPC.brandName}    </li>
            //     <li class="collection-item">OS          : ${dataPC.OS}           </li>
            //     <li class="collection-item">Processor   : ${dataPC.Processor}    </li>
            //     <li class="collection-item">RAM         : ${dataPC.RAM}          </li>
            //     <li class="collection-item">Storage     : ${dataPC.Storage}      </li>
            //     <li class="collection-item">Location    : ${dataPC.Location}     </li>
            //     <li class="collection-item">Status      : ${dataPC.Status}       </li>
            // </ul>

            // PCData.update(
            //     { assetName   : `${dataPC.assetName}`},
            //     { manufacturer: `${dataPC.manufacturer}`},
            //     { brandName   : `${dataPC.brandName}`},
            //     { OS          : `${dataPC.OS}`},
            //     { Processor   : `${dataPC.Processor}`},
            //     { RAM         : `${dataPC.RAM}`},
            //     { Storage     : `${dataPC.Storage}`},
            //     { Location    : `${dataPC.Location}`},
            //     { Status      : `${dataPC.Status}`}
            // );

        }
        else{
            console.log('Asset was not found in the database.');
        }

    }

    // if(PCData != null){
    //     const htmlUpdatePC = `
    //         <div class="collection assetPC" data-id="${idPC}">
    //             <a href="" class="collection-item"><span>Asset Name  : ${dataPC.assetName}    </span></a>
    //             <a href="" class="collection-item"><span>Manufacturer: ${dataPC.manufacturer} </span></a>
    //             <a href="" class="collection-item"><span>Brand       : ${dataPC.brandName}    </span></a>
    //             <a href="" class="collection-item"><span>OS          : ${dataPC.OS}           </span></a>
    //             <a href="" class="collection-item"><span>Processor   : ${dataPC.Processor}    </span></a>
    //             <a href="" class="collection-item"><span>RAM         : ${dataPC.RAM}          </span></a>
    //             <a href="" class="collection-item"><span>Storage     : ${dataPC.Storage}      </span></a>
    //             <a href="" class="collection-item"><span>Location    : ${dataPC.Location}     </span></a>
    //             <a href="" class="collection-item"><span>Status      : ${dataPC.Status}       </span></a>
    //         </div>
    //     `;
    //     PCData.update(
    //         { assetName   : `${dataPC.assetName}`},
    //         { manufacturer: `${dataPC.manufacturer}`},
    //         { brandName   : `${dataPC.brandName}`},
    //         { OS          : `${dataPC.OS}`},
    //         { Processor   : `${dataPC.Processor}`},
    //         { RAM         : `${dataPC.RAM}`},
    //         { Storage     : `${dataPC.Storage}`},
    //         { Location    : `${dataPC.Location}`},
    //         { Status: 'Good'}
    //     );
    //     assetPC.innerHTML += htmlUpdatePC;
    // };
};







//render asset Keyboard data
const renderAssetKB = (data, id) => {
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
                        <div class="assetKB-status col s12" style="text-align: center; color: cadetblue;">Status: ${data.KBStatus}</div>
                    </div>
                </div>
                <div class="assetKB-delete-update center">
                    <div class="assetKB-update buttonFloatStyle btn-floating orange waves-effect center">
                        <i class="material-icons" data-id="${id}">edit</i>
                    </div>
                    <div class="assetKB-delete buttonFloatStyle btn-floating red waves-effect center">
                        <i class="material-icons" data-id="${id}">delete_outline</i>
                    </div>
                </div>
            </div>
        </div>
    `;
    assetKB.innerHTML += html2; 
};
//remove assetKB from DOM
const removeAssetKB = (id2) =>{
    const assetKBs = document.querySelector(`.assetKB[data-id=${id2}]`);
    if(assetKBs != null){
        assetKBs.remove();
    };
};









//render asset Mouse data
const renderAssetMS = (data, id) => {
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
                        <div class="assetMS-status col s12" style="text-align: center; color: cadetblue;">Status: ${data.MSStatus}</div>
                    </div>
                </div>
                <div class="assetMS-delete-update center">
                    <div class="assetMS-update buttonFloatStyle btn-floating orange waves-effect center">
                        <i class="material-icons" data-id="${id}">edit</i>
                    </div>
                    <div class="assetMS-delete buttonFloatStyle btn-floating red waves-effect center">
                        <i class="material-icons" data-id="${id}">delete_outline</i>
                    </div>
                </div>
            </div>
        </div>
    `;
    assetMS.innerHTML += html3; 
};
//remove assetMS from DOM
const removeAssetMS = (id3) =>{
    const assetMSs = document.querySelector(`.assetMS[data-id=${id3}]`);
    if(assetMSs != null){
        assetMSs.remove();
    };
};




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



//DISPLAY TICKET 
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


//default
// const renderReportPage = (data) => {
//     if(ReportPageList){
//         if(data.length){
//             let htmlReport = '';

//             data.forEach(doc =>{
//               const dataAssigned = doc.data();

//               const headerReport =`
//                 <th>Asset Name</th>
//                 <th>Asset Type</th>
//                 <th>Manufacturer</th>
//                 <th>Brand</th>
//                 <th>RAM</th>
//                 <th>Processor</th>
//                 <th>OS</th>
//                 <th>Storage</th>
//                 <th>Location</th>
//                 <th>Status</th>
//               `;
      
//               const dataReportPC = `
//                     <tr>
//                         <td>${dataAssigned.assetName}</td>
//                         <td>PC</td>
//                         <td>${dataAssigned.manufacturer}</td>
//                         <td>${dataAssigned.brandName}</td>
//                         <td>${dataAssigned.RAM}</td>
//                         <td>${dataAssigned.Processor}</td>
//                         <td>${dataAssigned.OS}</td>
//                         <td>${dataAssigned.Storage}</td>
//                         <td>${dataAssigned.Location}</td>
//                         <td>${dataAssigned.Status}</td>
//                     </tr>
//               `;
//               const dataReportKB = `
//                     <tr>
//                         <td>${dataAssigned.KBassetName}</td>
//                         <td>Keyboard</td>
//                         <td>${dataAssigned.KBmanufacturer}</td>
//                         <td>${dataAssigned.KBbrandName}</td>
//                         <td>-</td>
//                         <td>-</td>
//                         <td>-</td>
//                         <td>-</td>
//                         <td>${dataAssigned.KBLocation}</td>
//                         <td>${dataAssigned.KBStatus}</td>
//                     </tr>
//               `;
//               const dataReportMS = `
//                     <tr>
//                         <td>${dataAssigned.MSassetName}</td>
//                         <td>Mouse</td>
//                         <td>${dataAssigned.MSmanufacturer}</td>
//                         <td>${dataAssigned.MSbrandName}</td>
//                         <td>-</td>
//                         <td>-</td>
//                         <td>-</td>
//                         <td>-</td>
//                         <td>${dataAssigned.MSLocation}</td>
//                         <td>${dataAssigned.MSStatus}</td>
//                     </tr>
//               `;
//               htmlReport += headerReport + dataReportPC + dataReportKB + dataReportMS;
//             });
//             ReportPageList.innerHTML = htmlReport;        

//           }else{
//             ReportPageList.innerHTML = '<h5 class="center-align">Not available</h5>'
//           }   
//     }
// };