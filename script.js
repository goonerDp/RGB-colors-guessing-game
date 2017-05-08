var numOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var title = document.querySelector(".title");
var resetButton = document.querySelector("#resetColors");
var modeButtons = document.querySelectorAll(".mode");


init();

function init() {
  setUpModeButtons();
  setUpSquares();
  reset();
}

function setUpModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numOfSquares = 3: numOfSquares = 6;
      reset();
    });
  };
}

function setUpSquares() {
  for (var i = 0; i < squares.length; i++) {
    //add event listeners
    squares[i].addEventListener("click", function() {
      //grab color of picked square
      var clickedColor = this.style.background;
      //compare color to pickedColor
      if(clickedColor === pickedColor) {
        messageDisplay.innerText = "Correct!";
        changeColors(clickedColor);
        title.style.background = pickedColor;
        resetButton.textContent = "Play Again?";
      } else {
        this.style.background = "#232323";
        messageDisplay.innerText = "Try again...";
      }
    });
  };
}



function reset() {
  //generate all new colors
  colors = generateRandomColors(numOfSquares);
  //pick new random color from array
  pickedColor = pickColor();
  //change color in the title
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
  //change colors of the squares
  for (var i = 0; i < squares.length; i++) {
    if(colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  title.style.background = "rgb(39, 128, 140)";
}

resetButton.addEventListener("click", function() {
  reset();
});


function generateRandomColors(num) {
  //make an array
  var arr = [];
  //repeat num tie
  for (var i = 0; i < num; i++) {
    //get random color and push into array
    arr.push(randomColor());
  }
  //return that array
  return arr;
};

function randomColor() {
  //pick a "red" from 0 - 255
  var r = Math.floor(Math.random() * 256);
  //pick a "blue" from 0 - 255
  var g = Math.floor(Math.random() * 256);
  //pick a "green" from 0 - 255
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
};

function changeColors(color) {
  for(var i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
};

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
