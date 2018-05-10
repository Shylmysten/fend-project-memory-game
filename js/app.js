/*
 * Create a list that holds all of your cards
 */
let cards = document.querySelectorAll('.card');
let deck = [];
for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    deck.push(card);
}

/*
 * Display the cards on the page
 */
//   1. shuffle the list of cards using the provided "shuffle" method below
        deck = shuffle(deck); 
//   2.
//      a. select deck in the UI
        const UIDeck = document.querySelector('.deck');
//      b. create document fragment to attach card elements to
        const fragment = document.createDocumentFragment();
//      a. remove all list items from the ul element
        while (UIDeck.firstChild) {
            UIDeck.removeChild(UIDeck.firstChild);
        }

//   3. add each card's HTML to the UI
//      a. loop through each card and create its HTML
        buildNewCardTree(deck);
//      b. Add fragment to the DOM
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
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
