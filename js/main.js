import * as cards from './card-list.js';
import gameState from './game-state.js';
import Player from './model/player.js';

const player0 = new Player()
const player1 = new Player()

player0.id = 0;
player0.activeCards = [cards.surfDoor]

player1.id = 1;
player1.activeCards = [cards.combatBoots]

gameState.players = [player0, player1]

gameState.startGame()