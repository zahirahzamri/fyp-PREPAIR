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

//real-time listener FOR asset: PC
db.collection('asset').onSnapshot((snapshot) => {
    //console.log(snapshot.docChanges());
    snapshot.docChanges().forEach((change) => {
        //console.log(change, change.doc.data(), change.doc.id);
        if(change.type === 'added'){
            //add the document data to the web page
            renderAssetPC(change.doc.data(), change.doc.id);
        };
        if(change.type === 'removed'){
            //remove the document data to the web page
            removeAssetPC(change.doc.id);
        };
        if(change.type === 'updated'){
            //update the document
            updateAssetPC(change.doc.data(), change.doc.id);
        }
    });
});

//real-time listener FOR asset: Keyboard
db.collection('assetKB').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if(change.type === 'added'){
            //add the document data to the web page
            renderAssetKB(change.doc.data(), change.doc.id);
        };
        if(change.type === 'removed'){
            //remove the document data to the web page
            removeAssetKB(change.doc.id);
        };
    });
});

//real-time listener FOR asset: Mouse
db.collection('assetMS').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if(change.type === 'added'){
            //add the document data to the web page
            renderAssetMS(change.doc.data(), change.doc.id);
        };
        if(change.type === 'removed'){
            //remove the document data to the web page
            removeAssetMS(change.doc.id);
        };
    });
});



//ASSET: PC

//Add new asset PC
//use if statement because there is error stated in console "cannot read property 'addEventListener' of null"
const form = document.querySelector('form');
if(form){
    form.addEventListener('submit', evt => {
        evt.preventDefault();

        //kena declare the attributes/data fields yang nak masuk dalam database
        //nama attributes kena sama dengan yang kat ui.js
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

        //for entering the data into 'asset' collection
        db.collection('asset').add(assetPC).catch(err => console.log(err));
        

        //untuk make sure the form is empty after submitting the data into the collection
        form.assetName.value = '';
        form.manufacturer.value = '';
        form.brandName.value = '';
        form.OS.value = '';
        form.Processor.value = '';
        form.RAM.value,
        form.Storage.value = '';
        form.group1.value = '';
        form.group2.value = '';
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






//ASSET: KEYBOARD

//Add new asset Keyboard
//use if statement because there is error stated in console "cannot read property 'addEventListener' of null"
const form2 = document.querySelector('form');
if(form2){
    form2.addEventListener('submit', evt => {
        evt.preventDefault();
    
        const assetKeyboard = {
            KBassetName: form2.KBassetName.value,
            KBmanufacturer: form2.KBmanufacturer.value,
            KBbrandName: form2.KBbrandName.value,
            KBLocation: form2.KBgroup1.value,
            KBStatus: form2.KBgroup2.value 
        };
    
        db.collection('assetKB').add(assetKeyboard).catch(err => console.log(err));
        
        form2.KBassetName.value = '';
        form2.KBmanufacturer.value = '';
        form2.KBbrandName.value = '';
        form2.KBgroup1.value = '';
        form2.KBgroup2.value = '';
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






//ASSET:MOUSE

//Add new asset Mouse
//use if statement because there is error stated in console "cannot read property 'addEventListener' of null"
const form3 = document.querySelector('form');
if (form3){
    form3.addEventListener('submit', evt => {
        evt.preventDefault();
    
        const assetMouse = {
            MSassetName: form3.MSassetName.value,
            MSmanufacturer: form3.MSmanufacturer.value,
            MSbrandName: form3.MSbrandName.value,
            MSLocation: form3.MSgroup1.value,
            MSStatus: form3.MSgroup2.value 
        };
    
        db.collection('assetMS').add(assetMouse).catch(err => console.log(err));
        
        form3.MSassetName.value = '';
        form3.MSmanufacturer.value = '';
        form3.MSbrandName.value = '';
        form3.MSgroup1.value = '';
        form3.MSgroup2.value = '';
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