import Player from "../model/player.js"

export function drawPlayerCards(player = new Player()) {
    const div = document.querySelector('#p' + player.id + '-body-cards')
    div.innerHTML = '';
    for(const part in player.bodyCards) {
        let img = document.createElement("img");
        img.width = '64'
        if(player.bodyCards[part]) {
            img.src = "./images/dice-" + part + ".png"
        } else {
            img.src = "./images/bust.png"
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
