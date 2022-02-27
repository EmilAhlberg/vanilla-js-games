document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0
    let appleIndex = 0
    let currentSnake = [2,1,0]
    let direction = 1
    let score = 0
    let intervalTime = 0
    let interval = 0


    function startGame() {
        //reset state
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        //start
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 450
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    function moveOutcomes() {
        let head = currentSnake[0]
        if ((head + width >= (width*width) && direction === width) ||
        (head % width === (width - 1) && direction === 1) ||
        (head % width === 0 && direction === -1) ||
        (head - width < 0  && direction === -width) ||
        squares[head + direction].classList.contains('snake')
        ) {
            return clearInterval(interval)
        }

        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(head + direction)

        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length) 
        } while (squares[appleIndex].classList.contains['snake'])
        squares[appleIndex].classList.add('apple')
    }
    
    function handleKeys(e) {
        squares[currentIndex].classList.remove('snake')
        if(e.keyCode === 39) {
            direction = 1
        } else if (e.keyCode === 38) {
            direction = -width
        } else if (e.keyCode === 37) {
            direction = -1
        } else if (e.keyCode === 40) {
            direction = width
        }
    }

    document.addEventListener('keyup', handleKeys)
    startBtn.addEventListener('click', startGame)

})