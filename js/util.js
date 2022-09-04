function initPvbIndex(){
  
   // sessionStorage.setItem('mode', "DIO MERDA");
   window.location = ("/pvb/indexpvb.html");
   localStorage.setItem("player",document.getElementById('player').value);

}



function initPvpIndex(){
  
    // sessionStorage.setItem('mode', "DIO MERDA");
    window.location = ("/pvp/indexpvp.html");
    localStorage.setItem("player1",document.getElementById('player1').value);
    localStorage.setItem("player2",document.getElementById('player2').value);
 
 }


 function goHome(){
    window.location=("/index.html");
 }