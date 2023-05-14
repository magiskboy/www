import "https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js";
import "https://www.gstatic.com/firebasejs/8.1.2/firebase-analytics.js";

var firebaseConfig = {
  apiKey: "AIzaSyAny8MQuh4uEziV2FsJAEBMHvRcCjHeDj0",
  authDomain: "myblog-e552f.firebaseapp.com",
  databaseURL: "https://myblog-e552f-default-rtdb.firebaseio.com",
  projectId: "myblog-e552f",
  storageBucket: "myblog-e552f.appspot.com",
  messagingSenderId: "488762331302",
  appId: "1:488762331302:web:8edebcb8c2116cff0b2467",
  measurementId: "G-WVWZEJLY14",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
