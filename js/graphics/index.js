import Player from "../model/player.js"
import { colorHex, colorList } from "./colors.js";

export function drawPlayerCards(player = new Player()) {
    const body = document.querySelector('#p' + player.id + '-body-cards')
    const active = document.querySelector('#p' + player.id + '-active-cards')
    body.innerHTML = '';
    for(const part in player.bodyCards) {
        let img = document.createElement("img");
        if(player.bodyCards[part]) {
            img.src = "./images/body-card-" + part + ".png"
            img.style.backgroundColor = colorHex[colorList[player.id]]
        } else {
            img.src = "./images/back-card.png"
        }
        body.appendChild(img);
    }
    for (let i = 0; i < player.activeCards.length; i++) {
        const card = player.activeCards[i]
        let img = document.createElement("img");
        img.src = "./images/" + card.type + "-cards/" + card.name + ".png"
        img.style.backgroundColor = colorHex[card.type]
        body.appendChild(img);
    }
}