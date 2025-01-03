import Player from "../model/player.js"

export function drawPlayerCards(player = new Player()) {
    const div = document.querySelector('#player-' + player.id + '-body-cards')
    div.innerHTML = '';
    for(const part in player.bodyCards) {
        let img = document.createElement("img");
        img.width = '64'
        if(player.bodyCards[part]) {
            img.src = "./../../images/dice-" + part + ".png"
        } else {
            img.src = "./../../images/bust.png"
        }
        div.appendChild(img);
    }
}