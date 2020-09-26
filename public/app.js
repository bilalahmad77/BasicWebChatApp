
document.getElementById('send').addEventListener('click',function(e)
{
     var userDn = firebase.auth().currentUser;
     console.log(userDn.displayName)
    var msg=document.getElementById('msg');
    firebase.database().ref('chat').push
    ({
      user:userDn.displayName,
        txt:msg.value
    })
    msg.value ='';
});

var msgs = document.getElementById('msgs');
firebase.database().ref('chat').on('value',function(snapshot)
{
    msgs.innerHTML ='';
    snapshot.forEach(function(e)
    {
        var x = e.val();
        msgs.innerHTML+=`<p> ${x.user}:${x.txt}</p>`

    });
});


const facebook_login = ()=> {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        var displayName = document.querySelector("#display-name")
        displayName.innerHTML=user.displayName;
        var img = document.createElement('img');
        img.src= user.photoURL;
        document.getElementById('profile-pic').appendChild(img);
        document.getElementById("sign-in").style.visibility="hidden";
        document.getElementById("Logout").style.visibility="visible";
        document.getElementById("msg").style.visibility="visible";
        document.getElementById("send").style.visibility="visible";
        document.getElementById("msgs").style.visibility="visible";
        document.getElementById("profile-pic").style.textAlign = "center";
        document.getElementById("display-name").style.textAlign = "center";
      }).catch(function(error) {
       console.log(error.message);
      });
}

const logout =() =>
{
    firebase.auth().signOut().then(function() {
        window.location.href = 'index.html';
      }).catch(function(error) {
        // An error happened.
      });
}
window.onload = function() {
  document.getElementById('Logout').style.visibility = 'hidden';
  document.getElementById('msg').style.visibility = 'hidden';
  document.getElementById('msgs').style.visibility = 'hidden';
  document.getElementById('send').style.visibility = 'hidden';
};
