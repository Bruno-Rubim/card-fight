import { BODY_PARTS, CRITICAL_HIT, MISS } from "./constants.js";
import gameState from "./game-state.js";
import * as graphics from "./graphics/graphis-index.js"
import { Attack } from "./model/combat.js";

export function deletePlayerButtons(player){
    const div = document.querySelector('#p' + player.id + '-buttons')
    div.innerHTML = '';
}

export function createPlayerButton(player, button = {text: '', type: '', funct(){}}){
    const div = document.querySelector('#p' + player.id + '-buttons')

    let newButton = document.createElement(button.type);
    newButton.innerHTML = button.text;
    newButton.onclick = button.funct;

    div.appendChild(newButton);
}

export function createAttackButton(player){
    console.log('creating attack btn')
    const div = document.querySelector('#p' + player.id + '-buttons')
    
    let newButton = document.createElement("button");
    newButton.id = "p" + player.id + "-attack-button"
    newButton.innerHTML = "Attack";
    function funct(){
        deletePlayerButtons(player)
        gameState.startCombat()
    }   
    newButton.onclick = funct;

    div.appendChild(newButton);
}

export function createHitButton(attack = new Attack(), bodyPart){
    const div = document.querySelector('#p' + attack.attacker.id + '-buttons')
    
    let newButton = document.createElement("button");
    newButton.id = "p" + attack.attacker.id + "-" + bodyPart + "-button"
    newButton.innerHTML = bodyPart;
    function funct(){
        attack.victim.bodyCards[bodyPart] = false;
        graphics.drawPlayerCards(attack.victim)
        attack.actionSet[bodyPart] = null
        deletePlayerButtons(attack.attacker)
        gameState.checkPlayerActions(attack)
        gameState.requestPlayerActions(attack)
    }
    newButton.onclick = funct;
    div.appendChild(newButton);
}

export function createActionButtons(attack = new Attack()){
    for(const partId in BODY_PARTS){
        const part = BODY_PARTS[partId]
        console.log(attack.actionSet[part])
        if (attack.actionSet[part] == CRITICAL_HIT){
            createCriticalButton(attack, part)
        } else if (attack.actionSet[part] != MISS &&
                attack.actionSet[part] != null){
            createHitButton(attack, part)
        }
    }
}

export function createCriticalButton(attack = new Attack(), bodyPart){
    const div = document.querySelector('#p' + attack.attacker.id + '-buttons')
    
    let newSelect = document.createElement("select");
    newSelect.id = "p" + attack.attacker.id + "-critical-button";
    let defaultOption = document.createElement("option");
    defaultOption.value = "critcal";
    defaultOption.innerHTML = "Critcal";
    newSelect.appendChild(defaultOption);

    for (const part in BODY_PARTS){
        if (attack.victim.bodyCards[BODY_PARTS[part]]){
            let option = document.createElement("option");
            option.value = BODY_PARTS[part];
            option.innerHTML = BODY_PARTS[part];
            newSelect.appendChild(option);
        }
    }
    function funct(){
        attack.victim.bodyCards[newSelect.value] = false;
        graphics.drawPlayerCards(attack.victim)
        attack.actionSet[bodyPart] = null
        deletePlayerButtons(attack.attacker)
        gameState.checkPlayerActions(attack)
        gameState.requestPlayerActions(attack)
    }
    newSelect.onchange = funct;
    div.appendChild(newSelect);
}