// DOM elements
// const ticketList = document.querySelector('.ticket');

// declare if login/logout
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');
const lecturerItems = document.querySelectorAll('.lecturer');

const setupUI = (user) => {
  if(accountDetails){
    if (user) {
      if (user.admin) {
        // show if the user is the admin
        adminItems.forEach(item => item.style.display = 'block');
        lecturerItems.forEach(item => item.style.display = 'none');
      }
      store.ref('users/' + user.uid + '/profile.jpg').getDownloadURL().then(imgUrl => {
        img.src = imgUrl;
      })
      // account info
      db.collection('users').doc(user.uid).get().then(doc => {
        const html = `
        <div class="card-panel teal lighten-2">Logged in as ${user.email}</div>
          <table>
              <tr> <td style="font-weight: bold;">Name          </td> <td>:</td>  <td>${user.displayName} </td> </tr>
              <tr> <td style="font-weight: bold;">Staff ID      </td> <td>:</td>  <td>${doc.data().sid}   </td> </tr>
              <tr> <td style="font-weight: bold;">Phone Number  </td> <td>:</td>  <td>${doc.data().phone} </td> </tr>
              <tr> <td style="font-weight: bold;">Bio           </td> <td>:</td>  <td>${doc.data().bio}   </td> </tr>
              <tr> <td style="font-weight: bold;">Role          </td> <td>:</td>  <td>${user.admin ? 'Technician' : 'Lecturer'}      </td> </tr>
          </table>
        `;
        accountDetails.innerHTML = html;
      });
      
      // toggle user UI elements
      loggedInLinks.forEach(item => item.style.display = 'block');
      loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
      adminItems.forEach(item => item.style.display = 'none');
      // clear account info
      accountDetails.innerHTML = '';

      // toggle user elements
      loggedInLinks.forEach(item => item.style.display = 'none');
      loggedOutLinks.forEach(item => item.style.display = 'block');
    }
  }
  
};


// setup tickets
// const setupTickets = (data) => {
//   if (ticketList) { //remove "Cannot set property 'innerHTML' of null" error
//     if (data.length) {
//       let html = '';
//       //forEach is to iterate
//       data.forEach(doc => {
//         const ticket = doc.data();
//         // console.log(ticket);
//         const li = `
//           <li>
//             <div class="collapsible-header grey lighten-4">${ticket.type} : ${ticket.category}</div>
//             <div class="collapsible-body white"> ${ticket.description} <br> Location: ${ticket.location}</div>
//           </li>
//         `;
//         html += li;
//       });
//       ticketList.innerHTML = html;
//     } else {
//       ticketList.innerHTML = '<h5 class="center-align">Login to view ticket</h5>';
//     }
//   }  
// };


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    //M is for materialize
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
});