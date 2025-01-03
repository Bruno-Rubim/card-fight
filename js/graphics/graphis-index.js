import { ATTACK_DICE_FACES } from "../constants.js";
import { countValueInArray } from "../model/combat.js";
import Player from "../model/player.js"
import { colorList } from "./colors.js";

export function drawPlayerCards(player = new Player()) {
    const div = document.querySelector('#p' + player.id + '-body-cards')
    div.innerHTML = '';
    for(const part in player.bodyCards) {
        let img = document.createElement("img");
        if(player.bodyCards[part]) {
            img.src = "./images/body-card-" + part + ".png"
            img.style.backgroundColor = colorList[player.id]
        } else {
            img.src = "./images/back-card.png"
        }
            div.appendChild(img);
    }
}

export function deletePlayerButtons(player){
    const div = document.querySelector('#p' + player.id + '-buttons')
    div.innerHTML = '';
}

export function createPlayerButton(player, button = {text: '', funct(){}}){
    const div = document.querySelector('#p' + player.id + '-buttons')

    let newButton = document.createElement("button");
    newButton.innerHTML = button.text;
    newButton.onclick = button.funct;

    div.appendChild(newButton);
}

export function disablePlayerButtons(player){
    const coll = document.querySelector('#p' + player.id + '-buttons').children
    const buttons = Array.prototype.slice.call(coll)
    buttons.forEach(button => {
        button.disabled = true;
    });
}

export function enablePlayerButtons(player){
    const coll = document.querySelector('#p' + player.id + '-buttons').children
    const buttons = Array.prototype.slice.call(coll)
    buttons.forEach(button => {
        button.disabled = false;
    });
}

export function drawDiceSet(diceSet){
    const div = document.querySelector('#dice')
    div.innerHTML = ''
    ATTACK_DICE_FACES.forEach(face => {
        const faceCount = countValueInArray(diceSet, face)
        for (let i = 0; i < faceCount; i++){
            let img = document.createElement("img");
            img.width = '64'
            img.src = "./images/dice-" + face + ".png"
            div.appendChild(img);
        }
    })
}
