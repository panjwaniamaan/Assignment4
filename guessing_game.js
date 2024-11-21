let secretNumber;
let remainingGuesses = 10;

function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    remainingGuesses = 10;
    document.getElementById('feedback').textContent = '';
    document.getElementById('remaining-guesses').textContent = `You have ${remainingGuesses} guesses remaining.`;
    document.getElementById('restart-button').style.display = 'none';
    document.getElementById('guess-button').disabled = false;
}

document.getElementById('guess-button').addEventListener('click', () => {
    const guess = parseInt(document.getElementById('guess-input').value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById('feedback').textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }

    remainingGuesses--;
    if (guess === secretNumber) {
        document.getElementById('feedback').textContent = 'Congratulations! You guessed the number!';
        document.getElementById('guess-button').disabled = true;
        document.getElementById('restart-button').style.display = 'inline-block';
    } else if (remainingGuesses === 0) {
        document.getElementById('feedback').textContent = `Game over! The number was ${secretNumber}.`;
        document.getElementById('guess-button').disabled = true;
        document.getElementById('restart-button').style.display = 'inline-block';
    } else {
        document.getElementById('feedback').textContent = guess > secretNumber ? 'Too high!' : 'Too low!';
        document.getElementById('remaining-guesses').textContent = `You have ${remainingGuesses} guesses remaining.`;
    }
});

document.getElementById('restart-button').addEventListener('click', startGame);

startGame();
