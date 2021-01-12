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


// TICKET PART
var dataTic = [];

// real-time listener for ticket
db.collection('ticket').onSnapshot({ includeMetadataChanges: true }, snapshot => {
    snapshot.docChanges().forEach(change => {

      if(change.type === 'added'){          // add the document data to the web page
        renderTicket(change.doc.data(), change.doc.id);
      }
      if(change.type === 'removed'){        // remove the document data from the web page
        removeTicket(change.doc.id);
      }
      if(change.type === 'modified'){      //update the ticket
        updateTicket();
      }
    });
});

// add new tickets
const formTicket = document.querySelector('.add-ticket');
if(formTicket){
    formTicket.addEventListener('submit', evt => {
        evt.preventDefault();

        var defaultStatus = "Pending";
        var defaultTechnician = "Not Available";
        var defaultRemark = "";
         
        // const timeStamp = firebase.firestore.Timestamp.fromDate(new Date());
        const FormattedDate = new Date(firebase.firestore.Timestamp.now().seconds*1000).toLocaleDateString("pt-PT");
        // construct object
        const ticket = {
            category: formTicket.category.value,
            description: formTicket.description.value, 
            location: formTicket.location.value, 
            type: formTicket.type.value, 
            status: defaultStatus,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            date: FormattedDate,
            PIC: defaultTechnician,
            remarks: defaultRemark, 
        };

        db.collection('ticket').add(ticket).catch(error => {
            console.log(error.message);
          }).then(res => {
            const user = auth.currentUser;
            store.ref('users/' + user.uid + '/ticket.jpg').put(file).then(function () {
              console.log('successfully upload image');
              // return user.updateProfile({
              //   photoURL: 'users/' + user.uid + '/profile.jpg',
              // })
            }).catch(error => {
              console.log(error.message);
            })
          })
            .then(alert("Successfully add new ticket!"))
            .catch(err => console.log(err.message));
        
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
        
        // DELETE TICKET
        if(evt.target.textContent === "delete_outline"){
            // onclick = "return confirm('Are you sure you want to delete this item?');"
            const id = evt.target.getAttribute('data-id');
            // db.collection('ticket').doc(id).delete();

            const formDel = document.querySelector('.delete-Ticket');
            if(formDel){
                formDel.addEventListener('submit', evt => {
                    evt.preventDefault();
                    const btnDel = document.querySelector('#btnDelTicket');

                    if(btnDel.addEventListener('click', evt => {
                        evt.preventDefault();
                        db.collection('ticket').doc(id).delete();
                        window.location.reload();            
                    }));
                });
            }
        }

        //UPDATE TICKET
        if(evt.target.textContent === "assignment_ind"){
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
                        document.getElementById('date').value = doc.data().date;
                        document.getElementById('pic').value = doc.data().PIC;
                        document.getElementById('remarks').value = doc.data().remarks;
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


                    var assignPic = "";
                    if(updateTicket.pic.value !== "Not Available") {
                        assignPic = "Assigned"
                    }

                    // construct object
                    const newTicket = {
                        category: updateTicket.category.value,
                        description: updateTicket.description.value, 
                        location: updateTicket.location.value, 
                        type: updateTicket.type.value,
                        date: updateTicket.date.value,
                        PIC: updateTicket.pic.value,
                        remarks: updateTicket.remarks.value,
                        status: assignPic 
                    };
                    
                    db.collection('ticket').doc(id).update(newTicket)
                        .then(alert("Successfully update ticket"))
                        .catch(err => console.log(err));
        
                        updateTicket.category.value = '';
                        updateTicket.description.value = '';
                        updateTicket.location.value = '';
                        updateTicket.type.value = '';
                        updateTicket.date.value = '';
                        updateTicket.pic.value = '';
                        updateTicket.remarks.value = '';
                });
            }
        }

    });
}






// ASSET MANAGEMENT PART

//setiap array ni untuk simpan all data from each collection
var data1 = [];     //for asset PC
var data2 = [];     //for asset KB
var data3 = [];     //for asset MS

//real-time listener FOR asset: PC
db.collection('asset').onSnapshot((snapshot) => {
    setupViewAssetByTypePC(snapshot.docs);   //called function in ui.js to display view Asset by category

    snapshot.docChanges().forEach((change) => {

        const doc = {...change.doc.data(), id: change.doc.id};

        if(change.type === 'added'){        //add the document data to the web page
            data1.push(doc);
            renderAssetPC(change.doc.data(), change.doc.id);
            // setupViewAssetByTypePC(change.doc.data(), change.doc.id);
        };
        if(change.type === 'removed'){      //remove the document data to the web page
            removeAssetPC(change.doc.id);
        };
        if(change.type === 'modified'){      //update the document
            const index1 = data1.findIndex(item => item.id == doc.id);
            data1[index1] = doc;
            // updateAssetPC(data1, data1.id);

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
const form = document.querySelector('#addFormPC');
if(form){                                               //use if statement because there is error stated in console "cannot read property 'addEventListener' of null"
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
            Location: form.Location.value,
            Status: form.Status.value 
        };
    
        db.collection('asset').add(assetPC)
            .then(docRef => {
                console.log('Document written with ID: ', docRef.id);
            })
            .then(alert("Succesfully add new asset PC!"))
            .catch(err => console.log(err));
        
        //to reset the form after submitting
        form.assetName.value    = '';
        form.manufacturer.value = '';
        form.brandName.value    = '';
        form.OS.value           = '';
        form.Processor.value    = '';
        form.RAM.value          = '';
        form.Storage.value      = '';
        form.Location.value       = '';
        form.Status.value       = '';
    });
};

//Update and Delete an asset: PC
const assetPCcontainer = document.querySelector('.assetPC');
if(assetPCcontainer){
    assetPCcontainer.addEventListener('click', evt => {
        // console.log(evt);

        //delete 
        if(evt.target.textContent === "delete_outline"){
            const idPC = evt.target.getAttribute('data-id');
            const formDel = document.querySelector('.delete-PC');

            if(formDel){
                formDel.addEventListener('submit', evt => {
                    evt.preventDefault();
                    const btnDel = document.querySelector('#btnDelPC');

                    if(btnDel.addEventListener('click', evt => {
                        evt.preventDefault();
                        db.collection('asset').doc(idPC).delete(); 
                        window.location.reload();           
                    }));
                });
            }
        }

        //update
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
                    
                } else {
                    // doc.data() will be undefined in this case
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
                        .then(alert("Successfully update asset PC"))
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
const form2 = document.querySelector('#addFormKB');
if(form2){                                              //use if statement because there is error stated in console "cannot read property 'addEventListener' of null"
    form2.addEventListener('submit', evt => {
        evt.preventDefault();
    
        const assetKeyboard = {
            KBassetName     : form2.KBassetName.value,
            KBmanufacturer  : form2.KBmanufacturer.value,
            KBbrandName     : form2.KBbrandName.value,
            KBLocation      : form2.KBLocation.value,
            KBStatus        : form2.KBStatus.value 
        };
    
        db.collection('assetKB').add(assetKeyboard)
            .then(alert("Succesfully add new asset Keyboard!"))
            .catch(err => console.log(err));
        
        form2.KBassetName.value     = '';
        form2.KBmanufacturer.value  = '';
        form2.KBbrandName.value     = '';
        form2.KBLocation.value        = '';
        form2.KBStatus.value        = '';
    });
};
//Update and Delete an asset: Keyboard
const assetKBcontainer = document.querySelector('.assetKB');
if(assetKBcontainer){
    assetKBcontainer.addEventListener('click', evt => {

        //delete
        if(evt.target.textContent === "delete_outline"){
            const id2 = evt.target.getAttribute('data-id');
            const formDel2 = document.querySelector('.delete-KB');

            if(formDel2){
                formDel2.addEventListener('submit', evt => {
                    evt.preventDefault();
                    const btnDel2 = document.querySelector('#btnDelKB');

                    if(btnDel2.addEventListener('click', evt => {
                        evt.preventDefault();
                        db.collection('assetKB').doc(id2).delete();            
                        window.location.reload();
                    }));
                });
            }
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
                
                    db.collection('assetKB').doc(idKB)
                        .update(newAssetKB)
                        .then(alert("Successfully update asset Keyboard"))
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
const form3 = document.querySelector('#addFormMS');
if (form3){                                             //use if statement because there is error stated in console "cannot read property 'addEventListener' of null"
    form3.addEventListener('submit', evt => {
        evt.preventDefault();
    
        const assetMouse = {
            MSassetName     : form3.MSassetName.value,
            MSmanufacturer  : form3.MSmanufacturer.value,
            MSbrandName     : form3.MSbrandName.value,
            MSLocation      : form3.MSLocation.value,
            MSStatus        : form3.MSStatus.value 
        };
    
        db.collection('assetMS').add(assetMouse)
            .then(alert("Succesfully add new asset Mouse!"))
            .catch(err => console.log(err));
        
        form3.MSassetName.value     = '';
        form3.MSmanufacturer.value  = '';
        form3.MSbrandName.value     = '';
        form3.MSLocation.value        = '';
        form3.MSStatus.value        = '';
    });
};
//Update and Delete an asset: Mouse
const assetMScontainer = document.querySelector('.assetMS');
if(assetMScontainer){
    assetMScontainer.addEventListener('click', evt => {
        //delete
        if(evt.target.textContent === "delete_outline"){
            const id3 = evt.target.getAttribute('data-id');
            const formDel3 = document.querySelector('.delete-MS');

            if(formDel3){
                formDel3.addEventListener('submit', evt => {
                    evt.preventDefault();
                    const btnDel3 = document.querySelector('#btnDelMS');

                    if(btnDel3.addEventListener('click', evt => {
                        evt.preventDefault();
                        db.collection('assetMS').doc(id3).delete();
                        window.location.reload();
                    }));
                });
            }
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
                
                    db.collection('assetMS').doc(idMS)
                        .update(newAssetMS)
                        .then(alert("Successfully update asset Mouse"))
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






//DASHBOARD PART
// update data: learning from udemy course

// select the svg container first
// const svg = d3.select('.canvas')
//   .append('svg')
//     .attr('width', 300)
//     .attr('height', 300);

// // create margins & dimensions
// const margin = {top: 20, right: 20, bottom: 100, left: 100};
// const graphWidth = 600 - margin.left - margin.right;
// const graphHeight = 600 - margin.top - margin.bottom;

// const graph = svg.append('g')
//   .attr('width', graphWidth)
//   .attr('height', graphHeight)
//   .attr('transform', `translate(${margin.left}, ${margin.top})`);

// // create axes groups
// const xAxisGroup = graph.append('g')
//   .attr('transform', `translate(0, ${graphHeight})`)

// xAxisGroup.selectAll('text')
//   .attr('fill', 'black')
// //   .attr('transform', 'rotate(-40)')
//   .attr('text-anchor', 'end');

// const yAxisGroup = graph.append('g');

// const y = d3.scaleLinear()
//     .range([graphHeight, 0]);

// const x = d3.scaleBand()
//   .range([0, graphWidth])
//   .paddingInner(0.2)
//   .paddingOuter(0.2);

// // create & call the axes
// const xAxis = d3.axisBottom(x);
// const yAxis = d3.axisLeft(y)
//   .ticks(3);
// //   .tickFormat(d => d + ' orders');



// // the update function
// const update = (dataDashboard, size) => {

//   //1. Update the scales (domains) 
//   y.domain([0, d3.max(dataDashboard, size)]);
//   x.domain(dataDashboard.map(item => item.Status));

//   //2. Join the data to circs
//   const rects = graph.selectAll('rect').data(dataDashboard);

//   //3. remove unwanted (if any) shapes using the exit selection
//   rects.exit().remove();

//   //4. Update the current shapes in current DOM
//   rects.attr('width', x.bandwidth)
//     .attr("height", graphHeight - size)
//     .attr('fill', 'orange')
//     .attr('x', d => x(d.Status))
//     .attr('y', size);

//   //5. Append the enter selection to the DOM
//   rects.enter()
//     .append('rect')
//       .attr('width', x.bandwidth)
//       .attr("height", 0)
//       .attr('fill', 'orange')
//       .attr('x', (d) => x(d.Status))
//       .attr('y',graphHeight);
 
//     //call axes
//   xAxisGroup.call(xAxis);
//   yAxisGroup.call(yAxis);

// };


// const sizePC = db.collection('asset').onSnapshot((snapshot) => { 
//     snapshot.size;
// });

// // var data = [];
// var dataDashboard = [];

// //get data from firestore
// db.collection('asset').onSnapshot(res => {
//     res.docChanges().forEach(change => {

//         const doc = {...change.doc.data(), id: change.doc.id};
        
//         switch (change.type){
//             case 'added':
//                 dataDashboard.push(doc); 
//                 break;
//             case 'modified':
//                 const index = dataDashboard.findIndex(item => item.id == doc.id);
//                 dataDashboard[index] = doc;
//                 break;
//             case 'removed':
//                 dataDashboard = dataDashboard.filter(item => item.id !== doc.id);
//                 break;
//             default: break;

//         }
//     });



//     update(dataDashboard, sizePC);

// })