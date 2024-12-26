import { Card } from "./classes/card-class.js"
import { GameManager } from "./classes/game-manager-class.js"
import { GameState } from "./classes/game-state-class.js"
import { Player } from "./classes/player-class.js"
import { attack } from "./combat.js"
import * as View from './visuals.js'

const player1 = new Player({cards: [], color: 'red', id: 1})
const player2 = new Player({cards: [], color: 'blue', id: 2})

const combatBoots = new Card({
	type: 'item',
	name: 'combat-boots',
	effectTrigger: 'been-hit',
})
combatBoots.effect = (attackData) => {
	if (attackData.hits[3] == 'light') {
		attackData.hits[3] = false
		console.log('boot protect')
	}
	if (attackData.hits[4] == 'light') {
		attackData.hits[4] = false
		console.log('boot protect')
	}
}

const gameState = new GameState([player1, player2])
export const gameManager = new GameManager(gameState)

player2.cards.push(combatBoots)

View.drawBodyCards(player1)
View.drawBodyCards(player2)
View.drawActiveCards(player1)
View.drawActiveCards(player2)

attack(player1, player2)
View.drawBodyCards(player2)
