import "https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js";
import "https://www.gstatic.com/firebasejs/8.1.2/firebase-analytics.js";

var firebaseConfig = {
  apiKey: "{{ .Site.Params.Firebase.ApiKey }}",
  authDomain: "{{ .Site.Params.Firebase.AuthDomain }}",
  databaseURL: "{{ .Site.Params.Firebase.DatabaseURL }}",
  projectId: "{{ .Site.Params.Firebase.ProjectId }}",
  storageBucket: "{{ .Site.Params.Firebase.StorageBucket }}",
  messagingSenderId: "{{ .Site.Params.Firebase.SenderId }}",
  appId: "{{ .Site.Params.Firebase.AppId }}",
  measurementId: "{{ .Site.Params.Firebase.MeasurementId }}"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
