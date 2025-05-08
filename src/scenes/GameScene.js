import { preloadGameAssets } from '../logic/preloadAssets.js';
import { createBackground } from '../logic/background.js';
import { createPlayer } from '../logic/player.js';
import { setupPlayerInput } from '../logic/playerEvents.js';
import { setupGameTimer, checkGameConditions } from '../logic/gameEvents.js';
import { getPlayerStartPosition, SCROLL_SPEED } from '../config/params.js';
import { spawnEnemy } from '../logic/enemy.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    preloadGameAssets(this);
  }

  create() {
    this.moving = false;
    this.isWatching = false;
    this.gameOver = false;
    this.isTransparent = false;
    this.transparentTimer = null;

    this.background = createBackground(this);

    const { x, y } = getPlayerStartPosition(this);
    this.player = createPlayer(this, x, y);

    this.bgm = this.sound.add('bgm', { loop: false });
    this.bgm.play();

    setupPlayerInput(this);
    setupGameTimer(this);
    spawnEnemy(this, 'right');
  }

  update() {
    checkGameConditions(this);
  }
}
