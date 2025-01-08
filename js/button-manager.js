import { BODY_PARTS, CRITICAL_HIT, MISS, ATTACK_DICE_FACES, HEAVY_HIT, LIGHT_HIT, LOOT } from "./constants.js";
import { Attack } from "./model/attack.js";
import gameState from "./game-state.js";
import { countValueInArray, removeAllValueFromArray } from "./general-commands.js";
import Card from "./model/card.js";

export function deletePlayerButtons(player){
    const div = document.querySelector('#p' + player.id + '-buttons')
    div.innerHTML = '';
}

export function createAttackButton(player){
    const div = document.querySelector('#p' + player.id + '-buttons')
    
    let newButton = document.createElement("button");
    newButton.id = "p" + player.id + "-attack-button"
    newButton.innerHTML = "Attack";
    function funct(){
        deletePlayerButtons(player)
        gameState.startAttack()
    }   
    newButton.onclick = funct;

    div.appendChild(newButton);
}

export function createEndAttackButton(player){
    const div = document.querySelector('#p' + player.id + '-buttons')
    
    let newButton = document.createElement("button");
    newButton.id = "p" + player.id + "-end-attack-button"
    newButton.innerHTML = "End Attack";
    function funct(){
        gameState.endAttack()
    }   
    newButton.onclick = funct;

    div.appendChild(newButton);
}

export function createHitButton(attack = new Attack(), type = '', bodyPart){
    const div = document.querySelector('#p' + attack.attacker.id + '-buttons')
    const creatureCards = []
    for (let i = 0; i < attack.victim.activeCards.length; i++){
        const card  = attack.victim.activeCards[i];
        if (card.type == 'creature'){
            creatureCards.push(card)
        }
    }
    
    if (type == CRITICAL_HIT) {
        let newSelect = document.createElement("select");
        newSelect.id = "p" + attack.attacker.id + "-critical-button";
        let defaultOption = document.createElement("option");
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

        for (let i = 0; i < creatureCards.length; i++){
            let option = document.createElement("option");
            option.value = creatureCards[i].name;
            option.innerHTML = creatureCards[i].name;
            newSelect.appendChild(option);
        }

        function funct(){
            if (countValueInArray(BODY_PARTS, newSelect.value)) {
                console.log('body')
                attack.handleHitBody(newSelect.value, type, bodyPart)
            } else {
                attack.handleHitCreature(newSelect.value, type, bodyPart)
            }
        }
        newSelect.onchange = funct;
        div.appendChild(newSelect);
        return
    }

    if (creatureCards.length > 0) {
        let newSelect = document.createElement("select");
        newSelect.id = "p" + attack.attacker.id + "-" + bodyPart + "-button"
        let defaultOption = document.createElement("option");
        defaultOption.innerHTML = bodyPart;
        newSelect.appendChild(defaultOption);

        let option = document.createElement("option");
        option.value = bodyPart;
        option.innerHTML = 'body card';
        newSelect.appendChild(option);
        
        for (let i = 0; i < creatureCards.length; i++){
            let option = document.createElement("option");
            option.value = creatureCards[i].name;
            option.innerHTML = creatureCards[i].name;
            newSelect.appendChild(option);
        }

        function funct(){
            if (countValueInArray(BODY_PARTS, newSelect.value)) {
                console.log('body')
                attack.handleHitBody(newSelect.value, type, bodyPart)
            } else {
                attack.handleHitCreature(newSelect.value, type, bodyPart)
            }
        }
        newSelect.onchange = funct;
        div.appendChild(newSelect);
    } else {
        let newButton = document.createElement("button");
        newButton.id = "p" + attack.attacker.id + "-" + bodyPart + "-button"
        newButton.innerHTML = bodyPart;
        function funct(){
            attack.handleHitBody(bodyPart, type)
        }
        newButton.onclick = funct;
        div.appendChild(newButton);
    }
}

export function createRerollButton(attack = new Attack()){
    const div = document.querySelector('#p' + attack.attacker.id + '-buttons')
    
    let newSelect = document.createElement("select");
    newSelect.id = "p" + attack.attacker.id + "-reroll-button";
    let defaultOption = document.createElement("option");
    defaultOption.innerHTML = "Reroll (" + attack.actionSet.reroll + ")";
    newSelect.appendChild(defaultOption);

    for (const face in ATTACK_DICE_FACES){
        if (countValueInArray(attack.diceSet, ATTACK_DICE_FACES[face]) > 0){
            let option = document.createElement("option");
            option.value = ATTACK_DICE_FACES[face];
            option.innerHTML = ATTACK_DICE_FACES[face];
            newSelect.appendChild(option);
        }
    }
    function funct(){
        attack.handleReroll(newSelect.value)
    }
    newSelect.onchange = funct;
    div.appendChild(newSelect);
}

export function createLootButton(attack = new Attack()){
    const div = document.querySelector('#p' + attack.attacker.id + '-buttons')
    
    let newSelect = document.createElement("select");
    newSelect.id = "p" + attack.attacker.id + "-reroll-button";
    let defaultOption = document.createElement("option");
    defaultOption.innerHTML = "Loot (" + attack.actionSet[LOOT] + ")";
    newSelect.appendChild(defaultOption);

    for (let i = 0; i < attack.victim.activeCards.length; i++){
        const card = attack.victim.activeCards[i]
        if (card.type == 'item'){
            let option = document.createElement("option");
            option.value = card.name;
            option.innerHTML = card.name;
            newSelect.appendChild(option);
        }
    }
    function funct(){
        attack.handleLoot(newSelect.value)
    }
    newSelect.onchange = funct;
    div.appendChild(newSelect);
}

export function createActionButtons(attack = new Attack()){
    for(const partId in BODY_PARTS){
        const part = BODY_PARTS[partId]
        if (attack.actionSet[part] == CRITICAL_HIT){
            createHitButton(attack, CRITICAL_HIT, part)
        } else if (attack.actionSet[part] == HEAVY_HIT &&
            attack.actionSet[part] != null){
            createHitButton(attack, HEAVY_HIT, part)
        } else if (attack.actionSet[part] == LIGHT_HIT &&
            attack.actionSet[part] != null){
            createHitButton(attack, LIGHT_HIT, part)
        }
    }
    if (attack.actionSet.reroll > 0) {
        createRerollButton(attack)
    }
    if (attack.actionSet[LOOT] > 0) {
        createLootButton(attack)
    }
}