import firebase from "firebase";
const firebaseConfig = {

    apiKey: "AIzaSyB04QLuMDf7zLgvR42civGrHdBK6tgh5So",
    authDomain: "instag-c41c5.firebaseapp.com",
    databaseURL: "https://instag-c41c5-default-rtdb.firebaseio.com",
    projectId: "instag-c41c5",
    storageBucket: "instag-c41c5.appspot.com",
    messagingSenderId: "849776078411",
    appId: "1:849776078411:web:ce9d97ec687e53e7c667ce"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();



export { auth, db, storage };

