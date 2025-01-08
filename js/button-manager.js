import { BODY_PARTS, CRITICAL_HIT, MISS, ATTACK_DICE_FACES, HEAVY_HIT, LIGHT_HIT, LOOT } from "./constants.js";
import { Attack } from "./model/attack.js";
import gameState from "./game-state.js";
import { countValueInArray, removeAllValueFromArray } from "./general-commands.js";

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

export function createRerollButton(attack = new Attack()){
    // const div = document.querySelector('#p' + attack.attacker.id + '-buttons')
    
    // let newSelect = document.createElement("select");
    // newSelect.id = "p" + attack.attacker.id + "-reroll-button";
    // let defaultOption = document.createElement("option");
    // defaultOption.innerHTML = "Reroll (" + attack.actionSet.reroll + ")";
    // newSelect.appendChild(defaultOption);

    // for (const face in ATTACK_DICE_FACES){
    //     if (countValueInArray(attack.diceSet, ATTACK_DICE_FACES[face]) > 0){
    //         let option = document.createElement("option");
    //         option.value = ATTACK_DICE_FACES[face];
    //         option.innerHTML = ATTACK_DICE_FACES[face];
    //         newSelect.appendChild(option);
    //     }
    // }
    // function funct(){
    //     attack.handleReroll(newSelect.value)
    // }
    // newSelect.onchange = funct;
    // div.appendChild(newSelect);
}

export function deleteDiceButtons(attack = new Attack()){
    const div = document.querySelector('#dice')
    div.innerHTML = ''
}

export function translateDiceButtons(attack = new Attack()){
    const div = document.querySelector('#dice')
    div.innerHTML = ''
    ATTACK_DICE_FACES.forEach(face => {
        let faceGroup;
        if (attack.actionSet[face] == MISS ||
            attack.actionSet[face] == 0
        ){
            faceGroup = document.createElement("b");
            faceGroup.classList.add('faded')
        } else {
            faceGroup = document.createElement("button");
            faceGroup.id = face + "-button"
        }
        let i = 0
            let n = countValueInArray(attack.diceSet, face)
            while (i < n){
                let img = document.createElement("img");
                img.width = '64'
                img.src = "./images/dice-" + face + ".png"
                faceGroup.appendChild(img);
                function funct(){
                    createSelection(attack, face)
                }   
                faceGroup.onclick = funct;
                i++
            div.appendChild(faceGroup);
        }
    })
}

export function deleteSelection(attack = new Attack()){
    const selection = document.querySelector("#p" + attack.attacker.id + "-selection")
    selection.innerHTML = 'Action selection'
    const buttons = document.querySelector("#p" + attack.attacker.id + "-buttons")
    buttons.innerHTML = ''
}

export function createSelection(attack = new Attack(), face){
    const selection = document.querySelector("#p" + attack.attacker.id + "-selection")
    selection.innerHTML = ''
    const buttons = document.querySelector("#p" + attack.attacker.id + "-buttons")
    buttons.innerHTML = ''
    const selected = document.createElement('i')
    selection.appendChild(selected)
    selected.id = ('p' + attack.attacker.id + '-selected')
    selected.innerHTML = attack.actionSet[face];

    if (face == LOOT) {
        const itemCards = []
        for (let i = 0; i < attack.victim.activeCards.length; i++){
            const card  = attack.victim.activeCards[i];
            if (card.type == 'item'){
                itemCards.push(card)
            }
        }

        if (itemCards.length == 0) {
            console.log(attack.actionSet)
            return
        }

        for (let i = 0; i < itemCards.length; i++){
            const newButton = document.createElement("button");
            newButton.value = itemCards[i].name;
            newButton.innerHTML = itemCards[i].name;
            buttons.appendChild(newButton);
            function funct () {
                attack.handleLoot(newButton.value)
            }
            newButton.onclick = funct;
        }
        return
    }

    const creatureCards = []
    for (let i = 0; i < attack.victim.activeCards.length; i++){
        const card  = attack.victim.activeCards[i];
        if (card.type == 'creature'){
            creatureCards.push(card)
        }
    }
    
    const type = attack.actionSet[face];

    if (attack.actionSet[face] == MISS) {
        return
    }
    if (attack.actionSet[face] == CRITICAL_HIT) {
        for (const part in BODY_PARTS){
            if (attack.victim.bodyCards[BODY_PARTS[part]]){
                let newButton = document.createElement("button");
                newButton.value = BODY_PARTS[part];
                newButton.innerHTML = BODY_PARTS[part];
                buttons.appendChild(newButton);
                function funct () {
                    attack.handleHitBody(newButton.value, type, face)
                }
                newButton.onclick = funct;
            }
        }
    } else {
        const newButton = document.createElement("button");
        newButton.innerHTML = face;
        function funct(){
            attack.handleHitBody(face, attack.actionSet[face], face)
        }
        newButton.onclick = funct;
        buttons.appendChild(newButton);
    }

    for (let i = 0; i < creatureCards.length; i++){
        const newButton = document.createElement("button");
        newButton.value = creatureCards[i].name;
        newButton.innerHTML = creatureCards[i].name;
        buttons.appendChild(newButton);
        function funct () {
            attack.handleHitCreature(newButton.value, type, face)
        }
        newButton.onclick = funct;
    }

}