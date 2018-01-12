import firebase from 'firebase'

const config = {
  apiKey: "FIREBASE_API_KEY",
  authDomain: "domain_name.firebaseapp.com",
  databaseURL: "https://database_url.firebaseio.com",
  projectId: "project_id",
  storageBucket: "project_id.appspot.com",
  messagingSenderId: "messaging_sender_id"
};

export const firebaseApp = firebase.initializeApp(config)
export const gemeentesRef = firebaseApp.database().ref().child('Gemeentes')
