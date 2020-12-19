import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAcMd2-4_lWfIdYyqU2lmlwSkCWHx7Po1M",
    authDomain: "react-app-journal-8aa52.firebaseapp.com",
    projectId: "react-app-journal-8aa52",
    storageBucket: "react-app-journal-8aa52.appspot.com",
    messagingSenderId: "493438175112",
    appId: "1:493438175112:web:d5126f90581e91df04dc3d"
};


firebase.initializeApp(firebaseConfig); //inicialiazacion de firebase

const db = firebase.firestore(); // esta es la base de datos
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); //para hacer la autenticacion de google

export {
    db,
    googleAuthProvider,
    firebase
}