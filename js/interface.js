import { BODY_PARTS } from "./constants.js";
import images from "./images.js";
import Player from "./model/player.js";

const cardWidth = 132;
const cardHeight = 200;
const cardGap = 8;

const colors = [
    'blue',
    'red',
    'green',
    'yellow',
    'purple',
    'orange',
]

const canvas = document.querySelectorAll('canvas')[0];
canvas.width = 692
canvas.height = 408

export function drawPlayerCards(player = new Player()){
    const canvas = document.querySelectorAll('canvas')[player.id];
    const ctx = canvas.getContext('2d');
    BODY_PARTS.forEach((bodyPart, i) => {
        const color = colors[player.id]
        const bgImg = images[color + 'Bg']
        const img = images[bodyPart + 'Card']
        ctx.drawImage(bgImg, (cardWidth + cardGap) * i, 0);
        ctx.drawImage(img, (cardWidth + cardGap) * i, 0);
    });
    player.cards.forEach((card, i) => {
        const type = card.type
        const bgImg = images[type + 'Bg']
        const img = images[card.name]
        ctx.drawImage(bgImg, (cardWidth + cardGap) * i, 208);
        ctx.drawImage(img, (cardWidth + cardGap) * i, 208);
    })

}