import { Player } from "./classes/player-class.js";

function loadImg(src) {
    let promise = new Promise(function(done) {
        let img = new Image();
        img.onload = function() {
            done(img);
        };
        img.src = src;
    })
    return promise;
}

export async function drawBodyCards(player = new Player()){
    const canvas = document.querySelector('#canvas-body-' + player.id);
    const ctx = canvas.getContext('2d');
    
    canvas.width = 684;
    canvas.height = 208;

    let cardBack = await loadImg("/images/back-card.png");
    let backgroundImage = await loadImg("/images/body-bg-" + player.color + ".png");
    let face = await loadImg("/images/body-card-0.png");
    let handR = await loadImg("/images/body-card-1.png");
    let handL = await loadImg("/images/body-card-2.png");
    let footR = await loadImg("/images/body-card-3.png");
    let footL = await loadImg("/images/body-card-4.png");

    const cardPositions = [276, 412, 140, 548, 4];
    const cardImages = [face, handR, handL, footR, footL]

    let cardCoutner = 0;
    player.bodyCards.forEach(bodyCard => {
        if (bodyCard) {
            ctx.drawImage(backgroundImage, cardPositions[cardCoutner], 4);
            ctx.drawImage(cardImages[cardCoutner], cardPositions[cardCoutner], 4);
        } else {
            ctx.drawImage(cardBack, cardPositions[cardCoutner], 4);
        }
        cardCoutner++
    });
}

export async function drawActiveCards(player = new Player()){
    const canvas = document.querySelector('#canvas-active-' + player.id);
    const ctx = canvas.getContext('2d');
    
    canvas.width = 684;
    canvas.height = 208;

    async function loadCard (card) {
        await loadImg(card.imageSrc);
    }
    
    for (let i = 0; i < player.cards.length; i++) {
        let backgroundImage = await loadImg("/images/" + player.cards[i].type + "-cards/bg.png");
        console.log(player.cards[i].imageSrc);
        let cardImage = await loadImg(player.cards[i].imageSrc);
        ctx.drawImage(backgroundImage, (i * 136) + 4, 4);
        ctx.drawImage(cardImage, (i * 136) + 4, 4);
    }
}