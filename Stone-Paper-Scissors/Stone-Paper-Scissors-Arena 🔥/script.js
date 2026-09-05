const emojis = { rock: '✊', paper: '✋', scissors: '✌️' };
const beats = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

let wins = 0, ties = 0, losses = 0;

const playerEmoji = document.getElementById('playerEmoji');
const cpuEmoji = document.getElementById('cpuEmoji');
const playerIcon = document.getElementById('playerIcon');
const cpuIcon = document.getElementById('cpuIcon');
const resultEl = document.getElementById('result');
const winCountEl = document.getElementById('winCount');
const tieCountEl = document.getElementById('tieCount');
const loseCountEl = document.getElementById('loseCount');

function play(playerChoice) {
  const options = ['rock', 'paper', 'scissors'];
  const cpuChoice = options[Math.floor(Math.random() * 3)];

  playerEmoji.textContent = emojis[playerChoice];
  cpuEmoji.textContent = emojis[cpuChoice];

  playerIcon.className = 'slot-icon c-' + playerChoice;
  cpuIcon.className = 'slot-icon c-' + cpuChoice;

  [playerEmoji, cpuEmoji].forEach(el => {
    el.classList.remove('shake');
    void el.offsetWidth; // restart animation
    el.classList.add('shake');
  });

  let outcome, cssClass;
  if (playerChoice === cpuChoice) {
    outcome = "It's a tie!";
    cssClass = 'tie';
    ties++;
  } else if (beats[playerChoice] === cpuChoice) {
    outcome = 'You win this round!';
    cssClass = 'win';
    wins++;
  } else {
    outcome = 'CPU wins this round.';
    cssClass = 'lose';
    losses++;
  }

  resultEl.textContent = outcome;
  resultEl.className = 'result ' + cssClass;

  winCountEl.textContent = wins;
  tieCountEl.textContent = ties;
  loseCountEl.textContent = losses;
}

document.querySelectorAll('.choice-btn').forEach(btn => {
  btn.addEventListener('click', () => play(btn.dataset.choice));
});

document.getElementById('resetBtn').addEventListener('click', () => {
  wins = 0; ties = 0; losses = 0;
  winCountEl.textContent = 0;
  tieCountEl.textContent = 0;
  loseCountEl.textContent = 0;
  playerEmoji.textContent = '❔';
  cpuEmoji.textContent = '❔';
  playerIcon.className = 'slot-icon';
  cpuIcon.className = 'slot-icon';
  resultEl.textContent = 'Make your move';
  resultEl.className = 'result';
});
