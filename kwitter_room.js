var firebaseConfig = {
      apiKey: "AIzaSyDmGMnTxzQIUoT4Z8YCdlkero3sjidLruY",
      authDomain: "special-chat-by-royce.firebaseapp.com",
      databaseURL: "https://special-chat-by-royce.firebaseio.com",
      projectId: "special-chat-by-royce",
      storageBucket: "special-chat-by-royce.appspot.com",
      messagingSenderId: "370750294990",
      appId: "1:370750294990:web:486f497a1b28bb29bd799f"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
user_name=localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML="Welcome "+user_name+"!";
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
console.log("Room_names- "+Room_names);
row="<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
document.getElementById("output").innerHTML+=row;
      //End code
      });});}
getData();
function addRoom(){
      var room_name=document.getElementById("room_name").value;
      localStorage.setItem("room name",room_name);
      firebase.database().ref("/").child(room_name).update({
            purpose:"adding room name"
      });
      window.location="kwitter_page.html";
}
function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room name",name);
      window.location="kwitter_page.html";
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room name");
      window.location="index.html";
}

