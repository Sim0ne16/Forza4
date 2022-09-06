function initPvbIndex() {
  var player = document.getElementById("player").value;
  if (player == "") {
    alert(
      "Il nome del giocatore non può essere vuoto!!!"
    );
  } else {
    window.location = "/pvb/indexpvb.html";
    localStorage.setItem("player", document.getElementById("player").value);
  }
}

function initPvpIndex() {
  var player1 = document.getElementById("player1").value;
  var player2 = document.getElementById("player2").value;
  if (player1 == "" || player2 == "") {
    alert(
      "I campi non possono essere vuoti!!!"
    );
  } else {
    window.location = "/pvp/indexpvp.html";
    localStorage.setItem("player1", document.getElementById("player1").value);
    localStorage.setItem("player2", document.getElementById("player2").value);
  }
}

function goHome() {
  window.location = "/index.html";
}



function changeColor() {
  var humanColor = document.getElementById("color-coins-human");
  var aiColor = document.getElementById("color-coins-ai");

  var humanColorClass = document.getElementsByClassName("human-coin");
  var aiColorClass = document.getElementsByClassName("cpu-coin");
  

  for (var i = 0; i < humanColorClass.length; i++) {

    humanColorClass[i].style.background = humanColor.value;
  }

  for (var i = 0; i < aiColorClass.length; i++) {

    aiColorClass[i].style.background = aiColor.value;
  }
  
}
