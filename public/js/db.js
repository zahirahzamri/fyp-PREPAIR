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
    });
});

// add new tickets
const formTicket = document.querySelector('.add-ticket');
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
        .catch(err => console.log(err));
    
        formTicket.category.value = '';
        formTicket.description.value = '';
        formTicket.location.value = '';
        formTicket.type.value = '';
});  

// delete a ticket
const ticketContainer = document.querySelector('.tickets'); //betul dah
ticketContainer.addEventListener('click', evt => {
    // console.log(evt);
    if(evt.target.tagName === 'I'){
        const id = evt.target.getAttribute('data-id');
        db.collection('ticket').doc(id).delete();
    }
});

//real-time listener FOR asset: PC
db.collection('asset').onSnapshot((snapshot) => {
    //console.log(snapshot.docChanges());
    setupViewAssetByTypePC(snapshot.docs);   //called function in ui.js to display view Asset by category
    // renderReportPage(snapshot.docs);            //for Report Page

    snapshot.docChanges().forEach((change) => {
        // console.log(change, change.doc.data(), change.doc.id);
        // console.log(change);
        if(change.type === 'added'){        //add the document data to the web page
            renderAssetPC(change.doc.data(), change.doc.id);
        };
        if(change.type === 'removed'){      //remove the document data to the web page
            removeAssetPC(change.doc.id);
        };
        if(change.type === 'modified'){      //update the document
            updateAssetPC(change.doc.data(), change.doc.id);
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


// get data of tickets, onSnapshor is to real time update the data (ambik from auth.js)
// db.collection('ticket').onSnapshot(snapshot => {
//     setupTickets(snapshot.docs);
//   }, err => {
//     console.log(err.message);
// });








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

//delete an asset: PC
const assetPCcontainer = document.querySelector('.assetPC');
if(assetPCcontainer){
    assetPCcontainer.addEventListener('click', evt => {
        //console.log(evt);
        if(evt.target.tagName === 'I'){
            const id = evt.target.getAttribute('data-id');
            db.collection('asset').doc(id).delete();
        }
    });
};

//update asset: PC
//what exactly happen when click the 'Edit' button
const PCUpdateData = document.querySelector('.update-assetPC');
const formUpdatePC = document.querySelector('form');

if(formUpdatePC){
    if(PCUpdateData){
        PCUpdateData.addEventListener('click', evt =>{
            evt.preventDefault();
            
            formUpdatePC.addEventListener('submit', evt =>{
                evt.preventDefault();

                if(evt.target.tagName === 'I'){
                    const idPCtry = evt.target.getAttribute('data-id');
                    var docReff = db.collection('asset').doc(idPCtry);
        
                    docReff.get().then(function(doc) {
                        if (doc.exists) {
                            console.log("Document data:", doc.data());
                            console.log("Document ID:", doc.id);
        
                            //jadi but nanti doc field hanya ada status je, yang lain undefined
                            db.collection('asset').doc(doc.id).update({
                                Status      : 'Good'
                            }).then(docRef => {
                                console.log('Document successfully updated!');
                                // console.log('You can now also access this. as expected: ', this.foo);
                            })
                            .catch(err => console.log(err));
                            
                            
                            // const assetPCUpdate = {
                            //     assetName   : PCUpdateData.assetName.value,
                            //     manufacturer: PCUpdateData.manufacturer.value,
                            //     brandName   : PCUpdateData.brandName.value,
                            //     OS          : PCUpdateData.OS.value,
                            //     Processor   : PCUpdateData.Processor.value,
                            //     RAM         : PCUpdateData.RAM.value,
                            //     Storage     : PCUpdateData.Storage.value,
                            //     Location    : PCUpdateData.group1.value,
                            //     Status      : PCUpdateData.group2.value 
                            // };
                    
                            // db.collection('asset').doc(doc.id).update(assetPCUpdate)
                            // .then(docRef => {
                            //     console.log('Document written with ID: ', docRef.id);
                            //     console.log('Document successfully updated!');
                            //     // console.log('You can now also access this. as expected: ', this.foo);
                            // })
                            // .catch(err => console.log(err));
                    
                            // PCUpdateData.assetName.value    = '';
                            // PCUpdateData.manufacturer.value = '';
                            // PCUpdateData.brandName.value    = '';
                            // PCUpdateData.OS.value           = '';
                            // PCUpdateData.Processor.value    = '';
                            // PCUpdateData.RAM.value          = '';
                            // PCUpdateData.Storage.value      = '';
                            // PCUpdateData.group1.value       = '';
                            // PCUpdateData.group2.value       = '';
        
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
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                        }
                    }).catch(function(error) {
                            console.log("Error getting document:", error);
                        });
                }
            })
            // console.log(evt);
        })
    };
}



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





//REPORT PAGE

// //getting the data
// db.collection('asset').get().then((snapshot) => {
//     // console.log(snapshot.docs);
//     snapshot.docs.forEach(doc => {
//         renderReportPC(doc);
//     })
// });

// const assetRef = db.collection('asset');
// const snapshot = await assetRef.where('assetName', '==', true).get();
// if(snapshot.empty){
//     console.log('No matcihng documents!');
//     return;
// }

// snapshot.forEach(doc => {
//     console.log(doc.id, '=>', doc.data());
// });

// db.collection("asset").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//     });
// });

// db.collection('asset').get().then((snapshot) => {
//     // console.log(snapshot.docs);
//     snapshot.docs.forEach(doc => {
//         console.log(doc);
//     })
// })