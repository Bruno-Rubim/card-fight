import { 
    ATTACK_DICE_FACES, 
    LEFT_FOOT, 
    RIGHT_FOOT, 
    LEFT_HAND, 
    RIGHT_HAND, 
    FACE, 
    MISS, 
    LOOT, 
    CRITICAL_HIT, 
    HEAVY_HIT, 
    LIGHT_HIT, 
    BODY_PARTS 
} from "../constants.js";
import { countValueInArray, removeAllValueFromArray } from "../general-commands.js";
import * as buttonManager from "../button-manager.js"
import * as graphics from "../graphics/graphis-index.js"
import gameState from "../game-state.js";
import Player from "./player.js";

export class Attack {
    constructor({attacker = new Player(), victim = new Player(), diceSet = [], actionSet = []}){
        this.attacker = attacker
        this.victim = victim
        this.diceSet = diceSet
        this.reroll = 10 // official is 0
        this.actionSet = actionSet
    }

    checkImpossibleHits(){
        let setChanged = false;
    
        for(const i in BODY_PARTS){
            if (!this.victim.bodyCards[BODY_PARTS[i]] && 
                this.actionSet[BODY_PARTS[i]] != MISS && 
                this.actionSet[BODY_PARTS[i]] != CRITICAL_HIT)
                {
                    rerollHit(this.diceSet, BODY_PARTS[i])
                    setChanged = true;
                }
            }
        return setChanged;
    }

    translateDiceSet(){
        let minLight = 3;
        let minHeavy = 4;
        let minCritical = 5;
        
        this.actionSet = {
            [LEFT_FOOT]: MISS,
            [RIGHT_FOOT]: MISS,
            [LEFT_HAND]: MISS,
            [RIGHT_HAND]: MISS,
            [FACE]: MISS,
            [LOOT]: 0,
        }
        
        for(let i = 0; i < ATTACK_DICE_FACES.length - 1; i++){
            let amount = countValueInArray(this.diceSet, ATTACK_DICE_FACES[i])
            if (amount >= minCritical) {
                this.actionSet[ATTACK_DICE_FACES[i]] = CRITICAL_HIT;
            } else if (amount >= minHeavy) {
                this.actionSet[ATTACK_DICE_FACES[i]] = HEAVY_HIT;
            } else if (amount >= minLight) {
                this.actionSet[ATTACK_DICE_FACES[i]] = LIGHT_HIT;
            } else [
                this.actionSet[ATTACK_DICE_FACES[i]] = MISS
            ]
        }
        this.actionSet[LOOT] = Math.floor(countValueInArray(this.diceSet, LOOT)/2);
        
        if (this.checkImpossibleHits()){
            this.translateDiceSet()
        }
    }

    performAttack(){
        this.diceSet = rollDiceSet(this.attacker.baseDice);
        this.translateDiceSet();
    }

    handleAction(){
        this.translateDiceSet()

        graphics.drawPlayerCards(this.victim)
        
        buttonManager.deletePlayerButtons(this.attacker)
        
        gameState.checkPlayerActions(this)
        gameState.requestPlayerActions(this)
        graphics.drawDiceSet(this.diceSet)
    }

    handleHit(bodyPart, face = bodyPart){
        this.diceSet = removeAllValueFromArray(this.diceSet, face)
        this.victim.bodyCards[bodyPart] = false;
        this.handleAction()
    }

    handleReroll(face){
        rerollDie(this.diceSet, face);
        this.reroll--
        this.handleAction()
    }
}

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

export function addDice(diceSet, ammount){
    for(let i = 0; i < ammount; i++){
        diceSet.push(rollDie());
    }
}