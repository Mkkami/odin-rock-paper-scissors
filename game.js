
let username = prompt("Enter your name");

const nameDisplay = document.querySelector(".username.user")
const humanScore = document.getElementById('user-score');
const computerScore = document.getElementById('computer-score');
const userChoices = Array.from(document.querySelectorAll(".user img"));
const computerChoices = Array.from(document.querySelectorAll(".computer img"))
const winner = document.getElementById('winner');
const resetButton = document.getElementById('reset');

if (username != null && username.trim() != "" ) {
    nameDisplay.textContent = username;
} else {
    username = 'Player'
}

function getComputerChoice() {
    let randomGuess = Math.floor(Math.random() *3) +1;
    switch (randomGuess) {
        case 1:
            return 'rock';
            break;
        case 2:
            return 'paper';
            break;
        case 3:
            return 'scissors';
            break;
        default:
            return "something went wrong...";
    }
}

function getHumanChoice() {
    for (element of userChoices) {
        if (element.getAttribute('selected')==='true') {
            return element.className;
        }
    }
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice == computerChoice) {
        return "draw";
    } 
    if (humanChoice == 'rock') {
        switch(computerChoice) {
            case 'scissors': return 'human';
            case 'paper': return 'computer';
        }
    }
    if (humanChoice == 'paper') {
        switch(computerChoice) {
            case 'scissors': return 'computer';
            case 'rock': return 'human';
        }
    }
    if (humanChoice == 'scissors') {
        switch(computerChoice) {
            case 'rock': return 'computer';
            case 'paper': return 'human';
        }
    }
}

function playGame() {
    let computerChoice = getComputerChoice();
    displayComputerChoice(computerChoice);
    let humanChoice = getHumanChoice();
    console.log(humanChoice + '; ' + computerChoice);
    let winner = playRound(humanChoice, computerChoice);

    if (winner === 'human') {
        addScore(humanScore);
    } else if (winner === 'computer') {
        addScore(computerScore);
    } else {
        return;
    }

}

function addScore(score) {
    let s = +score.innerText;
    s++;
    score.innerText = s;
}

function displayComputerChoice(choice) {
    computerChoices.forEach(element => {
        if (element.className == choice) {
            element.style.backgroundColor = 'gray';
            return;
        }
    });
}

userChoices.forEach(element => {
    element.addEventListener('click', (e) => {
        if (e.target.getAttribute('locked') !== 'true') {
            e.target.style.backgroundColor = 'gray';
            e.target.setAttribute('selected', 'true');
            lockControls();
            playGame();
            if (humanScore.innerText == 3 || computerScore.innerText == 3) {
                displayWinner();
                return;
            }
            resetControls(1);
        }
    })
});

function lockControls() {
    userChoices.forEach(element => {
        element.setAttribute('locked', 'true');
    })
}

async function resetControls(seconds) {
    resetButton.toggleAttribute('disabled');
    await sleep(seconds*1000);
    userChoices.forEach(element => {
        element.setAttribute('locked', 'false');
        element.setAttribute('selected', 'false');
        element.style.backgroundColor = 'white';
    })
    computerChoices.forEach(element => {
        element.style.backgroundColor = 'white';
    })
    resetButton.toggleAttribute('disabled');
}

function resetScore() {
    humanScore.innerText = '0';
    computerScore.innerText = '0';
    winner.hidden = true;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function displayWinner() {
    if (humanScore.innerText == 3) {
        winner.innerText = `Winner: ${username}`;
    } else {
        winner.innerText = `Winner: Computer!`;
    }   
    winner.removeAttribute('hidden');
}

resetButton.addEventListener('click', (e) => {
    resetControls(0);
    resetScore();
})