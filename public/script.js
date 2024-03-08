
const firebaseConfig = {
    apiKey: "AIzaSyB-Krol7ZK7ZKOkmzEkt8ZKiPIfCo9uYyw",
    authDomain: "todo-afb16.firebaseapp.com",
    projectId: "todo-afb16",
    databaseURL:"https://todo-afb16-default-rtdb.firebaseio.com/",
    storageBucket: "todo-afb16.appspot.com",
    messagingSenderId: "616216477830",
    appId: "1:616216477830:web:77418998c3f44e43b89107",
    measurementId: "G-0GH1H8L6WX"
  };
  
  
    const app = firebase.initializeApp(firebaseConfig);
function sign() {
    var email = document.getElementById("useremail");
    var password = document.getElementById("userpassword");
    
  
    console.log(email.value,password.value);
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(email);
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            alert("Email sent Successfully..");
            window.location.href='dashboard'

          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });

    }
  
  
  function login() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
  
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);

        window.location.href='dashboard'

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  
  
  function forget() {
    var email = document.getElementById("email");
  
    firebase
      .auth()
      .sendPasswordResetEmail(email.value)
      .then(() => {
        function JSalert(){
  
            swal("Congrats!", ", Password reset email sent...!", "success");
            
            }
        alert("Password Reset email Was Sent...");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  