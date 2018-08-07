$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBTOxlC9o0iLr-gwWon3KmHuw5xzY-_98o",
    authDomain: "my-awesome-project-bd932.firebaseapp.com",
    databaseURL: "https://my-awesome-project-bd932.firebaseio.com",
    projectId: "my-awesome-project-bd932",
    storageBucket: "my-awesome-project-bd932.appspot.com",
    messagingSenderId: "696684588250"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var player1;
  var player2;
  var playerChoice1;
  var playerChoice2;

  var winsPlayer1 = 0;
  var lossesPlayer1 = 0;
  var winsPlayer2 = 0;
  var lossesPlayer2 = 0;

  function renderChoices() {
    rock1 = $("<button>");
    rock1.attr("id", "choiceRock1");
    rock1.attr("value", "ROCK");
    paper1 = $("<button>");
    paper1.attr("id", "choiceRock1");
    paper1.attr("value", "PAPER");
    scissors1 = $("<button>");
    scissors1.attr("id", "choiceScissors1");
    scissors1.attr("value", "SCISSORS");
    $("#choices1").append(rock1);
    $("#choices1").append(paper1);
    $("#choices1").append(scissors1);
    rock2 = $("<button>");
    rock2.attr("id", "choiceRock2");
    rock2.attr("value", "ROCK");
    paper2 = $("<button>");
    paper2.attr("id", "choiceRock2");
    paper2.attr("value", "PAPER");
    scissors2 = $("<button>");
    scissors2.attr("id", "choiceScissors2");
    scissors2.attr("value", "SCISSORS");
    $("#choices2").append(rock2);
    $("#choices2").append(paper2);
    $("#choices2").append(scissors2);
  }

  $("#name-submit").on("click", function(event) {
    event.preventDefault();
    if (!database.ref("player1")) {
      player1 = $("#name-input").val().trim();
      database.ref("player1").set({"name": player1});
      database.ref("player1").set({"wins": winsPlayer1});
      database.ref("player1").set({"losses": lossesPlayer1}); 
      $("#playerName1").text(player1);
    } else if (database.ref("player1")) {
      player2 = $("#name-input").val().trim();
      database.ref("player2").set({"name": player2});
      database.ref("player2").set({"wins": winsPlayer2});
      database.ref("player2").set({"losses": lossesPlayer2});
      $("#playerName2").text(player2);
    } if (player2) {


    }
  })

})