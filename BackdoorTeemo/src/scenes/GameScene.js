import { SCROLL_SPEED, PLAYER_START_X, PLAYER_START_Y, GOAL_DISTANCE, MAX_TIME_MS, TRANSPARENT_DELAY_MS } from '../config/params.js';
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
    this.load.image('background', '/images/background.jpg');
    this.load.image('player1', '/images/player1.png');
    this.load.image('player2', '/images/player2.png');
    this.load.image('player3', '/images/player3.png');
    
    
    this.load.image('enemy_back', '/images/enemy_back.png');
    this.load.image('enemy_front', '/images/enemy_front.png');
    this.load.image('enemy_left', '/images/enemy_left.png');
    this.load.image('enemy_right', '/images/enemy_right.png');
    this.load.audio('bgm', '/sounds/TEEMIX.mp3');
  }

  create() {
    this.moving = false;
    this.isWatching = false;
    this.gameOver = false;
    this.isTransparent = false;
    this.transparentTimer = null;

    this.background = this.add.tileSprite(400, 300, 800, 600, 'background');

    this.player = createPlayer(this, PLAYER_START_X, PLAYER_START_Y);

    // ✅ BGM再生は create() の中で即実行！
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
        this.bgm.destroy(); // ★追加！
      }
    
        const score = Math.floor(this.background.tilePositionX);
        this.scene.start('ResultScene', { result: 'GAME OVER', score });
    }

    if (!this.gameOver && this.background.tilePositionX >= GOAL_DISTANCE) {
      this.gameOver = true;
      stopPlayerAnimation(this);
    
      if (this.bgm && this.bgm.isPlaying) {
        this.bgm.stop();
        this.bgm.destroy(); // ★追加！
      }
    
        const elapsed = this.time.now; // 経過時間（ms）
        const remaining = Math.max(0, MAX_TIME_MS - elapsed);
        const distanceScore = Math.floor(this.background.tilePositionX);
        const timeBonus = Math.floor(remaining); // 100msあたり1点
        const score = distanceScore + timeBonus;

        this.scene.start('ResultScene', { result: 'CLEAR!', score });
    }
    
  }
}
