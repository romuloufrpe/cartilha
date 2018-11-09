import * as firebase from 'firebase';
import * as c from "./constants"

//Inicializa Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCQiptARgPa6TscVbzdAQpCNOazTWs54Eg",
    authDomain: "validades-310c4.firebaseapp.com",
    databaseURL: "https://validades-310c4.firebaseio.com",
    projectId: "validades-310c4",
    storageBucket: "validades-310c4.appspot.com",
    messagingSenderId: "571233532713"
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();
export const provider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();