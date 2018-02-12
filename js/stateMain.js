var StateMain = {
  preload: function () {
    if (screen.width < 900){
      game.scale.forceOrientation(true, false);
    }

    game.load.spritesheet("dragon", "images/main/dragon.png", 120, 85, 4);
    game.load.image("background", "images/main/background.png");
    game.load.spritesheet("candy", "images/main/candy.png", 52, 50, 8);
    game.load.image("balloon", "images/main/thought.png");

  },//CLOSE preload:

  create: function () {
    //init vars
    score = 0;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.top = 0;
    this.bottom = game.height - 120;

    //Dragon
    this.dragon = game.add.sprite(0, 0, "dragon");
    this.dragon.animations.add("fly", [0, 1, 2, 3], 12, true);
    this.dragon.animations.play("fly");

    //background
    this.background = game.add.tileSprite(0, game.height-480, game.width, 480, 'background');

    //IPAD FIX
    if(screen.height>764){
      this.background.y=game.world.centerY-
      this.background.height/2;
      this.top=this.background.y;
    }

    this.dragon.bringToTop();
    this.dragon.y=this.top;


    this.background.autoScroll(-100, 0);

    //Candies
    this.candies=game.add.group();
    this.candies.createMultiple(40, 'candy');
    this.candies.setAll('checkWorldBounds', true);
    this.candies.setAll('outOfBoundsKill', true);

    //Thought
    this.balloonGroup = game.add.group();
    this.balloon = game.add.sprite(0, 0, "balloon");
    this.think = game.add.sprite(36, 26, "candy");
    this.balloonGroup.add(this.balloon);
    this.balloonGroup.add(this.think);
    this.balloonGroup.scale.x = 0.5;
    this.balloonGroup.scale.y = 0.5;
    this.balloonGroup.x = 50;

    //text
    this.scoreText = game.add.text(game.world.centerX, 60, "0");
    this.scoreText.fill = "#000000";
    this.scoreText.fontSize = 64;
    this.scoreText.anchor.set(0.5, 0.5);

    this.scoreLabel = game.add.text(game.world.centerX, 20, "SCORE");
    this.scoreLabel.fill = "#000000";
    this.scoreLabel.fontSize = 32;
    this.scoreLabel.anchor.set(0.5, 0.5);

    //Dragon Physics
    game.physics.enable([this.dragon, this.candies],Phaser.Physics.ARCADE);
    this.dragon.body.gravity.y = 500;
    this.dragon.body.immovable = true;

    this.setListeners();
    this.resetThink();
  },//CLOSE create:

  setListeners: function(){

    if (screen.width<900){
      game.scale.enterIncorrectOrientation.add(this.wrongWay, this);
      game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
    }
    game.time.events.loop(Phaser.Timer.SECOND, this.fireCandy, this);
  },

  fireCandy: function (){
    var candy = this.candies.getFirstDead();
    var yy = game.rnd.integerInRange(0, game.height-60);
    var xx = game.width-100;
    var type = game.rnd.integerInRange(0, 7);

    candy.frame = type;
    candy.reset(xx, yy);
    candy.enabled = true;
    candy.body.velocity.x = -200;
  },

  wrongWay: function(){
    //Check to see if it detects the enterIncorrectOrientation
    console.log("wrongWay");
    //When in wrongWay make the div #wrongWay display BLOCK
    document.getElementById("wrongWay").style.display="block";
  },

  rightWay:function(){
    //Check to see if it detects the leaveIncorrectOrientation
    console.log("rightWay");
    //When in the rightWay make the div #wrongWay display NONE
    document.getElementById("wrongWay").style.display="none";
  },

  flap: function(){
    this.dragon.body.velocity.y = -350;
  },

  onEat: function(dragon, candy){
    if(this.think.frame == candy.frame){
      candy.kill();
      this.resetThink();
      score += 1;
      this.scoreText.text = score;
    }
    else{
      candy.kill();
      game.state.start("StateOver");
    }
  },

  resetThink: function(){
    var thinking = game.rnd.integerInRange(0, 7);
    this.think.frame = thinking;
  },

  update: function () {
    //Collisions
    game.physics.arcade.collide(this.dragon, this.candies, null, this.onEat, this);

    this.balloonGroup.y = this.dragon.y - 60;

    if(game.input.activePointer.isDown){
      this.flap();
    }

    //Check if dragon is going above screen
    if(this.dragon.y<this.top){
      //If it's too high, make y equal to this.top
      this.dragon.y=this.top;
      //remove the y velocity to prevent flapping past screen
      this.dragon.body.velocity.y = 0;

    }

    //Check if dragon is going below the screen
    if(this.dragon.y > this.bottom){
      //If too low set y to this.bottom
      this.dragon.y = this.bottom;
      //Remove y gravity to prevent just falling below screen
      this.dragon.body.gravity.y = 0;
    }

    else {
      //If the dragon isn't too low,
      //Increase it's y gravity to 500
      //So when you flap you can go up
      this.dragon.body.gravity.y = 500;
    }
  },//CLOSE update:

};
