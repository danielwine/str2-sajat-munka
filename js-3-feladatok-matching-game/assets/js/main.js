let counter = document.querySelector('.counter')
let counterState = -1
let interval = {}
let playingField = document.querySelector('main')
let cardIDs = []
let lastID = ''
let lastCard = {}
let clicked = false
let freezedCards = 0

const formatCounter = () => {
    counterState = counterState + 1;
    minutes = Math.floor(counterState / 60)
    seconds = counterState % 60
    counter.textContent = `${
        minutes<10?'0':''}${minutes}:${seconds<10?'0':''}${seconds}`;
    return counter.textContent;
}

const startClock = () => {
    interval = setInterval(formatCounter, 1000);
}

const stopClock = () => {
    clearInterval(interval);
}

const flipCard = function (card, card2) {
    card.classList.toggle('flipped');
    if (card2) {
        card2.classList.toggle('flipped');
    }
}

const freezeCard = function (card, card2) {
    card.dataset.freeze = 'true'
    freezedCards += 1
    if (card2) {
        card2.dataset.freeze = 'true'
        freezedCards += 1
    }
}

const endOfGame = () => {
    setTimeout(() => {
        alert(`Gratulálunk! A játékot megoldottad, ${formatCounter()} idő alatt.`)
        stopClock();
        setTimeout(() => {
            counterState = -1;
            clearPlayingField();
            initialize();
        }, 5000)
    }, 1500)
}

const handleClick = function () {
    if (!clicked) {
        clicked = true;
        startClock()
    }
    if (this.dataset.freeze === 'true') { return null }
    if (this.dataset.id === lastID) {
        flipCard(this, lastCard)
        freezeCard(this, lastCard)
        if (freezedCards === 10) {
            endOfGame()
        }
    }
    flipCard(this)
    setTimeout(() => {
        flipCard(this);
    }, 1000)
    lastID = this.dataset.id
    lastCard = this
}

const chooseRandomID = () => {
    idx = Math.floor(Math.random() * cardIDs.length);
    id = cardIDs[idx]
    cardIDs.splice(idx, 1);
    return id;
}

const createElement = (type, cls = "") => {
    let element = document.createElement(type);
    element.className = cls;
    return element;
}

const createCard = () => {
    let card = createElement('div', 'flip-card');
    card.dataset.id = chooseRandomID();
    let inner = createElement('div', 'flip-card-inner')
    let front = createElement('div', 'flip-card-front')
    let frontIMG = createElement('img')
    frontIMG.src = './assets/img/back.png'
    front.appendChild(frontIMG)
    inner.appendChild(front)
    let back = createElement('div', 'flip-card-back')
    let backIMG = createElement('img')
    backIMG.src = `./assets/img/${card.dataset.id}.png`
    back.appendChild(backIMG)
    inner.appendChild(back)
    card.appendChild(inner)
    card.addEventListener('click', handleClick)
    return card;
}

const clearPlayingField = () => {
    while (playingField.firstChild) {
        playingField.removeChild(playingField.firstChild);
    }
}

const initializeCardIDs = () => {
    cardIDs = ['bone', 'kennel', 'german-shepherd', 'labrador', 'leash',
        'bone', 'kennel', 'german-shepherd', 'labrador', 'leash']
}

const initialize = () => {
    initializeCardIDs()
    formatCounter(counterState)
    for (let i = 0; i < 10; i++) {
        let card = createCard()
        playingField.appendChild(card)
    }
}

initialize();
