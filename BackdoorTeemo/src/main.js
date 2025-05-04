import Phaser from 'phaser'
import GameScene from './game/GameScene.js'

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#3498db',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: GameScene
}

new Phaser.Game(config)
