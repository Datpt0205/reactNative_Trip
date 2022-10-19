import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBYMQ4Eh3rGJ2pdt10DkFWnfDTBK56kDLY",
  authDomain: "trip-18a8b.firebaseapp.com",
  projectId: "trip-18a8b",
  storageBucket: "trip-18a8b.appspot.com",
  messagingSenderId: "1068841461031",
  appId: "1:1068841461031:web:ad6c3803210829addc7502",
  measurementId: "G-2KZZNCJKK2"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase};
