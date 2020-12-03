const assetPC = document.querySelector('.assetPC');
const assetKB = document.querySelector('.assetKB');
const assetMS = document.querySelector('.assetMS');

document.addEventListener('DOMContentLoaded', function() {
    const sideNav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sideNav, {edge: 'left'});
});

$(document).ready(function(){
    // nav menu
    $('.sidenav').sidenav();

    //dropdown in addAssetPC
    $('select').formSelect();
});


//untuk make sure new input field bila tekan 'Others' radio button tak keluar kat 'Good' or 'Faulty'
function showHideDiv(){
    var checkOthers = document.getElementById("checkOthers");
    var newElementID = document.getElementById("newElementID");

    newElementID.style.display = checkOthers.checked ? "block" : "none";
}

//untuk letak new input field bil user tekan radio button 'Others'
function createNewElement(){
    var checkOthers = document.getElementById("checkOthers");
    
    if(!checkOthers.checked){
        document.getElementById('parent').remove();
    }
    else{
        var txtNewInputBox = document.createElement('div');
        txtNewInputBox.innerHTML = " <input placeholder='Put any description' id='parent' name='parent' type='text' class='validate'/>"
        document.getElementById("newElementID").appendChild(txtNewInputBox);   
    }
}



//DATABASE RELATED

//ASSET: PC
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
                        <div class="assetPC-status col s12" style="text-align: center; color: cadetblue;">Status: ${data.Status}</div>
                    </div>
                </div>
                <div class="assetPC-delete-update center">
                    <div class="assetPC-update buttonFloatStyle btn-floating orange waves-effect center">
                        <i class="material-icons" data-id="${id}">edit</i>
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
                    <tr>
                        <td>Asset Name</td>
                        <td>${dataPC.assetName}</td>
                    </tr>
                    <tr>
                        <td>Manufacturer</td>
                        <td>${dataPC.manufacturer}</td>
                    </tr>
                    <tr>
                        <td>Brand</td>
                        <td>${dataPC.brandName}</td>
                    </tr>
                    <tr>
                        <td>OS</td>
                        <td>${dataPC.OS}</td>
                    </tr>
                    <tr>
                        <td>Processor</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>RAM</td>
                        <td>${dataPC.Processor}</td>
                    </tr>
                    <tr>
                        <td>Storage</td>
                        <td>${dataPC.Storage} </td>
                    </tr>
                    <tr>
                        <td>Location</td>
                        <td>${dataPC.Location}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>${dataPC.Status} </td>
                    </tr>
                    <tr>
                        <td><button class="input-field btn" type="submit">UPDATE</button></td>
                    </tr>

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








//ASSET: KEYBOARD
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






//ASSET: MOUSE
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
