const square = document.querySelectorAll('.square')
const mole = document.querySelectorAll('.mole')
const timeLeft = document.querySelector('#time-left')
let score = document.querySelector('#score')

let result  = 0;
let currentTime = timeLeft.textContent

function randomSquare() {
    square.forEach(className => {
        className.classList.remove('mole')
    })
    let randomPosition = square[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole')
    hitPosition = randomPosition.id
}

square.forEach(sq => {
    sq.addEventListener('mouseup', () => {
        if(sq.id === hitPosition) {
            result = result + 1
            score.textContent = result
            sq.classList.remove('mole')
        }
    }) 
})

function countDown() {
    randomSquare()
    currentTime--
    timeLeft.textContent = currentTime
    if(currentTime === -1) {
        timeLeft.textContent = 0
        clearInterval(timerId)
        alert('Game over! Your final score is: ' + result)
    }
}

let timerId = setInterval(countDown, 1000)

startGame()