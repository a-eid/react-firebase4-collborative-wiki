const firebase = require('firebase')

var config = {
  // apiKey: "AIzaSyCSw6OGWdIg_vlYv0_vHKmT7lYRkSGCi6U",
  // authDomain: "wicker-61c81.firebaseapp.com",
  databaseURL: "https://wicker-61c81.firebaseio.com",
  serviceAccount: './cred.json'
};

firebase.initializeApp(config);
var fb = firebase.database().ref();

const test = fb.child('test')
test.push({
  test: false
})
  .then(() => console.log("success"))
  .catch( e => console.log(e.message))
