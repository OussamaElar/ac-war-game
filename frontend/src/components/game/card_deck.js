const SUITS = ["♥", "♦", "♠", "♣"];
const VALS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export default class Deck {
      constructor(cards = combineSuitVal()) {
            this.cards = cards; 
      }

      shuffle() {
            let a, j;
            for (let i = this.cards.length - 1; i > 0; i--) {
                  j = Math.floor(Math.random() * (i + 1));
                  a = this.cards[i]
                  this.cards[i] = this.cards[j];
                  this.cards[j] = a; 
            }
      }

      pop() {
            return this.cards.shift();
      }

      pop2Cards() {
            return this.cards.splice(0, 2)
      }

      push(card) {
            return this.cards.push(card);
      }

      push2Cards(cardA, cardB) {
            return this.cards.push(cardA, cardB);
      }
      
}

class Card {
      constructor(suit, val) {
            this.suit = suit;
            this.val = val;
      }

      get color() {
            return this.suit === '♣' || this.suit === '♣' ? 'black' : 'red';
      }

      getCard() {
           return {suit: this.suit, val: this.val, color: this.color} 
      }
}

const combineSuitVal = () => {
      return SUITS.flatMap(suit => (
            VALS.map(val => (
                  new Card(suit, val)
            ))
      ))
}