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

var dataTic = [];

// real-time listener for ticket
db.collection('ticket').onSnapshot({ includeMetadataChanges: true }, snapshot => {
    // console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
        // console.log(change);
        // console.log(change,change.doc.data(), change.doc.id);
    //   console.log(change.type, change.doc.id, change.doc.data());

    const doc = {...change.doc.data(), id: change.doc.id};

      if(change.type === 'added'){
        // add the document data to the web page
        renderTicket(change.doc.data(), change.doc.id);
      }
      if(change.type === 'removed'){
        // remove the document data from the web page
        removeTicket(change.doc.id);
      }
      if(change.type === 'modified'){      //update the ticket
        // const index = dataTic.findIndex(item => item.id == doc.id);
        // dataTic[index] = doc;
        // renderTicket(change.doc.data(), change.doc.id);
        // console.log("Changed info:", change.doc.data());
        updateTicket();
      }
    });
});

// let timeStamp = new db.Timestamp.fromDate(new Date("December 10, 1815"));
// const FieldValue = admin.firestore.FieldValue;

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
            // timeStamp: timeStamp,
        };

        db.collection('ticket').add(ticket)
            .then(alert("Successfully add new ticket! Our technician will reach you out soon"))
            .catch(err => console.log(err));
        
            formTicket.category.value = '';
            formTicket.description.value = '';
            formTicket.location.value = '';
            formTicket.type.value = '';

        
    })
    // .then(() => {
    //     // close the signup modal & reset form
    //     const modal = document.querySelector('#modal-editTicket');
    //     M.Modal.getInstance(modal).close();
    //     formTicket.reset();
    //     formTicket.querySelector('.error').innerHTML = '';
    // }).catch(err => {
    //     formTicket.querySelector('.error').innerHTML = err.message;
    // });
}


// update and delete a ticket
const ticketContainer = document.querySelector('.tickets');
if(ticketContainer){
    ticketContainer.addEventListener('click', evt => {
        // console.log(evt);
        
        // DELETE TICKET
        if(evt.target.textContent === "delete_outline"){
            // onclick = "return confirm('Are you sure you want to delete this item?');"
            const id = evt.target.getAttribute('data-id');
            db.collection('ticket').doc(id).delete();
        }

        if(evt.target.textContent === "edit"){
            const id = evt.target.getAttribute('data-id'); //get the id of the ticket
            const updateTicket = document.querySelector('.edit-ticket');
            
            var ref = db.collection("ticket").doc(id);
            ref.get().then(function(doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data().category);

                    // retrieve existing data and display
                    if(updateTicket){
                        document.getElementById('category').value = doc.data().category;
                        document.getElementById('description').value = doc.data().description;
                        document.getElementById('location').value = doc.data().location;
                        document.getElementById('type').value = doc.data().type;
                    }
                    // return doc.data().category;
                }
                else { // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });

            if(updateTicket) {
                updateTicket.addEventListener('submit', evt => {
                    evt.preventDefault();

                    // construct object
                    const newTicket = {
                        category: updateTicket.category.value,
                        description: updateTicket.description.value, 
                        location: updateTicket.location.value, 
                        type: updateTicket.type.value, 
                    };
                    
                    db.collection('ticket').doc(id).update(newTicket)
                        .then(alert("Successfully update ticket"))
                        .catch(err => console.log(err));
        
                        updateTicket.category.value = '';
                        updateTicket.description.value = '';
                        updateTicket.location.value = '';
                        updateTicket.type.value = '';
                });
            }
        }

    });
}


// // update ticket
// const editTicket = document.querySelector('.edit-ticket');
// const modalCont = document.querySelector('#modal-editTicket');
// if(modalCont){
//     ticketContainer.addEventListener('click', evt => {
//         evt.preventDefault();

//         if(evt.target.textContent === "edit"){
//             const id = evt.target.getAttribute('data-id'); //get the id of the ticket
//             const ref = db.collection("ticket").doc(id).get().then(function(doc) {
//                 if (doc.exists) {
//                     console.log("Document data:", doc.data().category);
//                     return doc.data().category;
//                 }}) ;
//             console.log(id);
//             console.log(ref);

//             console.log(content);
//         }
    
//         // construct object
//         const updateTicket = {
//             category: editTicket.category.value,
//             description: editTicket.description.value, 
//             location: editTicket.location.value, 
//             type: editTicket.type.value, 
//         };

//         // console.log(editTicket.category.value);
//         // console.log(editTicket.description.value);
//         // console.log(document.getElementById("editBtn").getAttribute("data-id"));
//         // const id = document.getElementById("editBtn").getAttribute("data-id");
//         // console.log(id);
//         const id = evt.target.getAttribute('data-id');
//         db.collection('ticket').doc(id).update(updateTicket)
//             .then(alert("Successfully update ticket"))
//             .catch(err => console.log(err));
        
//             editTicket.category.value = '';
//             editTicket.description.value = '';
//             editTicket.location.value = '';
//             editTicket.type.value = '';
//     });  
// }








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

    snapshot.docChanges().forEach((change) => {
        if(change.type === 'added'){            //add the document data to the web page
            renderAssetKB(change.doc.data(), change.doc.id);
        };
        if(change.type === 'removed'){          //remove the document data to the web page
            removeAssetKB(change.doc.id);
        };
        if(change.type === 'modified'){         //update the document
            updateAssetKB();
        }
    });
});

//real-time listener FOR asset: Mouse
db.collection('assetMS').onSnapshot((snapshot) => {
    setupViewAssetByTypeMS(snapshot.docs);      //called function in ui.js to display view Asset by category

    snapshot.docChanges().forEach((change) => {
        if(change.type === 'added'){            //add the document data to the web page
            renderAssetMS(change.doc.data(), change.doc.id);
        };
        if(change.type === 'removed'){          //remove the document data to the web page
            removeAssetMS(change.doc.id);
        };
        if(change.type === 'modified'){         //update the document
            updateAssetMS();
        }
    });
});





//Add new asset: PC

//use if statement because there is error stated in console "cannot read property 'addEventListener' of null"
const form = document.querySelector('#addFormPC');
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
const form2 = document.querySelector('#addFormKB');
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
//Update and Delete an asset: Keyboard
const assetKBcontainer = document.querySelector('.assetKB');
if(assetKBcontainer){

    assetKBcontainer.addEventListener('click', evt => {

        //delete
        if(evt.target.textContent === "delete_outline"){
            const id2 = evt.target.getAttribute('data-id');
            db.collection('assetKB').doc(id2).delete();
        }

        //update
        if(evt.target.textContent === "edit"){
            const idKB = evt.target.getAttribute('data-id');
            const formUpdateKB = document.querySelector('.edit-KB');

            var docRef2 = db.collection("assetKB").doc(idKB);
            docRef2.get().then(function(doc) {
                if (doc.exists) {

                    //for retrieve the existing data and display it in Update modal
                    if(formUpdateKB){
                        document.getElementById('KBassetName').value = doc.data().KBassetName;
                        document.getElementById('KBmanufacturer').value = doc.data().KBmanufacturer;
                        document.getElementById('KBbrandName').value = doc.data().KBbrandName;
                        document.getElementById('KBLocation').value = doc.data().KBLocation;
                        document.getElementById('KBStatus').value = doc.data().KBStatus;
                    }
                    
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });

            if(formUpdateKB){
                formUpdateKB.addEventListener('submit', evt => {
                    evt.preventDefault();
                
                    const newAssetKB = {
                        KBassetName   : formUpdateKB.KBassetName.value,
                        KBmanufacturer: formUpdateKB.KBmanufacturer.value,
                        KBbrandName   : formUpdateKB.KBbrandName.value,
                        KBLocation    : formUpdateKB.KBLocation.value,
                        KBStatus      : formUpdateKB.KBStatus.value 
                    };
                
                    db.collection('assetKB').doc(idKB).update(newAssetKB)
                        .then(docRef => {
                            console.log('in db.js: Keyboard asset UPDATE!!');
                        })
                        .catch(err => console.log(err));
                    
                    //to reset the form after submitting
                    formUpdateKB.KBassetName.value    = '';
                    formUpdateKB.KBmanufacturer.value = '';
                    formUpdateKB.KBbrandName.value    = '';
                    formUpdateKB.KBLocation.value     = '';
                    formUpdateKB.KBStatus.value       = '';
                });
            }
        }
    });
}





//Add new asset: Mouse
//use if statement because there is error stated in console "cannot read property 'addEventListener' of null"
const form3 = document.querySelector('#addFormMS');
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
//Update and Delete an asset: Mouse
const assetMScontainer = document.querySelector('.assetMS');
if(assetMScontainer){
    assetMScontainer.addEventListener('click', evt => {
        //delete
        if(evt.target.textContent === "delete_outline"){
            const id3 = evt.target.getAttribute('data-id');
            db.collection('assetMS').doc(id3).delete();
        }

        //update
        if(evt.target.textContent === "edit"){
            const idMS = evt.target.getAttribute('data-id');
            const formUpdateMS = document.querySelector('.edit-MS');

            var docRef3 = db.collection("assetMS").doc(idMS);
            docRef3.get().then(function(doc) {
                if (doc.exists) {

                    //for retrieve the existing data and display it in Update modal
                    if(formUpdateMS){
                        document.getElementById('MSassetName').value = doc.data().MSassetName;
                        document.getElementById('MSmanufacturer').value = doc.data().MSmanufacturer;
                        document.getElementById('MSbrandName').value = doc.data().MSbrandName;
                        document.getElementById('MSLocation').value = doc.data().MSLocation;
                        document.getElementById('MSStatus').value = doc.data().MSStatus;
                    }
                    
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });

            if(formUpdateMS){
                formUpdateMS.addEventListener('submit', evt => {
                    evt.preventDefault();
                
                    const newAssetMS = {
                        MSassetName   : formUpdateMS.MSassetName.value,
                        MSmanufacturer: formUpdateMS.MSmanufacturer.value,
                        MSbrandName   : formUpdateMS.MSbrandName.value,
                        MSLocation    : formUpdateMS.MSLocation.value,
                        MSStatus      : formUpdateMS.MSStatus.value 
                    };
                
                    db.collection('assetMS').doc(idMS).update(newAssetMS)
                        .then(docRef => {
                            console.log('in db.js: Mouse asset UPDATE!!');
                        })
                        .catch(err => console.log(err));
                    
                    //to reset the form after submitting
                    formUpdateMS.MSassetName.value    = '';
                    formUpdateMS.MSmanufacturer.value = '';
                    formUpdateMS.MSbrandName.value    = '';
                    formUpdateMS.MSLocation.value     = '';
                    formUpdateMS.MSStatus.value       = '';
                });
            }
        }
    });
}
