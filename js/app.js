/* DATA BLOCK */
const gameData = {
    openCards: [],
    moves: 0,
    starRating: 3
}

/* ScoreBoard Selectors */
document.querySelector('.moves').innerText= gameData.moves;

/*
 * Create a list that holds all of your cards
 */
const cards = document.querySelectorAll('.card');
let deck = [];
for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    deck.push(card);
}

/*
 * Display the cards on the page
 */
//   1. shuffle the list of cards using the provided "shuffle" method below
        deck = shuffle(deck);
//   2. Update UI with the new deck
//      a. select deck in the UI
        const UIDeck = document.querySelector('.deck');
//      b. remove all list items(cards) from the ul(deck) element
        while (UIDeck.firstChild) {
            UIDeck.removeChild(UIDeck.firstChild);
        }
//      c. create document fragment to attach card elements to
        const fragment = document.createDocumentFragment();
//      d. loop through each card and create its HTML
        buildNewCardTree(deck);
//      e. Add fragment(newly shuffled deck) to the DOM
        UIDeck.appendChild(fragment);





function buildNewCardTree(array) {
    for (let i = 0; i < array.length; i++) {
        const newElement = array[i];
        fragment.appendChild(newElement);
    }
    return fragment
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const cardClick = (event) => {
    // 1. has card already been matched?
    if (event.target.classList.contains('match')) {
    } else if (event.target.classList.contains('open')|event.target.classList.contains('show')) { // 2. is the card already open?
    } else {
        // 3. if the card isn't open
            // a. add open, show, flipInY, and animated classes
            event.target.classList.add('animated','open','show','flipInY');
            // b. add card(icon string/innerHTML?) to open list
            gameData.openCards.push(event.target.innerHTML);
            console.log(gameData.openCards);
            // c. add 1 to click count (to keep track of moves)
            gameData.moves++;
            // d. Update moves in UI
            document.querySelector('.moves').innerText=gameData.moves;

            // TODO: d. check moveCount for star rating

    }






    // 4. Are there two cards in the open list?
        // a. do cards(icon strings/innerHTML?) match?
            // i. if cards match
                // aa. remove classes open, show, animated, flipInY
                // bb. add class match to both cards
                // cc. increment matchedCards (to keep track of cards left)
                // dd. reset open cards list.
        // b. if cards don't match
            // i. Flip cards over (remove open, show from classList)
            // ii. reset open cards list.

    // 5. Has matched cards reached 16?
        // a. produce Winnner Modal






}
/*
 1. set up the event listener for a card. If a card is clicked:
 */
    UIDeck.addEventListener('click', cardClick);
 /*  - display the card's symbol (put this functionality in another function that you call from this one) */


 /*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) */

 /*  - if the list already has another card, check to see if the two cards match */

 /*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) add match class and remove event addEventListener? */

 /*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one) */

 /*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one) */

 /*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
