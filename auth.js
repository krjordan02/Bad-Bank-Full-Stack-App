// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
var firebase = require("firebase/app");
require("firebase/auth");

// idToken comes from the client app
function authenticateToken(idToken){

  auth.verifyIdToken(idToken)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    return uid;
  })
  .catch((error) => {
    // Handle error
  });
}

module.exports = {authenticateToken};