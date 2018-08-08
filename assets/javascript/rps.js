$(document).ready(function () {

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
  var playersRef = database.ref("players/");
  var playerOneExists = false;
  var playerTwoExists = false;
  var playerOneChose = false;
  var playerTwoChose = false;

  var winsPlayer1 = 0;
  var lossesPlayer1 = 0;
  var winsPlayer2 = 0;
  var lossesPlayer2 = 0;

  function renderChoices1() {
    rock1 = $("<button>");
    rock1.attr("data-choice", "choiceRock");
    rock1.attr("class", "choiceButton1");
    rock1.text("ROCK");
    paper1 = $("<button>");
    paper1.attr("data-choice", "choicePaper");
    paper1.attr("class", "choiceButton1");
    paper1.text("PAPER");
    scissors1 = $("<button>");
    scissors1.attr("data-choice", "choiceScissors");
    scissors1.attr("class", "choiceButton1");
    scissors1.text("SCISSORS");
    $("#choices1").empty();
    $("#choices1").append(rock1);
    $("#choices1").append(paper1);
    $("#choices1").append(scissors1);
  };

  function renderChoices2() {
    rock2 = $("<button>");
    rock2.attr("data-choice", "choiceRock");
    rock2.attr("class", "choiceButton2");
    rock2.text("ROCK");
    paper2 = $("<button>");
    paper2.attr("data-choice", "choicePaper");
    paper2.attr("class", "choiceButton2");
    paper2.text("PAPER");
    scissors2 = $("<button>");
    scissors2.attr("data-choice", "choiceScissors");
    scissors2.attr("class", "choiceButton2");
    scissors2.text("SCISSORS");
    $("#choices2").empty();
    $("#choices2").append(rock2);
    $("#choices2").append(paper2);
    $("#choices2").append(scissors2);
  };

  function nextGame() {
    playersRef.child("playerchoice1").remove();
    playersRef.child("playerchoice2").remove();
    playerChoice1 = "";
    playerChoice2 = "";
    $("#win-lose").text("");
  };

  playersRef.on("value", function (snapshot) {
    if (snapshot.child("player1").exists()) {
      playerOneExists = true;
    };
    if (snapshot.child("player2").exists()) {
      playerTwoExists = true;
    };

    $("#name-submit").on("click", function (event) {
      event.preventDefault();
      if (playerOneExists && !playerTwoExists) {
        player2 = $("#name-input").val().trim();
        playersRef.child("player2").set({
          "name": player2,
          "wins": winsPlayer2,
          "losses": lossesPlayer2
        });
        $("#playerName2").text(player2);
        $("#name-entry").addClass("hidden");
        renderChoices2();
      } else if (!playerOneExists) {
        player1 = $("#name-input").val().trim();
        playersRef.child("player1").set({
          "name": player1,
          "wins": winsPlayer1,
          "losses": lossesPlayer1
        });
        $("#playerName1").text(player1);
        $("#name-entry").addClass("hidden");
        renderChoices1();
      }
    });
  });

  database.ref().on("value", function (snapshot) {
    if (snapshot.child("players/player1/playerchoice1").exists()) {
      playerOneChose = true;
    };
    if (snapshot.child("players/player2/playerchoice2").exists()) {
      playerTwoChose = true;
    };
    console.log(playerOneChose);
    console.log(playerTwoChose);

    $(document).on("click", ".choiceButton1", function () {
      if (!playerOneChose) {
        playerChoice1 = $(this).attr("data-choice");
        playersRef.child("player1/playerchoice1").set({ "choice1": playerChoice1 });
        playerOneChose = true;
      }
    });


    $(document).on("click", ".choiceButton2", function () {
      if (!playerTwoChose) {
        playerChoice2 = $(this).attr("data-choice");
        playersRef.child("player2/playerchoice2").set({ "choice2": playerChoice2 });
        playerTwoChose = true;
      }
    });

    if (playerOneChose && playerTwoChose) {
      if (snapshot.child("players/player1/player1choice/choice1").val() === snapshot.child("players/player2/player2choice/choice2").val() ) {
        $("#win-lose").text("Tie game");
        setTimeout(nextGame(), 2000);
      }
    }
  });
})