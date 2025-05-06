export default class TitleScene extends Phaser.Scene {
    constructor() {
      super('TitleScene');
    }
  
    create() {
      const { width, height } = this.scale;

      const titleText = this.add.text(width / 2, height * 0.3, 'Backdoor Teemo', {
        fontSize: `${Math.floor(height * 0.06)}px`,  // 高さの8%
        fill: '#ffffff',
        align: 'center',
        wordWrap: { width: width * 0.9 }
      }).setOrigin(0.5);
    
      const tapText = this.add.text(width / 2, height * 0.6, 'Tap to Start', {
        fontSize: `${Math.floor(height * 0.04)}px`,
        fill: '#cccccc',
        align: 'center',
        wordWrap: { width: width * 0.8 }
      }).setOrigin(0.5);
  
      this.input.once('pointerdown', () => {
        if (this.sound.context.state === 'suspended') {
          this.sound.context.resume();
        }
      
        this.scene.start('SynopsisScene');
      });
    }
  }
  