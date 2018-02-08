var StateMain = {
  preload: function () {
    if (screen.width < 900){
      game.scale.forceOrientation(true, false);
    }

    game.load.spritesheet("dragon", "images/main/dragon.png", 120, 85, 4);
    game.load.image("background", "images/main/background.png");
  },

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
    //Dragon Physics
    game.physics.enable(this.dragon,Phaser.Physics.ARCADE);

    this.dragon.body.gravity.y = 500;

    this.background.autoScroll(-100, 0);

    this.setListeners();
  },

  setListeners: function(){

    if (screen.width<900){
      game.scale.enterIncorrectOrientation.add(this.wrongWay, this);
      game.scale.leaveIncorrectOrientation.add(this.rightWay, this);
    }
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


  update: function () {
    if(game.input.activePointer.isDown){
      this.flap();
    }
    if(this.dragon.y<this.top){
      this.dragon.y=this.top;
      this.dragon.body.velocity.y = 0;

    }
    if(this.dragon.y > this.bottom){
      this.dragon.y = this.bottom;
      this.dragon.body.gravity.y = 0;
    }

    else {
      this.dragon.body.gravity.y = 500;
    }
  },

};
