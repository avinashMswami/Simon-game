const buttoncolors = ["red", "blue", "green", "yellow"];
const gamepattern = [];
const userClickedPattern = [];
var level = 0;
var started = false;

$(".bttt").on("click", function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $(".bttt").addClass("hidden");
  }
  
});



// $(document).keypress(function() {
 
// });

$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatepress(userChosenColor);
  checkanswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern.length = 0; 
  level++;
  $("#level-title").text("Level " + level);
  var randomnumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttoncolors[randomnumber];
  gamepattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColor);
}

function playsound(name) {
  var music = new Audio(name + ".mp3");
  music.play();
}

function animatepress(currentcolor) {
  $("#" + currentcolor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentcolor).removeClass("pressed");
  }, 100);
}

function checkanswer(currentlevel) {
  if (userClickedPattern[currentlevel] === gamepattern[currentlevel]) {
    if (userClickedPattern.length === gamepattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
      playsound("wrong");
      $("body").addClass("game-over")
      setTimeout(function(){
        $("body").removeClass("game-over");

      },200);
      $("#level-title").text("Can't win ??, Try again!");
      startover();
      $(".bttt").text("Restart").removeClass("hidden");
  }
}
function startover(){
    level = 0;
    gamepattern.length = 0;
    started = false;

}