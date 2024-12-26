import { Player } from "./classes/player-class.js"
import { gameManager } from "./current-game.js"

const bodyCardNames = [
    'head',
    'right hand',
    'left hand',
    'right foot',
    'left foot',
    'loot',
]

export const rollDie = () => {
    return (Math.floor(Math.random() * 6))
}

export const rollDiceSet = (setSize) => {
    let resultSet = []
    for (let i = 0; i < setSize; i++) {
        resultSet.push(rollDie())
    }
    return resultSet
}

export const rerollDie = (partNumber, diceSet) => {
    for (let i = 0; i < diceSet.length; i++) {
        if (diceSet[i] == partNumber) {
            diceSet[i] = rollDie()
            break;
        }
    }
    return diceSet;
}

export const rerollHit = (partNumber, diceSet) => {
    for (let i = 0; i < diceSet.length; i++) {
        if (diceSet[i] == partNumber) {
            diceSet[i] = rollDie()
        }
    }
    return diceSet;
}

export const countInSet = (value, set) => {
    let n = 0;
    for(let i = 0; i < set.length; i++){
        if(set[i] == value){
            n++
        }
    }
    return n;
}

export const checkHits = (diceSet, victim = new Player()) => {
    let hits = Array(5).fill(false);
    let lightMin = 3;
    let heavyMin = 4;
    let critMin = 5;
    for (let i = 0; i < victim.bodyCards.length; i++) {
        const count = countInSet(i, diceSet)
        if (count < lightMin) {
            continue
        }
        if (!victim.bodyCards[i]) {
            rerollHit(i, diceSet);
            checkHits(diceSet, victim);
        } else {
            if (count >= critMin) {
                hits[i] = 'crit';
            } else if (count >= heavyMin) {
                hits[i] = 'heavy';
            } else if (count >= lightMin) {
                hits[i] = 'light';
            }
        }
    }
    return hits;
}

export const attack = (attacker = new Player(), victim = new Player()) => {

}