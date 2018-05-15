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

// initialize variable interval as global to be used in other functions
let interval = null;
// Initialize begins and resets the game
init();

//@@ initializes the game, setting scores to 0, shuffles the deck, begins the
//@ game timer and sets up the eventListeners
function init() {
  // in case reset button is clicked reset interval, seconds and minutes and
  // restart the timer
  clearInterval(interval);
  gameData.seconds = 0;
  gameData.minutes = 0;
  document.querySelector('#seconds').innerHTML = "00";
  document.querySelector('#minutes').innerHTML = "00";
  // interval = setInterval(updateTimer, 1000);
  // reset cards matched back to 0
  gameData.matchedCards = 0;
  // set moves to 0 in dataBlock
  gameData.moves = 0;
  // set moves to 0 in UI
  document.querySelector(".moves").innerText = gameData.moves + " Moves";
  // begin the game to 3
  gameData.rank = 3;
  // clear the openCards list
  gameData.openCards = [];
  // Begin the game with 3 stars in the DOM
  gameData.stars.innerHTML = `<li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>
                        <li><i class="fa fa-star"></i></li>`;

  // Create a list that holds all of your cards
  const cards = document.querySelectorAll(".card");

  // initialize the variable deck with an empty array
  let deck = [];
  // loop through the NodeList of cards and push each one into the array deck
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
  //  b. remove all list items(cards) from the ul(deck) element in the UI
  while (UIDeck.firstChild) {
    UIDeck.removeChild(UIDeck.firstChild);
  }

  //  c. create document fragment to attach card elements to
  const shuffledCards = document.createDocumentFragment();

  //  d. loop through each card and create its HTML
  for (let i = 0; i < deck.length; i++) {
    const newElement = deck[i];
    newElement.setAttribute("class", "card");
    // append the shuffled cards to the document fragment
    shuffledCards.appendChild(newElement);
  }

  //  e. Append fragment(newly shuffled cards) to the ul.deck in the DOM
  UIDeck.appendChild(shuffledCards);

  //  f. set up the event listener for a card. If a card is clicked:
  UIDeck.addEventListener("click", cardClick);
  //  g. set up event listener for restart button
  document.querySelector(".restart").addEventListener("click", init);
} /* end of init function */

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
} /* end of shuffle function */


//@@@ the cardClick function is the main game engine that processes all USER
//@ ACTIONS, updates the dataBlock and the UI to reflect those actions. Logic
//@ for nearly all USER Actions are contained within, with exception to reset
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
  // start the game clock
  if (gameData.moves < 1) {
    interval = setInterval(updateTimer, 1000);
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
  // e. check moveCount for Game Rank in "star"
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
      // vii. Function wobble calls wobble but allows the animation to complete
      // before flipping the cards back over and removing the wobble class
      function wobble() {
        // setTimeout adds the animation class "wobble" but allow a second to
        // pass for the wobble animation to complete before removing classes
        // that would affect the animation
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
    winner();
  }
} /* end of cardClick function */

function winner() {
  // a. place the game timer in the variable timer before we clear it to
  // display it in our modal
  let time = document.querySelector("#minutes").innerText + ":" + document.querySelector('#seconds').innerText;
  // b. stop the timer
  clearInterval(interval);
  // c. display the modal
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById('winnerModal');
  const sTime = document.getElementById('sTime');
  const sRank = document.getElementById('sRank');
  overlay.classList.toggle('showOverlay');
  modal.classList.toggle('showModal');
  sTime.innerText = time;
  sRank.innerText = gameData.rank;
  document.querySelector('#button-row').addEventListener('click', openModalResetGame);

}

function openModalResetGame(event) {
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById('winnerModal');
  if (!event.target.matches('button')) {
      return;
  }
  if (event.target.matches(".btn-close")) {
    overlay.classList.toggle('showOverlay');
    modal.classList.toggle('showModal');
  }
  if (event.target.matches('.btn-reset')) {
      overlay.classList.toggle('showOverlay');
      modal.classList.toggle('showModal');
    init();
  }
}

//@@ updateTimer is a function that is called every second by the interval setup
//@ in the init() function and creates a game timer that counts up and displays
//@ the clock and updates to the clock in the UI
function updateTimer() {
  // increment the seconds in the dataBlock and convert them to a string, then
  // place the result in the variable seconds within the updateTimer function
  let seconds = (++gameData.seconds).toString();
  // convert the variable minutes in the dataBlock to a string and store the
  // results in the variable minutes
  let minutes = (gameData.minutes).toString();

  // are there less than two characters in the string "seconds"
  if (seconds.length < 2) {
    // if so, we need to prepend a "0" to the string in order for it to display
    // correctly
    document.getElementById("seconds").innerHTML = "0" + seconds;
    // has the seconds counted reached 60?
  } else if (gameData.seconds === 60) {
    // if so, we need to reset both the seconds variable and the counted seconds
    // in the datablock back to 0
    seconds = gameData.seconds = 0;
    // 60 seconds = 1 minutes so increment the minutes to reflect a minute has
    // passed
    ++gameData.minutes;
    // display the seconds in the UI and since we reset them to 0 we'll need to
    // prepend a "0" in order for it to display correctly
    document.getElementById("seconds").innerHTML = "0" + seconds;
    // are there less than 2 characters in the minutes string
    if (minutes.length < 2 ) {
      // if so we need to prepend a "0" in order for it to display correctly in
      // the UI
      document.getElementById("minutes").innerHTML = "0" + gameData.minutes;
    } else {
      // if there are more than 2 characters, then just display the minutes in
      // the UI
      document.getElementById("minutes").innerHTML = gameData.minutes;
    }
    // if there are more than 2 characters in the seconds variable
  } else {
    // then display the seconds in the UI
    document.getElementById("seconds").innerHTML = seconds;
  }


}

/*  - display the card's symbol (put this functionality in another function that you call from this one) */

/*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) */

/*  - if the list already has another card, check to see if the two cards match */

/*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) add match class and remove event addEventListener? */

/*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one) */

/*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one) */
