const firebaseConfig = {
  apiKey: "AIzaSyB-Krol7ZK7ZKOkmzEkt8ZKiPIfCo9uYyw",
  authDomain: "todo-afb16.firebaseapp.com",
  projectId: "todo-afb16",
  databaseURL: "https://todo-afb16-default-rtdb.firebaseio.com/",
  storageBucket: "todo-afb16.appspot.com",
  messagingSenderId: "616216477830",
  appId: "1:616216477830:web:77418998c3f44e43b89107",
  measurementId: "G-0GH1H8L6WX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

// Get a reference to the authentication service
var auth = firebase.auth();

// Function to fetch data from Firebase and update UI for a specific user
function fetchDataAndUpdateUI(userId) {
  var c = document.getElementById('app');
  c.innerHTML = ""; // Clear existing UI

  // Fetch data from Firebase for the specified user
  database.ref('items').orderByChild('userId').equalTo(userId).once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var data = childSnapshot.val();
      var key = childSnapshot.key;

      var a = document.createElement('div');
      a.classList.add('list-item');

      var txt = document.createTextNode(data.text);
      a.appendChild(txt);

      c.appendChild(a);

      var editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.onclick = function() {
        var newText = prompt('Enter new text:', data.text);
        if (newText !== null) {
          // Update data in Firebase
          database.ref('items/' + key).update({ text: newText });
        }
      };
      a.appendChild(editButton);

      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = function() {
        database.ref('items/' + key).remove();
        location.reload();
      };
      a.appendChild(deleteButton);
    });
  });
}

// Listen for authentication state changes
auth.onAuthStateChanged(function(user) {
  if (user) {
    var userId = user.uid; // Fetch the user ID from the authenticated user
    fetchDataAndUpdateUI(userId);
  } else {
    console.log("No user is signed in.");
  }
});

function createElem() {
  var r = document.getElementById('myinput');
  var text = r.value;

  // Get the currently authenticated user
  var user = auth.currentUser;

  if (user) {
    var userId = user.uid; // Fetch the user ID from the authenticated user
    // Push new data to Firebase with the user's ID
    database.ref('items').push({
      userId: userId,
      text: text
    });

    r.value = ''; // Clear input field
  } else {
    console.log("No user is signed in."); // Handle the case when no user is signed in
  }
}

function deletea() {
  database.ref('items').remove();
  location.reload();
}