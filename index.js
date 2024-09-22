const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    boxes.forEach((box, index) => {
        box.classList.add("clear");  // Apply the clear class
        setTimeout(() => {
            box.classList.remove("clear");  // Remove after a short delay
            box.innerText = "";
            boxes[index].style.pointerEvents = "all";
            box.classList = `box box${index+1}`;
        }, 500);  // Wait for the fade-out effect to finish
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


initGame();

function swapTurn() {
   if(currentPlayer === "X") {
       currentPlayer = "O";
   } else {
       currentPlayer = "X";
   }
   //ui upadate
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        // all 3 boxes should be non-empty and exactly the same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                // check if the winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                }

                // Disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                });

                // Highlight winning boxes
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");

                // Add the emoji celebration
                gameInfo.innerHTML = `Winner Player - ${answer} 🎉`;

                // Trigger confetti
                triggerCelebration();
            }
    });

    // If we have a winner, show the new game button and stop further actions
    if(answer !== "") {
        newGameBtn.classList.add("active");
        return;
    }

    // Check for tie if no winner
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied! 🤝";
        newGameBtn.classList.add("active");
        // Optional: Add tie-specific effect, but no confetti.
        return;
    }
}


// Simple confetti or celebration trigger
function triggerCelebration() {
    document.body.classList.add("celebration"); // Add a class to trigger celebration
}

    

function handleClick(index) {
    if(gameGrid[index] === ""){
boxes[index].innerText = currentPlayer;
gameGrid[index] = currentPlayer;
boxes[index].style.pointerEvents = "none";
//swap krao turn ko
swapTurn();
//koi jeet to nhi gya
checkGameOver();
 
    } 
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);

function triggerCelebration() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}


