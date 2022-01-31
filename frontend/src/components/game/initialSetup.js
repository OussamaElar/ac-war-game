import Deck from './card_deck';



export const deck = new Deck();
deck.shuffle();
const halfDeck = (deck.cards.length)/ 2;
export let playerDeck = new Deck(deck.cards.slice(0, halfDeck))
export let compDeck = new Deck(deck.cards.slice(halfDeck, deck.cards.length))

// Card Values 

export const card_value = {
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '10': 10,
      'J': 11,
      'Q': 12,
      'K': 13,
      'A': 14
}

//initial deck 

export let playerDeckCards = playerDeck.cards.length;
export let compDeckCards = compDeck.cards.length;

