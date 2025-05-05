// ✅ パラメータをインポートする
import { SYNOPSIS_TEXT } from '../config/params.js';

export default class SynopsisScene extends Phaser.Scene {
  constructor() {
    super('SynopsisScene');
  }

  preload() {
    this.load.image('background_synopsis', '/images/background_synopsis.png');
  }

  create() {
    const bg = this.add.image(400, 300, 'background_synopsis');
    bg.setAlpha(0.4);

    const text = this.add.text(100, 100, SYNOPSIS_TEXT, {
      fontSize: '20px',
      fill: '#ffffff',
      wordWrap: { width: 600 }
    });
    text.setShadow(2, 2, '#000', 2, false, true);

    this.input.once('pointerdown', () => {
      this.scene.start('GameScene');
    });

    this.time.delayedCall(7000, () => {
      this.scene.start('GameScene');
    });
  }
}
