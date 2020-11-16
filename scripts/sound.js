// Añade efectos de sonido al juego.
function Sound() {
  this.towerBuilt = new Audio('sounds/tower.mp3');
  this.towerBuilt.volume = 0.1;
  this.enemyKilled = new Audio('sounds/enemyDeath.wav');
  this.enemyKilled.volume = 0.1;
  this.backgroundMusic = new Audio('sounds/backgroundMusic.mp3');
  this.backgroundMusic.volume = 0.1;
  this.winSound = new Audio('sounds/youWin.mp3');
  this.winSound.volume = 0.1;
  this.shootSound = new Audio('sounds/shoot.wav');
  this.shootSound.volume = 0.05;
  this.gameOver = new Audio('sounds/gameOver.mp3');
  this.gameOver.volume = 0.05;
  this.startMusic = new Audio('sounds/start.mp3');
  this.startMusic.volume = 0.05;

  this.pauseAll = function() {
    this.towerBuilt.pause();
    this.enemyKilled.pause();
    this.backgroundMusic.pause();
    this.winSound.pause();
    this.shootSound.pause();
    this.gameOver.pause();
    this.startMusic.pause();
  };
};