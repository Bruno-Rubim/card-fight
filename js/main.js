import * as cards from './card-list.js';
import gameState from './game-state.js';
import Player from './model/player.js';

const player0 = new Player()
const player1 = new Player()

player0.id = 0;
player0.activeCards.push(cards.dancerSkeleton)
// player0.activeCards.push(cards.collorblindSpider)
// player0.activeCards.push(cards.surfDoor)

player1.id = 1;
player1.activeCards.push(cards.xBacon)
// player1.activeCards = [cards.dancerSkeleton]
// player1.activeCards.push(cards.combatBoots)

gameState.players = [player0, player1]

gameState.startGame()