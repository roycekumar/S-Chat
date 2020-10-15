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
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room name");
console.log(user_name);
console.log(room_name);
var t=new Date()
function send(){
      if(t.getMonth()=="0"){
            Month="January";
      }
      else if(t.getMonth()=="1"){
            Month="February";
      }
      else if(t.getMonth()=="2"){
            Month="March";
      }
      else if(t.getMonth()=="3"){
            Month="April";
      }
      else if(t.getMonth()=="4"){
            Month="May";
      }
      else if(t.getMonth()=="5"){
            Month="June";
      }
      else if(t.getMonth()=="6"){
            Month="July";
      }
      else if(t.getMonth()=="7"){
            Month="August";
      }
      else if(t.getMonth()=="8"){
            Month="September";
      }
      else if(t.getMonth()=="9"){
            Month="October";
      }
      else if(t.getMonth()=="10"){
            Month="November";
      }
      else{
            Month="December";
      }
      time_full=Month+" "+t.getDate()+"    "+t.getHours()+":"+t.getMinutes();
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like: 0,
            time:time_full
      });
      document.getElementById("msg").value = "";
}
function getData() {
      var check_admin=localStorage.getItem("user_name");
            firebase.database().ref("/" + room_name).on('value', function (snapshot) {
                  document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                        childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                              firebase_message_id = childKey;
                              message_data = childData;
                              //Start code
                              console.log("This is messageid"+firebase_message_id);
                              console.log(message_data);
                              name=message_data["name"];

                              message=message_data["message"];
                              like=message_data["like"];
                              Time=message_data["time"]
                              name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'>"+"            "+Time+"</h4>";
                              message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
                              like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>"
                              if (check_admin==name){
                                    span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like +"</span></button><button id="+firebase_message_id+" onclick='delte(this.id)' class='btn btn-success delete'>Delete</button><hr>";
                              }
                              else{
                                    span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like +"</span></button><hr>";
                              }
                  
                              row=name_with_tag+message_with_tag+like_button+span_with_tag;
                              document.getElementById("output").innerHTML+=row;
                              //End code
                        }
                  });
            });    

}
getData();
function updateLike(message_id){
      console.log("Clicked on the button - "+message_id);
      button_id=message_id;
      console.log("this "+button_id)
      likes=document.getElementById(button_id).value;
      updated_likes=Number(likes)+1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room name");
      window.location="index.html";
}
function delte(message_id){
      room_name_again=localStorage.getItem("room name");
      button_id=message_id
      updated=button_id.slice(1,-1);
      firebase.database().ref(room_name_again+'/'+button_id).remove();

}