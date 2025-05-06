import { SCROLL_SPEED, GOAL_DISTANCE, MAX_TIME_MS, TRANSPARENT_DELAY_MS, getPlayerStartPosition } from '../config/params.js';
import { createPlayer, updatePlayerAnimation, stopPlayerAnimation } from '../logic/player.js';
import { spawnEnemy } from '../logic/enemy.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.moving = false;
    this.isWatching = false;
    this.enemyDirection = 'right';
    this.gameOver = false;
    this.transparentTimer = null;
    this.isTransparent = false;
  }

  preload() {
    this.load.image('background', import.meta.env.BASE_URL + 'images/background.jpg');
    this.load.image('player1', import.meta.env.BASE_URL + 'images/player1.png');
    this.load.image('player2', import.meta.env.BASE_URL + 'images/player2.png');
    this.load.image('player3', import.meta.env.BASE_URL + 'images/player3.png');
    this.load.image('enemy_back', import.meta.env.BASE_URL + 'images/enemy_back.png');
    this.load.image('enemy_front', import.meta.env.BASE_URL + 'images/enemy_front.png');
    this.load.image('enemy_left', import.meta.env.BASE_URL + 'images/enemy_left.png');
    this.load.image('enemy_right', import.meta.env.BASE_URL + 'images/enemy_right.png');
    this.load.audio('bgm', import.meta.env.BASE_URL + 'sounds/TEEMIX.mp3');
  }

  create() {
    const { width, height } = this.scale;

    this.moving = false;
    this.isWatching = false;
    this.gameOver = false;
    this.isTransparent = false;
    this.transparentTimer = null;

    this.background = this.add.tileSprite(width / 2, height / 2, width, height, 'background')
    .setDepth(-1); // 背景は最背面;

    // 背景画像のタイルスケール調整
    const bgFrame = this.textures.get('background').getSourceImage();
    const originalWidth = bgFrame.width;
    const originalHeight = bgFrame.height;
    this.background.setTileScale(width / originalWidth, height / originalHeight);
    this.background.setDepth(-1);

    const { x: playerX, y: playerY } = getPlayerStartPosition(this);
    this.player = createPlayer(this, playerX, playerY);

    this.bgm = this.sound.add('bgm', { loop: false });
    this.bgm.play();

    this.input.removeAllListeners();
    this.input.on('pointerdown', () => {
      this.moving = true;
      updatePlayerAnimation(this);

      if (this.transparentTimer) {
        this.transparentTimer.remove();
        this.transparentTimer = null;
      }

      this.player.setAlpha(1);
      this.isTransparent = false;
    });

    this.input.on('pointerup', () => {
      this.moving = false;
      stopPlayerAnimation(this);

      if (this.transparentTimer) {
        this.transparentTimer.remove();
      }

      this.transparentTimer = this.time.delayedCall(
        TRANSPARENT_DELAY_MS,
        () => {
          this.player.setAlpha(0.4);
          this.isTransparent = true;
        }
      );
    });

    spawnEnemy(this, this.enemyDirection);

    this.time.delayedCall(MAX_TIME_MS, () => {
      if (!this.gameOver) {
        this.gameOver = true;
        stopPlayerAnimation(this);
        if (this.bgm && this.bgm.isPlaying) this.bgm.stop();
        this.add.text(150, 300, 'TIME UP!', { fontSize: '48px', fill: '#ff0000' });
        this.input.once('pointerdown', () => this.scene.start('ResultScene', { result: 'CLEAR!' }));
      }
    });
  }

  update() {
    if (this.moving && !this.gameOver) {
      this.background.tilePositionX += SCROLL_SPEED;
    }

    if (!this.gameOver && this.isWatching && !this.isTransparent) {
      this.gameOver = true;
      stopPlayerAnimation(this);

      if (this.bgm && this.bgm.isPlaying) {
        this.bgm.stop();
        this.bgm.destroy();
      }

      const score = Math.floor(this.background.tilePositionX);
      this.scene.start('ResultScene', { result: 'GAME OVER', score });
    }

    if (!this.gameOver && this.background.tilePositionX >= GOAL_DISTANCE) {
      this.gameOver = true;
      stopPlayerAnimation(this);

      if (this.bgm && this.bgm.isPlaying) {
        this.bgm.stop();
        this.bgm.destroy();
      }

      const elapsed = this.time.now;
      const remaining = Math.max(0, MAX_TIME_MS - elapsed);
      const distanceScore = Math.floor(this.background.tilePositionX);
      const timeBonus = Math.floor(remaining);
      const score = distanceScore + timeBonus;

      this.scene.start('ResultScene', { result: 'CLEAR!', score });
    }
  }
}
