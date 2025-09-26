console.log("Rock paper scissors.");

let humanScore = 0;
let computerScore = 0;

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
    return prompt("Rock paper scissors!").toLowerCase();
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
    let computerChoice;
    let humanChoice;
    let winner;
    for (i = 0; i < 5; i++) {
        computerChoice = getComputerChoice();
        humanChoice = getHumanChoice();
        winner = playRound(humanChoice, computerChoice);
        if (winner == 'computer') {
            computerScore++;
        } else if (winner == 'human') {
            humanScore++;
        }
        console.log(`Game ${i+1}: Computer - ${computerChoice}, Human - ${humanChoice}; winner: ${winner}`);
    }
    if (humanScore == computerScore) {
        console.log("Draw!");
    } else {
        console.log(`Winner: ${(humanScore > computerScore) ? 'You' : 'computer'}!`);
    }
}

playGame();

