import { ATTACK_DICE_FACES, LEFT_FOOT, LIGHT_HIT, RIGHT_FOOT } from './constants.js';
import gameState from './game-state.js';
import Card from './model/card.js';
import { addDice, Attack } from './model/combat.js';

export const surfDoor = new Card({
    name: 'surf-door', 
    type: 'item', 
    condition: 'strike-hit', 
    effect: (attack = new Attack()) => {
        addDice(gameState.currentAttack.diceSet, 3)
    }
})

export const combatBoots = new Card({
    name: 'combat-boots', 
    type: 'item', 
    condition: 'been-hit', 
    effect: (attack = new Attack()) => {
        console.log(attack)
        if ((
            attack.currentHitBodyPart == LEFT_FOOT || 
            attack.currentHitBodyPart == RIGHT_FOOT) &&
            attack.currentHitType == LIGHT_HIT
        ) {
            attack.currentHitCancel = true;
        }
    }
})