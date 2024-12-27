function loadImage(src){
    return new Promise((done, fail) => {
        const image = new Image()
        image.onload = () => done(image);
        image.onerror = fail;
        image.src = src;
    })
}

const images = {
    leftFootCard: await loadImage('./images/body-card-0.png'),
    leftHandCard: await loadImage('./images/body-card-1.png'),
    faceCard: await loadImage('./images/body-card-2.png'),
    rightHandCard: await loadImage('./images/body-card-3.png'),
    rightFootCard: await loadImage('./images/body-card-4.png'),
    redBg: await loadImage('./images/body-bg-red.png'),
    blueBg: await loadImage('./images/body-bg-blue.png'),
    
    itemBg: await loadImage('./images/item-cards/bg.png'),
    combatBoots: await loadImage('./images/item-cards/combat-boots.png'),
    invisibleGuitar: await loadImage('./images/item-cards/invisible-guitar.png'),
    
    creatureBg: await loadImage('./images/creature-cards/bg.png'),
    colorblindSpider: await loadImage('./images/creature-cards/colorblind-spider.png'),
    
    instantBg: await loadImage('./images/instant-cards/bg.png'),
    prosthetics: await loadImage('./images/instant-cards/prosthetics.png'),
    
    reactionBg: await loadImage('./images/reaction-cards/bg.png'),
    bananaPeel: await loadImage('./images/reaction-cards/banana-peel.png'),
};

export default images;
