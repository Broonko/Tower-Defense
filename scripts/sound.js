function Sound() {
  this.towerBuilt = new Audio('sounds/tower.mp3');
  this.towerBuilt.volume = 0.1;
  this.enemyKilled = new Audio('sounds/enemyDeath.mp3');
  this.enemyKilled.volume = 0.2;
  this.backgroundMusic = new Audio('sounds/backgroundMusic.mp3');
  this.backgroundMusic.volume = 0.2;
  this.winSound = new Audio('sounds/you-win-tekken.mp3');
  this.winSound.volume = 0.2;
  this.shootSound = new Audio('sounds/sfx_wpn_laser7.wav');
  this.shootSound.volume = 0.2;
  // this.startMusic = new Audio('sounds/elevation.mp3');
}