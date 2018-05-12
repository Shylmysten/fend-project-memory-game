/* DATA BLOCK */
const gameData = {
  openCards: [],
  moves: 0,
  rank: 3,
  matchedCards: 0,
  stars: document.querySelector(".stars"),
  seconds: 0,
  minutes: 0
};

let interval = null;
init();

function init() {
  clearInterval(interval);
  gameData.seconds = 0;
  gameData.minutes = 0;
  interval = setInterval(updateTimer, 1000);
  // set moves to 0 in UI
  gameData.moves = 0;
  document.querySelector(".moves").innerText = gameData.moves + " Moves";
  gameData.rank = 3;
  gameData.openCards = [];
  gameData.stars.innerHTML = `<li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>`;

  // Create a list that holds all of your cards
  const cards = document.querySelectorAll(".card");
  let deck = [];
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    deck.push(card);
  }

  // Display the cards on the page

  //   1. shuffle the list of cards using the provided "shuffle" method below
  deck = shuffle(deck);

  //   2. Update UI with the new deck
  //  a. select deck in the UI
  const UIDeck = document.querySelector(".deck");
  //  b. remove all list items(cards) from the ul(deck) element
  while (UIDeck.firstChild) {
    UIDeck.removeChild(UIDeck.firstChild);
  }

  //  c. create document fragment to attach card elements to
  const shuffledCards = document.createDocumentFragment();

  //  d. loop through each card and create its HTML
  for (let i = 0; i < deck.length; i++) {
    const newElement = deck[i];
    newElement.setAttribute("class", "card");
    shuffledCards.appendChild(newElement);
  }

  //  e. Append fragment(newly shuffled cards) to the ul.deck in the DOM
  UIDeck.appendChild(shuffledCards);

  //  d. set up the event listener for a card. If a card is clicked:
  UIDeck.addEventListener("click", cardClick);
  //  e. set up event listener for restart button
  document.querySelector(".restart").addEventListener("click", init);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function cardClick(event) {
  // 1. is the target a card? is it already open, or matched?
  if (
    !event.target.matches(".card") |
    event.target.matches(".open") |
    event.target.classList.contains("match")
  ) {
    // then we're not interested
    return;
  }

  // 1. if the card isn't open
  // a. add open, show, flipInY, and animated classes
  event.target.classList.add("animated", "open", "show", "flipInY");
  // b. add card(icon string/innerHTML?) to open list
  gameData.openCards.push(event.target);
  // c. add 1 to click count (to keep track of moves)
  gameData.moves++;
  // d. Update moves in UI
  document.querySelector(".moves").innerText = gameData.moves + " Moves";
  // e. check moveCount for star rating
  if (
    (gameData.moves === 26) |
    (gameData.moves === 38) |
    (gameData.moves === 48)
  ) {
    gameData.stars.removeChild(gameData.stars.firstElementChild);
    gameData.rank--;
  }

  // 4. Are there two cards in the open list?
  if (gameData.openCards.length === 2) {
    // a. Open cards
    const card1 = gameData.openCards[0];
    const card2 = gameData.openCards[1];
    // b. Suit of open cards (icons)
    cardSuit1 = gameData.openCards[0].firstChild.classList[1];
    cardSuit2 = gameData.openCards[1].firstChild.classList[1];

    // c. do the two cards classes (STRINGS) match?
    if (cardSuit1 === cardSuit2) {
      // i. if cards match

      // ii. increment matchedCards (to keep track of cards left)
      gameData.matchedCards += 2;

      // iii. remove classes open, show, animated, flipInY
      card1.classList.remove("open", "show", "flipInY");
      card2.classList.remove("open", "show", "flipInY");
      // iv. add class rubberBand
      card1.classList.add("rubberBand");
      card2.classList.add("rubberBand");
      // v. add class match to both cards
      card1.classList.add("match");
      card2.classList.add("match");
    } else {
      // vi. if cards don't match
      card1.classList.remove("flipInY");
      card2.classList.remove("flipInY");
      // vii. Function wobble calls allows wobble animation to complete
      // before flipping the cards back over and removing the wobble class
      function wobble() {
        setTimeout(function() {
          card1.classList.remove("show", "open", "wobble");
          card2.classList.remove("show", "open", "wobble");
        }, 1000);
        card1.classList.add("wobble");
        card2.classList.add("wobble");
      }

      wobble();
    }

    // ii. clear open cards list.
    gameData.openCards = [];
  }
  // 5. if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
  if (gameData.matchedCards === 16) {
    let time = document.querySelector(".clock").innerText;
    clearInterval(interval);
  }
}

function updateTimer() {
  let sec = 0;
  const secs = (++gameData.seconds % 60).toString();
  const mins = parseInt(gameData.seconds / 60).toString();
  document.getElementById("seconds").innerHTML =
    secs.length < 2 ? "0" + secs : secs;
  document.getElementById("minutes").innerHTML =
    mins.length < 2 ? "0" + mins : mins;
}

/*  - display the card's symbol (put this functionality in another function that you call from this one) */

/*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) */

/*  - if the list already has another card, check to see if the two cards match */

/*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) add match class and remove event addEventListener? */

/*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one) */

/*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one) */
