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
    const { width, height } = this.scale; // ✅ ここで取得！
  
    const bg = this.add.image(width / 2, height / 2, 'background_synopsis');
    bg.setAlpha(0.4);
    bg.setDisplaySize(width, height); // ✅ 背景を画面いっぱいに！
  
    const text = this.add.text(width * 0.1, height * 0.1, SYNOPSIS_TEXT, {
      fontSize: '20px',
      fill: '#ffffff',
      wordWrap: { width: width * 0.8 }
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
