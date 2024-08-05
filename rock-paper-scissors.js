

const score = JSON.parse(localStorage.getItem('score')) ||  {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

function pickComputerMove(){
    const randomNumber = Math.random();
    let computerMove = '';
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    }else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    }
    else {
        computerMove = 'scissors';
    }
    return computerMove ;
}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses},
         Ties: ${score.ties}`;
}

function playGame(playerMove){
    let result = '';
    const computerMove = pickComputerMove();
    if (computerMove === playerMove){
        result= 'Tie.';
        score.ties += 1 ;
    }

    else if ( (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper') ){
        result = 'You win.';
        score.wins += 1 ;
    }

    else{
        result = 'You lose.' ;
        score.losses += 1 ;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
    document.querySelector('.js-result')
        .innerHTML = result;
    document.querySelector('.js-moves')
        .innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon">
            <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;

}

let intervalId;/*It must be global because it will
 be use it in clearInterval*/
function autoPlay () {
    const nameElement = document.querySelector('.js-auto-play');
    if ( nameElement.innerHTML === 'Auto Play') {
        intervalId = setInterval(() =>  {
            playGame(pickComputerMove());
        },1000);
        nameElement.innerHTML = 'Stop Play';
    }
    else {
        clearInterval(intervalId );
        nameElement.innerHTML = 'Auto Play';
    }
}

function resetScore() {
    const confirmationMessage = document.querySelector('.js-confirmation-message');
    confirmationMessage.innerHTML = `<p>
                          Are you sure you want to reset the score ?
                          <button class="js-yes-button yes-button">Yes</button>
                          <button class="js-no-button no-button">No</button>
                      </p>`
    document.querySelector('.js-yes-button')
        .addEventListener('click', () => {
            score.wins = 0 ;
            score.losses = 0 ;
            score.ties = 0 ;
            /*we have to reset the score before removing from the localStorage
            because the localStorage will be used if we refresh
            */
            localStorage.removeItem('score');
            setTimeout(() => {
                confirmationMessage.innerHTML = '';
            },200);

            updateScoreElement();
        })
    document.querySelector('.js-no-button')
        .addEventListener('click' , () => {
            setTimeout(() => {
                confirmationMessage.innerHTML = '';
            },200);
        })
}

document.querySelector('.js-rock-button')
    .addEventListener('click',() => playGame('rock'));

document.querySelector('.js-paper-button')
    .addEventListener('click',() => playGame('paper'))

document.querySelector('.js-scissors-button')
    .addEventListener('click',() => playGame('scissors'))

document.querySelector('.js-reset-button')
    .addEventListener('click', resetScore);

document.querySelector('.js-auto-play')
    .addEventListener('click', () => autoPlay());


document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    } else if (event.key === 'a'){
        autoPlay();
    } else if (event.key === 'Backspace'){
        resetScore();
    }
})