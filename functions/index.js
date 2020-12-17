const functions = require('firebase-functions');

// package name : firebase-admin
const admin = require('firebase-admin');
admin.initializeApp();

// onCall to being able to call at the front end
// data will be custom claims that we want to make admin, here we use email
exports.addAdminRole = functions.https.onCall((data, context) => {
    // check request is made by an admin
    if ( context.auth.token.admin !== true ) {
      return { error: 'Only admins can add other admins' }
    } //else it will print the code below
  
    // get user and add admin custom claim
    return admin.auth().getUserByEmail(data.email).then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      })
    }).then(() => {
      return {
        message: `Success! ${data.email} has been granted the technician privilege.`
      }
    }).catch(err => {
      return err;
    });
  });