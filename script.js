console.log("Welcome to Tic Tac Toe");

document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("gameContainer");
    const startScreen = document.getElementById("startScreen");

    document.getElementById("mode-2p").addEventListener("click", () => {
        gameMode = "2p";
        startScreen.style.display = "none";
        gameContainer.style.display = "flex";
        resetGame();
    });

    document.getElementById("mode-cpu").addEventListener("click", () => {
        gameMode = "computer";
        startScreen.style.display = "none";
        gameContainer.style.display = "flex";
        resetGame();
    });
});

let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;
let gameMode = "2p";


document.getElementById("mode-2p").addEventListener("click", () => {
    gameMode = "2p";
    resetGame();
});

document.getElementById("mode-cpu").addEventListener("click", () => {
    gameMode = "computer";
    resetGame();
});
// Mode switch buttons
document.getElementById("switch-2p").addEventListener("click", () => {
    gameMode = "2p";
    resetGame();
});

document.getElementById("switch-cpu").addEventListener("click", () => {
    gameMode = "computer";
    resetGame();
});

// Dark Mode Toggle
document.getElementById("toggle-dark").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});



const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];

    let won = false;

    wins.forEach((e) => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector(".info").innerText =
                boxtext[e[0]].innerText + " Won";
            isgameover = true;
            won = true;
            document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "500px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "20vw";
        }
    });

    if (!won) {
        let allFilled = Array.from(boxtext).every((b) => b.innerText !== "");
        if (allFilled) {
            document.querySelector(".info").innerText = "Match is a draw!";
            
            // ✅ Show styled popup
            const popup = document.getElementById("drawPopup");
            popup.classList.add("show");

            // Hide popup & reset after 2 seconds
            setTimeout(() => {
                popup.classList.remove("show");
                resetGame();
            }, 2000);
        }
    }
};



const computerMove = () => {
    let emptyBoxes = Array.from(document.getElementsByClassName("box")).filter(
        (b) => b.querySelector(".boxtext").innerText === ""
    );
    if (emptyBoxes.length === 0 || isgameover) return;

    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.querySelector(".boxtext").innerText = turn;
    audioTurn.play();
    checkWin();
    if (!isgameover) {
        turn = changeTurn();
        document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    }
};


let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !isgameover) {
            boxtext.innerText = turn;
            audioTurn.play();
            checkWin();

            if (!isgameover) {
                turn = changeTurn();
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;

                
                if (gameMode === "computer" && turn === "0") {
                    setTimeout(computerMove, 900); 
                }
            }
        }
    });
});

// Reset button
reset.addEventListener("click", () => {
    resetGame();
});

function resetGame() {
    let boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach((element) => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "0px";
}
