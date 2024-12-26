import { GameManager } from "./classes/game-manager-class.js"
import { GameState } from "./classes/game-state-class.js"
import { Player } from "./classes/player-class.js"
import * as cards from './all-cards.js'
import * as View from './visuals.js'

const player1 = new Player({cards: [], color: 'red', id: 1})
player1.cards.push(cards.invisibleguitar);

const player2 = new Player({cards: [], color: 'blue', id: 2})
player2.cards.push(cards.combatBoots);

const gameState = new GameState([player1, player2])
export const gameManager = new GameManager({gameState})

gameManager.attackHandler(player1, player2);

View.drawBodyCards(player1)
View.drawBodyCards(player2)
View.drawActiveCards(player1)
View.drawActiveCards(player2)