import { calculateFinalScore } from '../logic/score.js';

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene');
  }

  init(data) {
    this.result = data.result || 'GAME OVER';
    this.score = data.score || 0;
  }

  create() {
    const { width, height } = this.scale;

    // スコアが未設定ならここで再計算（安全対策）
    if (!this.score && this.scene.get('GameScene')) {
      const gameScene = this.scene.get('GameScene');
      const scrollX = gameScene.background.tilePositionX;
      const startTime = gameScene.startTimestamp;
      const endTime = this.time.now;
      this.score = calculateFinalScore(scrollX, startTime, endTime);
    }

    this.cameras.main.setBackgroundColor('#000000');

    const resultText = this.add.text(width / 2, height * 0.25, this.result, {
      fontSize: `${Math.floor(height * 0.06)}px`,
      fill: '#ffffff',
      align: 'center',
      wordWrap: { width: width * 0.9 }
    }).setOrigin(0.5);

    const scoreText = this.add.text(width / 2, height * 0.45, `Score: ${this.score}`, {
      fontSize: `${Math.floor(height * 0.04)}px`,
      fill: '#ffff66',
      align: 'center',
      wordWrap: { width: width * 0.8 }
    }).setOrigin(0.5);

    const tapText = this.add.text(width / 2, height * 0.7, 'Tap to Restart', {
      fontSize: `${Math.floor(height * 0.045)}px`,
      fill: '#cccccc',
      align: 'center'
    }).setOrigin(0.5);

    this.input.once('pointerdown', () => {
      this.scene.start('TitleScene');
    });
  }
}
