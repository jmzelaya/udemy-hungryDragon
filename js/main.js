var game;
//Adding var to main gives ALL states access to it.
var score;
var soundOn=true;

window.onload = function(){
  if(screen.width>1500){
    game = new Phaser.Game(640, 480, Phaser.AUTO, "ph_game");
  }
  else{
    game = new
    Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, "ph_game");
  }
  game.state.add("StateMain", StateMain);
  game.state.add("StateTitle", StateTitle);
  game.state.add("StateOver", StateOver);
  game.state.start("StateMain");
};
