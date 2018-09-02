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

  var player1 = false;
  var player2 = false;
  var playerName1;
  var playerChoice1;
  var playerChoice2;
  var playersRef = database.ref("players/");
  var playerOneExists = false;
  var playerTwoExists = false;
  var playerOneChose = false;
  var playerTwoChose = false;
  var playerOneWins = false;
  var playerTwoWins = false;
  var tieGame = false;

  var winsPlayer1 = 0;
  var lossesPlayer1 = 0;
  var winsPlayer2 = 0;
  var lossesPlayer2 = 0;

  var message = "";
  var newMessage = "";
  var chatter;
  var chatRef = database.ref("chat/");

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

  function tieGameFunction() {
    $("#win-lose").text("Tie game");
    setTimeout(nextGame, 2000);
  }

  function nextGame() {
    playersRef.child("player1/playerchoice1/").remove();
    playersRef.child("player2/playerchoice2/").remove();
    playerChoice1 = "";
    playerChoice2 = "";
    playerOneChose = false;
    playerTwoChose = false;
    playerOneWins = false;
    playerTwoWins = false;
    tieGame = false;
    $("#win-lose").text("");
    $("button").removeClass("chosen");
  };

  //Game section
  playersRef.on("value", function (snapshot) {
    if (snapshot.child("player1").exists()) {
      playerOneExists = true;
      playerName1 = snapshot.child("player1/name").val();
      $("#playerName1").text(playerName1);
    };
    if (snapshot.child("player2").exists()) {
      playerTwoExists = true;
      playerName2 = snapshot.child("player2/name").val();
      $("#playerName2").text(playerName2);
    };

    $("#name-submit").on("click", function (event) {
      event.preventDefault();
      if (playerOneExists && !playerTwoExists) {
        playerName2 = $("#name-input").val().trim();
        playersRef.child("player2").set({
          "name": playerName2,
          "wins": winsPlayer2,
          "losses": lossesPlayer2
        });
        $("#name-entry").addClass("hidden");
        player2 = true;
        renderChoices2();
      } else if (!playerOneExists) {
        playerName1 = $("#name-input").val().trim();
        playersRef.child("player1").set({
          "name": playerName1,
          "wins": winsPlayer1,
          "losses": lossesPlayer1
        });
        $("#name-entry").addClass("hidden");
        player1 = true;
        renderChoices1();
      }
    });
  });

  $(document).on("click", ".choiceButton1", function () {
    if (!playerOneChose) {
      playerChoice1 = $(this).attr("data-choice");
      playersRef.child("player1/playerchoice1").set({ "choice1": playerChoice1 });
      $(this).addClass("chosen");
      playerOneChose = true;
    }
  });

  $(document).on("click", ".choiceButton2", function () {
    if (!playerTwoChose) {
      playerChoice2 = $(this).attr("data-choice");
      playersRef.child("player2/playerchoice2").set({ "choice2": playerChoice2 });
      $(this).addClass("chosen");
      playerTwoChose = true;
    }
  });

  database.ref().on("value", function (snapshot) {
    if (snapshot.child("players/player1/playerchoice1").exists()) {
      playerOneChose = true;
    };
    if (snapshot.child("players/player2/playerchoice2").exists()) {
      playerTwoChose = true;
    };

    if (playerOneChose && playerTwoChose) {
      if (snapshot.child("players/player1/playerchoice1/choice1").val() === snapshot.child("players/player2/playerchoice2/choice2").val()) {
        tieGame = true;
      } else if (snapshot.child("players/player1/playerchoice1/choice1").val() === "choiceRock" && snapshot.child("players/player2/playerchoice2/choice2").val() === "choiceScissors") {
        playerOneWins = true;
      } else if (snapshot.child("players/player1/playerchoice1/choice1").val() === "choicePaper" && snapshot.child("players/player2/playerchoice2/choice2").val() === "choiceRock") {
        playerOneWins = true;
      } else if (snapshot.child("players/player1/playerchoice1/choice1").val() === "choiceScissors" && snapshot.child("players/player2/playerchoice2/choice2").val() === "choicePaper") {
        playerOneWins = true;
      } else if (snapshot.child("players/player2/playerchoice2/choice2").val() === "choiceRock" && snapshot.child("players/player1/playerchoice1/choice1").val() === "choiceScissors") {
        playerTwoWins = true;
      } else if (snapshot.child("players/player2/playerchoice2/choice2").val() === "choicePaper" && snapshot.child("players/player1/playerchoice1/choice1").val() === "choiceRock") {
        playerTwoWins = true;
      } else if (snapshot.child("players/player2/playerchoice2/choice2").val() === "choiceScissors" && snapshot.child("players/player1/playerchoice1/choice1").val() === "choicePaper") {
        playerTwoWins = true;
      }
    };

    if (playerOneWins) {
      $("#win-lose").text("Player 1 wins!");
      winsPlayer1++;
      lossesPlayer2++;
      playerOneWins = false;
      setTimeout(nextGame, 2000);
    } else if (playerTwoWins) {
      $("#win-lose").text("Player 2 wins!");
      winsPlayer2++;
      lossesPlayer1++;
      playerTwoWins = false;
      setTimeout(nextGame, 2000);
    } else if (tieGame) {
      tieGameFunction();
    };

    $("#win-count1").text("Wins: " + winsPlayer1);
    $("#loss-count1").text("Losses: " + lossesPlayer1);
    $("#win-count2").text("Wins: " + winsPlayer2);
    $("#loss-count2").text("Losses: " + lossesPlayer2);
  });

  //Chat section
  $("#text-submit").on("click", function (event) {
    message = $("#text-input").val().trim();
    $("#text-input").val("");
    if (player1) {
      database.ref().child("chat").push({
        "message": message,
        "sender": playerName1
      });
    } else if (player2) {
      database.ref().child("chat").push({
        "message": message,
        "sender": playerName2
      });
    };
  });

  chatRef.on("child_added", function (childSnapshot) {
    newMessage = childSnapshot.child("message").val();
    chatter = childSnapshot.child("sender").val();
    $("#messages").append(chatter + ": " + newMessage + "<br>");
  });

  //Cleanup of Firebase on disconnect
  database.ref("players/player1/").onDisconnect().remove();
  database.ref("players/player2/").onDisconnect().remove();
  database.ref("chat/").onDisconnect().remove();
})