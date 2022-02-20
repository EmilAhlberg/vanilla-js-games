const cardArray = [
    {
        name: "cheeseburger",
        img: "images/cheeseburger.png"
    },
    {
        name: "fries",
        img: "images/fries.png"
    },
    {
        name: "hotdog",
        img: "images/hotdog.png"
    },
    {
        name: "ice-cream",
        img: "images/ice-cream.png"
    },
    {
        name: "milkshake",
        img: "images/milkshake.png"
    },
    {
        name: "pizza",
        img: "images/pizza.png"
    },
]

document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    cardArray.push(...cardArray)
    cardArray.sort(() => 0.5 - Math.random())
    var firstPickId = -1
    var cardsWon = {}
   
    createBoard()

    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img') 
            card.setAttribute('src', 'images/blank.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    function checkForMatch(secondPickId) {
        var cards = document.querySelectorAll('img')
        var selectedIds = [firstPickId, secondPickId]
        if (cardArray[firstPickId].name === cardArray[secondPickId].name) {
            selectedIds.forEach(id => {
                cards[id].setAttribute('src', "images/white.png")
                cardsWon[id] = true
            })
            alert('You found a match')
        } else {
            selectedIds.forEach(id => cards[id].setAttribute('src', "images/blank.png"))
            alert('Oh no!')
        }
        firstPickId = -1
        
        let nbrOfMatches = Object.keys(cardsWon).length / 2
        resultDisplay.textContent = `Matches: ${nbrOfMatches}`
        if(nbrOfMatches === cardArray.length / 2) {
            resultDisplay.textContent = "You win, nice!"
        }
    }

    function flipCard() {
        var cardId = this.getAttribute('data-id')
        if (cardsWon[cardId]) return
        this.setAttribute('src', cardArray[cardId].img)
        if (firstPickId != -1) {
            setTimeout(() => checkForMatch(cardId), 500)
        }else {
            firstPickId = cardId
        }
    }
})