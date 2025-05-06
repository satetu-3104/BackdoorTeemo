import Phaser from 'phaser';
import TitleScene from './scenes/TitleScene.js';
import GameScene from './scenes/GameScene.js';
import ResultScene from './scenes/ResultScene.js';
import SynopsisScene from './scenes/SynopsisScene.js';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [TitleScene, SynopsisScene, GameScene, ResultScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.RESIZE,  // ✅ ウィンドウリサイズにも対応
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

new Phaser.Game(config);
