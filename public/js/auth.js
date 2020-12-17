// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
if (adminForm) {
  adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({ email: adminEmail }).then(result => {
      console.log(result);
      // alert(result.data.message);
      // alert(result.data.errorInfo.message);
      if (result.data.codePrefix=="auth") {
        adminForm.querySelector('.status-admin').innerHTML = result.data.errorInfo.message;
        adminForm.querySelector('.status-admin').classList.remove('green-text');
        adminForm.querySelector('.status-admin').classList.add('pink-text');
      } else {
        adminForm.querySelector('.status-admin').innerHTML = result.data.message;
      }
      adminForm.reset();
    })
  });
}


// listen for auth status changes
auth.onAuthStateChanged(user => {
    // console.log(user);
    if (user) {
        console.log('user logged in: ', user);
        // window.location = '/pages/asset/mainPage.html'; 
        user.getIdTokenResult().then(idTokenResult => {
          console.log(idTokenResult.claims); 
          user.admin = idTokenResult.claims.admin; //return true if admin
          setupUI(user);
        });
      
        // // get data of tickets, onSnapshot is to real time update the data 
        db.collection('ticket').onSnapshot(snapshot => {
          // console.log(snapshot.docs);
          setupTickets(snapshot.docs);
          // setupUI(user);
        }, err => {
          console.log(err.message);
        });
        //real-time listener FOR REPORT PAGE
        db.collection('asset').onSnapshot((snapshot) => {
          renderReportPagePC(snapshot.docs); 
          }, err => {
          console.log(err.message);
        });
        db.collection('assetKB').onSnapshot((snapshot) => {
          renderReportPageKB(snapshot.docs); 
          }, err => {
          console.log(err.message);
        });
        db.collection('assetMS').onSnapshot((snapshot) => {
          console.log("asset displayed")
          renderReportPageMS(snapshot.docs); 
          }, err => {
          console.log(err.message);
        });

    } else {
        setupUI();
        setupTickets([]);
        console.log('user logged out');
    }
});

let img = document.getElementById("img");
let file = {};

function chooseFile(e) {
  file = e.target.files[0];
}


// signup
const signupForm = document.querySelector('#signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        // prevent from refresh so didnt lost the data
        e.preventDefault();
    
        //   get user info
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;
        // const name = signupForm['signup-name'].value;
    
        console.log(email, password);
    
        // sign up the user
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            console.log(cred.user);
            
            return db.collection('users').doc(cred.user.uid).set({
              sid: signupForm['signup-sid'].value,
              phone: signupForm['signup-phone'].value,
              bio: signupForm['signup-bio'].value
            });
        }).then((res) => {
          const user = auth.currentUser;
          return user.updateProfile({
            displayName: signupForm['signup-name'].value
          })
        }).then(res => {
          const user = auth.currentUser;
          store.ref('users/' + user.uid + '/profile.jpg').put(file).then(function () {
            console.log('successfully upload image');
            // return user.updateProfile({
            //   photoURL: 'users/' + user.uid + '/profile.jpg',
            // })
          }).catch(error => {
            console.log(error.message);
          })
        }).then(() => {
            // close the signup modal & reset form
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            window.location = '/public/pages/asset/mainPage.html';
            signupForm.reset();
            signupForm.querySelector('.error').innerHTML = '';
        }).catch(err => {
          signupForm.querySelector('.error').innerHTML = err.message;
        });
    });
}




// logout
const logout = document.querySelector('#logout');
if(logout) {
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    window.location = '/public/index.html';
  //   auth.signOut().then(() => {
  //     console.log('user signed out');
  //   });
  });
}


// login
const loginForm = document.querySelector('#login-form');
if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // get user info
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;
      
        // log the user in
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
          // console.log(cred.user);
          // close the signup modal & reset form
          // const modal = document.querySelector('#modal-login');
          // M.Modal.getInstance(modal).close();
          window.location = '/public/pages/asset/mainPage.html'; //After successful login, user will be redirected to mainPage.html
          loginForm.reset();
          loginForm.querySelector('.error').innerHTML = '';
        }).catch(err => {
            console.log(err);
          loginForm.querySelector('.error').innerHTML = err.message;
        });
        // clear form
        loginForm['login-email'].value = '';
        loginForm['login-password'].value = '';
    });
}
