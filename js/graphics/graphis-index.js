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
