import { 
    ATTACK_DICE_FACES, 
} from "./constants.js";

export function rollDie(){
    return ATTACK_DICE_FACES[Math.floor(Math.random() * 6)]
}

export function rollDiceSet(setSize){
    let set = []
    for(let i = 0; i < setSize;i++){
        set.push(rollDie());
    }
    return set;
}

export function addDice(diceSet, ammount){
    for(let i = 0; i < ammount; i++){
        diceSet.push(rollDie());
    }
}

export function rerollDie(diceSet, face){
    for(const i in diceSet) {
        if (diceSet[i] == face) {
            diceSet[i] = rollDie()
            break
        }
    }
}

export function rerollHit(diceSet, face){
    for(const i in diceSet) {
        if (diceSet[i] == face) {
            diceSet[i] = rollDie()
        }
    }
}