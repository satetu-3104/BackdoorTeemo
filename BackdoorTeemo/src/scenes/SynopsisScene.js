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
    const { width, height } = this.scale;
  
    const bg = this.add.image(width / 2, height / 2, 'background_synopsis');
    bg.setDisplaySize(width, height);
    bg.setAlpha(0.4);
  
    const synopsis = this.add.text(width / 2, height * 0.1, SYNOPSIS_TEXT, {
      fontSize: `${Math.floor(height * 0.025)}px`,
      fill: '#ffffff',
      align: 'left',
      wordWrap: { width: width * 0.8 }
    }).setOrigin(0.5, 0);
  
    synopsis.setShadow(2, 2, '#000', 2, false, true);
  
    this.input.once('pointerdown', () => {
      this.scene.start('GameScene');
    });
  
    this.time.delayedCall(7000, () => {
      this.scene.start('GameScene');
    });
  }
  
}
