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

export function drawPlayerCards(player = new Player()){
    const canvas = document.querySelectorAll('canvas')[player.id];
    const ctx = canvas.getContext('2d');
    BODY_PARTS.forEach((bodyPart, i) => {
        const color = colors[player.id]
        const bgImg = images[color + 'Bg']
        const img = images[bodyPart + 'Card']
        ctx.drawImage(bgImg, (cardWidth + cardGap) * i, 0);
        ctx.drawImage(img, (cardWidth + cardGap) * i, 0);
    })
}