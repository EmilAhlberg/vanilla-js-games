document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll('.grid div')  
  const resultDisplay = document.querySelector('#result')
  let width = 15
  let currentShooterIndex = 202
  let currentInvaderIndex = 0
  let direction = 1
  let alienInvadersTakenDown = []
  let result = 0
  let invaderId = 0
  
  const alienInvaders = Array(3).fill()
    .map((_, ri) => Array(10).fill().map((_,ci) => ri*15 + ci)).flat()
  console.log(alienInvaders)



  alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'))
  
  
  squares[currentShooterIndex].classList.add('shooter')


  function moveShooter(e) {
      squares[currentShooterIndex].classList.remove('shooter')
      switch (e.keyCode) {
        case 37:
            if(currentShooterIndex % width !== 0) currentShooterIndex -=1
            break;
        case 39:
            if(currentInvaderIndex % width < width - 1) currentShooterIndex +=1
            break;
        }
        squares[currentShooterIndex].classList.add('shooter')
  }
  document.addEventListener('keydown', moveShooter)


  function moveInvaders() {
      const leftEdge = alienInvaders[0] % width === 0
      const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1

      if((leftEdge && direction) === -1 || (rightEdge && direction === 1)) {
          direction = width
      } else if(direction === width){
          if(leftEdge) direction = 1
          else direction = -1
      }

      for (let i = 0; i <= alienInvaders.length -1; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
      }
      for (let i = 0; i <= alienInvaders.length -1; i++) {
          alienInvaders[i] += direction
      }
      for (let i = 0; i <= alienInvaders.length -1; i++) {
        squares[alienInvaders[i]].classList.add('invader')
      }


      if(squares[currentShooterIndex].classList.contains('invader','shooter')) {
          resultDisplay.textContent = 'Game Over'
          squares[currentShooterIndex].classList.add('boom')
          clearInverval(intervalId)
      }

      for (let i = 0; i <= alienInvaders.kength - 1; i++) {
          if(alientInvaders[i] > (squares.length - (width-1))) {
              resultDisplay.textContent = 'Game Over'
              clearInterval(intervalId)
          }
      }

  }
  intervalId = setInterval(moveInvaders, 500)

})