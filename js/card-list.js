import { ATTACK_DICE_FACES, LEFT_FOOT, LIGHT_HIT, RIGHT_FOOT } from './constants.js';
import gameState from './game-state.js';
import { countValueInArray } from './general-commands.js';
import Card from './model/card.js';
import { Attack } from './model/attack.js';
import { addDice } from './combat.js';

//item
export const collorblindSpider = new Card({
    name: 'colorblind-spider', 
    type: 'creature', 
    condition: 'calculate-dice', 
    effect: (attack = new Attack()) => {
        attack.additionalDice += 3;
    }
})

export const combatBoots = new Card({
    name: 'combat-boots', 
    type: 'item', 
    condition: 'hit-attempt', 
    effect: (attack = new Attack()) => {
        if ((
            attack.currentHitBodyPart == LEFT_FOOT || 
            attack.currentHitBodyPart == RIGHT_FOOT) &&
            attack.currentHitType == LIGHT_HIT
        ) {
            attack.currentHitCancel = true;
            gameState.activatedEffectsThisTurn.push(combatBoots)
        }
    }
})

export const dancerSkeleton = new Card({
    name: 'dancer-skeleton', 
    type: 'creature', 
    condition: 'end-attack', 
    effect: (attack = new Attack()) => {
        if (countValueInArray(gameState.activatedEffectsThisTurn, dancerSkeleton) == 0 &&
            attack.hitsStruck == 0
        ){
            gameState.attacksLeft++
            gameState.activatedEffectsThisTurn.push(dancerSkeleton)
        }
    }
})

export const surfDoor = new Card({
    name: 'surf-door', 
    type: 'item', 
    condition: 'strike-hit', 
    effect: (attack = new Attack()) => {
        addDice(gameState.currentAttack.diceSet, 3)
        gameState.activatedEffectsThisTurn.push(surfDoor)
    }
})

export const xBacon = new Card({
    name: 'x-bacon', 
    type: 'item', 
    condition: 'calculate-dice', 
    effect: (attack = new Attack()) => {
        attack.actionSet.reroll += 4;
    }
})

export const allCards = [collorblindSpider, combatBoots, dancerSkeleton, surfDoor, xBacon]