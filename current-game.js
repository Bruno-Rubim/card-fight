import { Card } from "./classes/card-class.js"
import { Player } from "./classes/player-class.js"
import { attack } from "./turn.js"
import { drawBodyCards, drawActiveCards } from './visuals.js'

const player1 = new Player({cards: [], color: 'red', id: 1})
const player2 = new Player({cards: [], color: 'blue', id: 2})

const combatBoots = new Card({type: 'item', name: 'combat-boots', effectTrigger: 'been-hit'})
combatBoots.effect = (bodyPart, hit) => {
    if (hit == 'light') {
        if (bodyPart == 3 || bodyPart == 4) {
            return false
        }
    }
}

player2.cards.push(combatBoots);

drawBodyCards(player1)
drawBodyCards(player2)
drawActiveCards(player1);
drawActiveCards(player2);

attack(player1, player2);
drawBodyCards(player2)