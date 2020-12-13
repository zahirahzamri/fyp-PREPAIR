var firebaseConfig = {
    apiKey: "AIzaSyCsxKi2KKih58Jg_0U60utxgLGpBQ0inWE",
    authDomain: "fyp-prepair-a8dc2.firebaseapp.com",
    databaseURL: "https://fyp-prepair-a8dc2.firebaseio.com",
    projectId: "fyp-prepair-a8dc2",
    storageBucket: "fyp-prepair-a8dc2.appspot.com",
    messagingSenderId: "1057748092588",
    appId: "1:1057748092588:web:89226686d9f359472f4109",
    measurementId: "G-NNB2ZEVX6T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();
const store = firebase.storage();
const functions = firebase.functions();

// update firestore settings
db.settings({ timestampsInSnapshots: true});