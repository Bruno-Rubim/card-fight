import { FACE, LEFT_FOOT, LEFT_HAND, RIGHT_FOOT, RIGHT_HAND } from './constants.js';
//import './graphics/index.js';
import { Attack } from './model/attack.js';
import gameState from './model/game-state.js';
import Player from './model/player.js';

const player1 = new Player()
const player2 = new Player()

player1.id = 1;
player2.id = 2;

gameState.players = [player1, player2]

let attack = new Attack({attacker: player1, victim: player2})
attack.performAttack()

gameState.drawPlayers();