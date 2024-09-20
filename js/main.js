const turnoDisplay = document.querySelector('.jugador');
const turno = document.querySelector('.turno');
const ret = document.querySelector('.ret');
const modal = document.querySelector('.aviso');
const quit = document.querySelector('.quit');
const scoreXDisplay = document.querySelector('.you');
const scoreODisplay = document.querySelector('.cpu');
const scoreTiesDisplay = document.querySelector('.ties');
const ganador = document.querySelector('.ganador');
const won = document.querySelector('.won');
const nextRound = document.querySelector('.nextRound');

const combinaciones = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
];

let turnoJugador = 'x'; 
let scoreX = 0;
let scoreO = 0;
let scoreTies = 0;
let gameOver = false; 


quit.addEventListener('click', toggleModal);
ret.addEventListener('click', reiniciarJuego); 
nextRound.addEventListener('click', function () {
    reiniciarJuego();
    toggleModal(); 
});
ret.addEventListener('click', function () {
    
    scoreX = 0;
    scoreO = 0;
    scoreTies = 0;

   
    updateScores();

   
    reiniciarJuego();

    
    if (!modal.classList.contains('hidden')) {
        toggleModal();
    }
});

scoreXDisplay.innerHTML = `X(YOU)<br>${scoreX}`;
scoreODisplay.innerHTML = `O(CPU)<br>${scoreO}`;
scoreTiesDisplay.innerHTML = `TIES<br>${scoreTies}`;
turnoDisplay.textContent = 'X-'; 

document.querySelectorAll('.caja').forEach((caja, index) => {
    caja.addEventListener('click', function () {
        if (caja.textContent === '' && !gameOver) { 
            if (turnoJugador === 'x') {
                caja.textContent = 'X';
                caja.classList.add('x_jugador'); 
                turnoJugador = 'o'; 
                turnoDisplay.textContent = 'O-';
                turno.style.background = '#f2b237';
                checkWinner(); 
                if (!gameOver) { 
                    setTimeout(cpuMove, 500); 
                }
            }
        }
    });
});
function cpuMove() {
    const availableBoxes = [...document.querySelectorAll('.caja')].filter(box => box.textContent === '');
    if (availableBoxes.length > 0 && !gameOver) { 
        const randomIndex = Math.floor(Math.random() * availableBoxes.length);
        const chosenBox = availableBoxes[randomIndex];
        chosenBox.textContent = 'O';
        chosenBox.classList.add('o_jugador');
        turnoJugador = 'x';
        turnoDisplay.textContent = 'X-';
        turno.style.background = '#31c4be';
        checkWinner();
    }
}
function toggleModal() {
    modal.classList.toggle('hidden');
}
function updateScores() {
    scoreXDisplay.innerHTML = `X(YOU)<br>${scoreX}`;
    scoreODisplay.innerHTML = `O(CPU)<br>${scoreO}`;
    scoreTiesDisplay.innerHTML = `TIES<br>${scoreTies}`;
}
function checkWinner() {
    const boxes = document.querySelectorAll('.caja');
    let winner = null;
    combinaciones.forEach(combination => {
        const [a, b, c] = combination;
        if (boxes[a].textContent &&
            boxes[a].textContent === boxes[b].textContent &&
            boxes[a].textContent === boxes[c].textContent) {
            winner = boxes[a].textContent;
        }
    });
    if (winner) {
        gameOver = true; 
        if (winner === 'X') {
            scoreX++;
            ganador.textContent = 'X TAKES THE ROUND';
            won.textContent = 'You won!';
        } else {
            scoreO++;
            ganador.textContent = 'CPU TAKES THE ROUND';
            won.textContent = 'Cpu won!';
        }
        updateScores();
        toggleModal();
        return winner;
    }
    const isTie = [...boxes].every(box => box.textContent !== '');
    if (isTie) {
        gameOver = true;
        scoreTies++;
        ganador.textContent = 'TIE';
        won.textContent = 'It\'s a tie!';
        updateScores();
        toggleModal();
        return 'tie';
    }
    return null;
}
function reiniciarJuego() {
    document.querySelectorAll('.caja').forEach(caja => {
        caja.textContent = '';
        caja.classList.remove('x_jugador', 'o_jugador');
    });
    turnoJugador = 'x';
    turnoDisplay.textContent = 'X-';
    gameOver = false;
}