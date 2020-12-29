//offline data
db.enablePersistence()
    .catch(err => {
        if(err.code == 'failed-precondition'){
            //probably multiple tabs open at once
            console.log('persistence failed');
        }
        else if(err.code == 'unimplemented'){
            //lack of browser support
            console.log('persistence is not available');
        }
});

// real-time listener for ticket
db.collection('ticket').onSnapshot(snapshot => {
    // console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        // console.log(change);
        // console.log(change,change.doc.data(), change.doc.id);
    //   console.log(change.type, change.doc.id, change.doc.data());
      if(change.type === 'added'){
        // add the document data to the web page
        renderTicket(change.doc.data(), change.doc.id);
      }
      if(change.type === 'removed'){
        // remove the document data from the web page
        removeTicket(change.doc.id);
      }
      if(change.type === 'modified'){      //update the ticket
        updateTicket(change.doc.data(), change.doc.id);
      }
    });
});

// add new tickets
const formTicket = document.querySelector('.add-ticket');
if(formTicket){
    formTicket.addEventListener('submit', evt => {
        evt.preventDefault();
    
        // construct object
        const ticket = {
            category: formTicket.category.value,
            description: formTicket.description.value, 
            location: formTicket.location.value, 
            type: formTicket.type.value, 
        };
    
        db.collection('ticket').add(ticket)
            .then(alert("Successfully add new ticket! Our technician will reach you out soon"))
            .catch(err => console.log(err));
        
            formTicket.category.value = '';
            formTicket.description.value = '';
            formTicket.location.value = '';
            formTicket.type.value = '';
    });  
}


// delete a ticket
const ticketContainer = document.querySelector('.tickets');
if(ticketContainer){
    ticketContainer.addEventListener('click', evt => {
        // console.log(evt);
        if(evt.target.textContent === "delete_outline"){
            const id = evt.target.getAttribute('data-id');
            db.collection('ticket').doc(id).delete();
        }
    });
}


// update ticket
// ticketContainer.addEventListener('click', evt => {
//     // console.log(evt);
//     if(evt.target.textContent === "edit"){
//         const id = evt.target.getAttribute('data-id');
//         db.collection('ticket').doc(id).delete();
//     }
// });









// ASSET MANAGEMENT PART

//setiap array ni untuk simpan all data from each collection
var data1 = [];     //for asset PC
var data2 = [];     //for asset KB
var data3 = [];     //for asset MS

//real-time listener FOR asset: PC
db.collection('asset').onSnapshot((snapshot) => {
    setupViewAssetByTypePC(snapshot.docs);      //called function in ui.js to display view Asset by category

    snapshot.docChanges().forEach((change) => {
        //console.log(change, change.doc.data(), change.doc.id);

        const doc = {...change.doc.data(), id: change.doc.id};

        if(change.type === 'added'){            //add the document data to the web page
            data1.push(doc);
            renderAssetPC(change.doc.data(), change.doc.id);
        };
        if(change.type === 'removed'){          //remove the document data to the web page
            removeAssetPC(change.doc.id);
        };
        if(change.type === 'modified'){         //update the document
            const index1 = data1.findIndex(item => item.id == doc.id);
            data1[index1] = doc;
            // updateAssetPC(data1, change.doc.id);
            // updateAssetPC(change.doc.data(), change.doc.id);
            updateAssetPC();
        }
    });
});

//real-time listener FOR asset: Keyboard
db.collection('assetKB').onSnapshot((snapshot) => {
    setupViewAssetByTypeKB(snapshot.docs);      //called function in ui.js to display view Asset by category
    // renderReportPage(snapshot.docs);            //for Report Page

    snapshot.docChanges().forEach((change) => {
        if(change.type === 'added'){            //add the document data to the web page
            renderAssetKB(change.doc.data(), change.doc.id);
        };
        if(change.type === 'removed'){          //remove the document data to the web page
            removeAssetKB(change.doc.id);
        };
    });
});

//real-time listener FOR asset: Mouse
db.collection('assetMS').onSnapshot((snapshot) => {
    setupViewAssetByTypeMS(snapshot.docs);      //called function in ui.js to display view Asset by category
    // renderReportPage(snapshot.docs);            //for Report Page

    snapshot.docChanges().forEach((change) => {
        if(change.type === 'added'){            //add the document data to the web page
            renderAssetMS(change.doc.data(), change.doc.id);
        };
        if(change.type === 'removed'){          //remove the document data to the web page
            removeAssetMS(change.doc.id);
        };
    });
});








//Add new asset: PC

//use if statement because there is error stated in console "cannot read property 'addEventListener' of null"
const form = document.querySelector('form');
if(form){
    form.addEventListener('submit', evt => {
        evt.preventDefault();
    
        const assetPC = {
            assetName: form.assetName.value,
            manufacturer: form.manufacturer.value,
            brandName: form.brandName.value,
            OS: form.OS.value,
            Processor: form.Processor.value,
            RAM: form.RAM.value,
            Storage: form.Storage.value,
            Location: form.group1.value,
            Status: form.group2.value 
        };
    
        db.collection('asset').add(assetPC)
        .then(docRef => {
            console.log('Document written with ID: ', docRef.id);
            // console.log('You can now also access this. as expected: ', this.foo);
        })
        .catch(err => console.log(err));

        // to reset the form
        form.assetName.value    = '';
        form.manufacturer.value = '';
        form.brandName.value    = '';
        form.OS.value           = '';
        form.Processor.value    = '';
        form.RAM.value          = '';
        form.Storage.value      = '';
        form.group1.value       = '';
        form.group2.value       = '';
    });
};

//Update and Delete an asset: PC
const assetPCcontainer = document.querySelector('.assetPC');
if(assetPCcontainer){
    assetPCcontainer.addEventListener('click', evt => {
        
        //Delete function
        if(evt.target.textContent === "delete_outline"){
            const idPC = evt.target.getAttribute('data-id');
            db.collection('asset').doc(idPC).delete();
        }
        
        //Update function
        if(evt.target.textContent === "edit"){
            const idPC2 = evt.target.getAttribute('data-id');
            // console.log('in db.js: Update has been declared!');
            const formUpdate = document.querySelector('.edit-PC');

            var docRef = db.collection("asset").doc(idPC2);
            docRef.get().then(function(doc) {
                if (doc.exists) {

                    //for retrieve the existing data and display it in Update modal
                    if(formUpdate){
                        document.getElementById('assetName').value = doc.data().assetName;
                        document.getElementById('manufacturer').value = doc.data().manufacturer;
                        document.getElementById('brandName').value = doc.data().brandName;
                        document.getElementById('Processor').value = doc.data().Processor;
                        document.getElementById('OS').value = doc.data().OS;
                        document.getElementById('RAM').value = doc.data().RAM;
                        document.getElementById('Storage').value = doc.data().Storage;
                        document.getElementById('Location').value = doc.data().Location;
                        document.getElementById('Status').value = doc.data().Status;
                    }     
                } 
                else {// doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });

            //bila dah tekan button update kat modal update form
            if(formUpdate){
                formUpdate.addEventListener('submit', evt => {
                    evt.preventDefault();
                
                    const newAssetPC = {
                        // assetName   : formUpdate.assetName.value,
                        // manufacturer: formUpdate.manufacturer.value,
                        // brandName   : formUpdate.brandName.value,
                        OS          : formUpdate.OS.value,
                        Processor   : formUpdate.Processor.value,
                        RAM         : formUpdate.RAM.value,
                        Storage     : formUpdate.Storage.value,
                        Location    : formUpdate.Location.value,
                        Status      : formUpdate.Status.value 
                    };
                
                    db.collection('asset').doc(idPC2)
                        .update(newAssetPC)
                            .then(docRef => {
                                // console.log('Document written with ID: ', docRef.id);
                                console.log('in db.js: UPDATEEEEEE!!');
                            })
                            .catch(err => console.log(err));
                    
                    //to reset the form after submitting
                    // formUpdate.assetName.value    = '';
                    // formUpdate.manufacturer.value = '';
                    // formUpdate.brandName.value    = '';
                    formUpdate.OS.value           = '';
                    formUpdate.Processor.value    = '';
                    formUpdate.RAM.value          = '';
                    formUpdate.Storage.value      = '';
                    formUpdate.Location.value     = '';
                    formUpdate.Status.value       = '';
                });
            }

        }
        
    });
};




//Add new asset: Keyboard

//use if statement because there is error stated in console "cannot read property 'addEventListener' of null"
const form2 = document.querySelector('form');
if(form2){
    form2.addEventListener('submit', evt => {
        evt.preventDefault();
    
        const assetKeyboard = {
            KBassetName     : form2.KBassetName.value,
            KBmanufacturer  : form2.KBmanufacturer.value,
            KBbrandName     : form2.KBbrandName.value,
            KBLocation      : form2.KBgroup1.value,
            KBStatus        : form2.KBgroup2.value 
        };
    
        db.collection('assetKB').add(assetKeyboard).catch(err => console.log(err));
        
        form2.KBassetName.value     = '';
        form2.KBmanufacturer.value  = '';
        form2.KBbrandName.value     = '';
        form2.KBgroup1.value        = '';
        form2.KBgroup2.value        = '';
    });
};

//delete an asset: Keyboard
const assetKBcontainer = document.querySelector('.assetKB');
if(assetKBcontainer){
    assetKBcontainer.addEventListener('click', evt => {
        if(evt.target.tagName === 'I'){
            const id2 = evt.target.getAttribute('data-id');
            db.collection('assetKB').doc(id2).delete();
        }
    });
}





//Add new asset: Mouse

//use if statement because there is error stated in console "cannot read property 'addEventListener' of null"
const form3 = document.querySelector('form');
if (form3){
    form3.addEventListener('submit', evt => {
        evt.preventDefault();
    
        const assetMouse = {
            MSassetName     : form3.MSassetName.value,
            MSmanufacturer  : form3.MSmanufacturer.value,
            MSbrandName     : form3.MSbrandName.value,
            MSLocation      : form3.MSgroup1.value,
            MSStatus        : form3.MSgroup2.value 
        };
    
        db.collection('assetMS').add(assetMouse).catch(err => console.log(err));
        
        form3.MSassetName.value     = '';
        form3.MSmanufacturer.value  = '';
        form3.MSbrandName.value     = '';
        form3.MSgroup1.value        = '';
        form3.MSgroup2.value        = '';
    });
};

//delete an asset: Mouse
const assetMScontainer = document.querySelector('.assetMS');
if(assetMScontainer){
    assetMScontainer.addEventListener('click', evt => {
        if(evt.target.tagName === 'I'){
            const id3 = evt.target.getAttribute('data-id');
            db.collection('assetMS').doc(id3).delete();
        }
    });
}
