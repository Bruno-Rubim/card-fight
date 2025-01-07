import { FACE, LEFT_FOOT, LEFT_HAND, RIGHT_FOOT, RIGHT_HAND } from './constants.js';
import gameState from './game-state.js';
import Card from './model/card.js';
import { addDice } from './model/combat.js';
import Player from './model/player.js';

const player0 = new Player()
const player1 = new Player()

player0.id = 0;
player1.id = 1;

const surfDoor = new Card({
    name: 'surf-door', 
    type: 'item', 
    condition: 'strike-hit', 
    effect: () => {
        addDice(gameState.currentAttack.diceSet, 3)
    }
})

player0.activeCards = [surfDoor]

gameState.players = [player0, player1]

gameState.startGame()