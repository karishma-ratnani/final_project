const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  
    apiKey: "AIzaSyDJhYt5QZKz_Fu9OEmJhKyaXcu4zKIi6AY",
    authDomain: "final-project-345a3.firebaseapp.com",
    projectId: "final-project-345a3",
    storageBucket: "final-project-345a3.appspot.com",
    messagingSenderId: "18806877634",
    appId: "1:18806877634:web:987e13d0010a6eac17ba5b"
    } 


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase