import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAjN89Lhc6Ys8fbiXiTzyy96ptMHmlYqEg",
  authDomain: "reactchatapp-36a29.firebaseapp.com",
  databaseURL: "https://reactchatapp-36a29.firebaseio.com",
  projectId: "reactchatapp-36a29",
  storageBucket: "reactchatapp-36a29.appspot.com",
  messagingSenderId: "771063807352"
};
const fBase = firebase.initializeApp(config);

export default fBase;