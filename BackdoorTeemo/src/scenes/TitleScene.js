export default class TitleScene extends Phaser.Scene {
    constructor() {
      super('TitleScene');
    }
  
    create() {
      this.add.text(200, 200, 'Backdoor Teemo', {
        fontSize: '48px',
        fill: '#ffffff'
      });
  
      this.add.text(220, 300, 'Tap to Start', {
        fontSize: '24px',
        fill: '#cccccc'
      });
  
      this.input.once('pointerdown', () => {
        if (this.sound.context.state === 'suspended') {
          this.sound.context.resume();
        }
      
        this.scene.start('SynopsisScene');
      });
    }
  }
  