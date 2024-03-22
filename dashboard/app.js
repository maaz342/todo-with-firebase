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

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var auth = firebase.auth();

function fetchDataAndUpdateUI(userId) {
  var c = document.getElementById('app');
  c.innerHTML = ""; 

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

auth.onAuthStateChanged(function(user) {
  if (user) {
    var userId = user.uid; 
    fetchDataAndUpdateUI(userId);
  } else {
    console.log("No user is signed in.");
  }
});

function createElem() {
  var r = document.getElementById('myinput');
  var text = r.value;

  var user = auth.currentUser;

  if (user) {
    var userId = user.uid; 
    database.ref('items').push({
      userId: userId,
      text: text
    });

    r.value = ''; 
  } else {
    console.log("No user is signed in."); 
  }
}

function deletea() {
  database.ref('items').remove();
  location.reload();
}