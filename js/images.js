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
};

export default images;
