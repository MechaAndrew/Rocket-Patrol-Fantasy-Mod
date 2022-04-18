class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }
  preload() {
    // load images/tile sprites
    this.load.image('rocket', './assets/archer.png');
    this.load.image('rocket2', './assets/archer2.png');
    this.load.image('spaceship', './assets/skeleton.gif');
    this.load.image('starfield', './assets/starfield.png');
    this.load.spritesheet('explosion', './assets/explosion.gif', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 60});
  }
  create() {
    // place tile sprite
    this.starfield = this.add.tileSprite(0, 0, 0, 0, 'starfield').setOrigin(0, 0);

    // green UI background
    this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x444644).setOrigin(0, 0);

    // white borders
    // this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    // this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    // this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

    // add rocket (p1)
    this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
   // add rocket (p2)
    this.p2Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket2').setOrigin(1, 0);


    // add spaceships (x3)
    this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
    this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
    this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
    this.ship04 = new Spaceship(this, game.config.width, borderUISize*9 + borderPadding*5, 'spaceship', 0, 10).setOrigin(0,0);


    // define keys
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


    keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
  
    keyLEFT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    // animation config
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 16, first: 0}),
      frameRate: 60
    });

    this.p1Score = 0;
    // display score
    let scoreConfig = {
      fontFamily: 'Smooth Fantasy Font',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
      fixedWidth: 200
    }

this.gameClock = game.settings.gameTimer;


//config for the clock
    let timeConfig = {
      fontFamily: 'Smooth Fantasy Font',
      fontSize: '28px',
      backgroundColor: '#00011',
      color: '#843605',
      align: 'center',
        padding: {
          top: 5,
          bottom: 5,
        },
      fixedWidth: 100,
      right: 0,
      
    }
    this.gameClock = this.game.settings.gameTimer;//game time settings 60000

    //add the time text to the screen
    this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
    this.timeLeft = this.add.text(borderUISize+ borderPadding,  borderUISize + borderPadding*2 ,this.formatTime(this.gameClock), timeConfig);



    this.timer = this.time.addEvent(
            {
                delay: 1000,
                callback: () => {
                    this.gameClock -= 1000; 
                    this.timeLeft.text = this.formatTime(this.gameClock);
                },
                scope: this,
                loop: true
            }
        );

    // 60-second play clock
    scoreConfig.fixedWidth = 0;
    this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
      this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
      this.gameOver = true;
    }, null, this);

    this.gameOver = false;

  }

  update() {
    this.starfield.tilePositionX -= 4;
    if(!this.gameOver){
      // this.clockLeft.text = clockLeft.toFixed(2);//toFixed() wont work
      this.p1Rocket.update();
      this.p2Rocket.update2();
      this.ship01.update();
      this.ship02.update();
      this.ship03.update();
      this.ship04.update();
    }
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
      this.scene.restart();
    }

    // check collisions p1
    if(this.checkCollision(this.p1Rocket, this.ship04)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship04);
    }
    if(this.checkCollision(this.p1Rocket, this.ship03)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship03);
    }
    if (this.checkCollision(this.p1Rocket, this.ship02)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship02);
      }
    if (this.checkCollision(this.p1Rocket, this.ship01)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship01);
    }
 // check collisions p2
 if(this.checkCollision(this.p2Rocket, this.ship04)) {
  this.p2Rocket.reset();
  this.shipExplode(this.ship04);
}
if(this.checkCollision(this.p2Rocket, this.ship03)) {
  this.p2Rocket.reset();
  this.shipExplode(this.ship03);
}
if (this.checkCollision(this.p2Rocket, this.ship02)) {
  this.p2Rocket.reset();
  this.shipExplode(this.ship02);
  }
if (this.checkCollision(this.p2Rocket, this.ship01)) {
  this.p2Rocket.reset();
  this.shipExplode(this.ship01);
}


    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      this.scene.start("menuScene");
    }
  }

  checkCollision(rocket, ship) {
    // simple AABB checking
    if (rocket.x < ship.x + ship.width && 
        rocket.x + rocket.width > ship.x && 
        rocket.y < ship.y + ship.height &&
        rocket.height + rocket.y > ship. y) {
      return true;
    } else {
      return false;
    }
  }
  shipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0;
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explode');             // play explode animation
    boom.on('animationcomplete', () => {    // callback after anim completes
      ship.reset();                         // reset ship position
      ship.alpha = 1;                       // make ship visible again
      boom.destroy();                       // remove explosion sprite
    });
    this.p1Score += ship.points;
    this.scoreLeft.text = this.p1Score;   
    this.sound.play('sfx_explosion');   
  }
  //function to format the minutes and seconds countdown
  formatTime(ms){
    let sec = ms/1000;//divide the milliseconds by 1000
    let min = Math.floor(sec/60);//calculate the minutes
    let seconds = sec%60;//calculate the display seconds
    seconds = seconds.toString().padStart(2, "0");//adding the extra 0 at the end
    return `${min}:${seconds}`;//returning the calculated time left
}

}

