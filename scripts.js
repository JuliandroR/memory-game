const srcBackImage = "./img/back.png"
let srcFrontImage = ["./img/1.png", "./img/2.png", "./img/3.png", "./img/4.png", "./img/5.png"]
let cont = 1, src1 = ""

const createCard = (srcFrontImage) => {
  let section = document.createElement('section')
  section.setAttribute('class', 'memory-card')

  let frontImage = document.createElement('img')
  frontImage.setAttribute('class', 'front-face')
  frontImage.setAttribute('src', srcFrontImage)
  section.appendChild(frontImage)

  let backImage = document.createElement('img')
  backImage.setAttribute('class', 'back-face')
  backImage.setAttribute('src', srcBackImage)
  section.appendChild(backImage)

  return section
}

for (let i = 0; i < srcFrontImage.length; i++) {
  document.getElementById('container-game').appendChild(createCard(srcFrontImage[i]))
  document.getElementById('container-game').appendChild(createCard(srcFrontImage[i]))
}

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.children[0].src === secondCard.children[0].src;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
