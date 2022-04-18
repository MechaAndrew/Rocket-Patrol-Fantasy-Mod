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

// Andrew Dresel-Kurtz
//Rocket Patrol Fantasy Mod
//4/18/22
//Around 6 hours or so to complete

//General coding help from (http://ex-artist.com/CMPM120/Tutorials/Phaser%203%20Rocket%20Patrol%20Tutorial.html)
//Additional coding help for the timer by i-cortez (https://github.com/i-cortez/CMPM-120_Rocket-Patrol-Mods/blob/master/README.md)
//All other code and assets by me

//Implement a simultaneous two-player mode (30)
//Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
//Display the time remaining (in seconds) on the screen (10)