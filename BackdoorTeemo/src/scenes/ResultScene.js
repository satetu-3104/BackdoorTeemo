export default class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene');
  }

  init(data) {
    this.resultText = data.result || 'GAME OVER';
    this.score = data.score || 0;
  }
  
  create() {
    this.add.text(220, 200, this.resultText, {
      fontSize: '48px',
      fill: '#ffcc00'
    });
  
    this.add.text(220, 280, `SCORE: ${this.score}`, {
      fontSize: '32px',
      fill: '#ffffff'
    });
  
    this.add.text(200, 400, 'Tap to Return to Title', {
      fontSize: '24px',
      fill: '#cccccc'
    });
  
    this.input.once('pointerdown', () => {
      this.scene.start('TitleScene');
    });
  }
  
}
