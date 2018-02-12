var StateMain = {
  preload: function () {
    if (screen.width < 1500){
      game.scale.forceOrientation(true, false);
    }

    game.load.spritesheet("dragon", "images/main/dragon.png", 120, 85, 4);
    game.load.image("background", "images/main/background.png");
    game.load.spritesheet("candy", "images/main/candy.png", 52, 50, 8);
  },//CLOSE preload:

  create: function () {
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

    //Dragon Physics
    game.physics.enable([this.dragon, this.candies],Phaser.Physics.ARCADE);
    this.dragon.body.gravity.y = 500;
    this.dragon.body.immovable = true;

    this.setListeners();
  },//CLOSE create:

  setListeners: function(){

    if (screen.width<1500){
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
    candy.kill();
  },

  update: function () {
    //Collisions
    game.physics.arcade.collide(this.dragon, this.candies, null, this.onEat);

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
