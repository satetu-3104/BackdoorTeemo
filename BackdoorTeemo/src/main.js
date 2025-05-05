import Phaser from 'phaser';
import TitleScene from './scenes/TitleScene.js';
import GameScene from './scenes/GameScene.js';
import ResultScene from './scenes/ResultScene.js';
import SynopsisScene from './scenes/SynopsisScene.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  scene: [TitleScene, SynopsisScene, GameScene, ResultScene],
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  }
};

new Phaser.Game(config);
