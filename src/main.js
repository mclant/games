import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import firebase from 'firebase/app'
import store from './store/store';
import 'firebase/firestore'

Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCdV07sFXxpcCaIqxI_szlaw2GQP5hga_E",
  authDomain: "games-ff2ee.firebaseapp.com",
  databaseURL: "https://games-ff2ee.firebaseio.com",
  projectId: "games-ff2ee",
  storageBucket: "games-ff2ee.appspot.com",
  messagingSenderId: "890578247914",
  appId: "1:890578247914:web:a449a9762a31bf6a67f793"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
