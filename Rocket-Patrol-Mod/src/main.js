let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    scene: [Menu, Play]
}

//reserve keyboard vars
let keyF, keyR , keyLEFT2, keyRIGHT2, keyLEFT, keyRIGHT,keyL;

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;