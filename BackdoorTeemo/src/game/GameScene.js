import { SCROLL_SPEED, PLAYER_START_X, PLAYER_START_Y, ENEMY_Y, WATCH_TIME, TURN_BACK_TIME, ENEMY_MOVE_DURATION } from '../config/params.js'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene')
        this.moving = false
        this.isWatching = false
        this.enemyDirection = 'right'
        this.gameOver = false
    }

    preload() {
        this.load.image('background', '/images/background.jpg')
        this.load.image('walk1', '/images/walk1.png')
        this.load.image('walk2', '/images/walk2.png')
        this.load.image('walk3', '/images/walk3.png')
        this.load.image('enemy_back', '/images/enemy_back.png')
        this.load.image('enemy_front', '/images/enemy_front.png')
        this.load.image('enemy_left', '/images/enemy_left.png')
        this.load.image('enemy_right', '/images/enemy_right.png')
    }

    create() {
        this.background = this.add.tileSprite(400, 300, 800, 600, 'background')
        this.player = this.add.sprite(PLAYER_START_X, PLAYER_START_Y, 'walk2')

        this.anims.create({
            key: 'walk',
            frames: [
                { key: 'walk1' },
                { key: 'walk2' },
                { key: 'walk3' }
            ],
            frameRate: 8,
            repeat: -1
        })

        this.input.on('pointerdown', () => {
            this.moving = true
            this.player.play('walk')
        })

        this.input.on('pointerup', () => {
            this.moving = false
            this.player.anims.stop()
            this.player.setTexture('walk2')
        })

        this.spawnEnemy(this.enemyDirection)
    }

    update() {
        if (this.gameOver) return

        if (this.moving) {
            this.background.tilePositionX += SCROLL_SPEED

            if (this.isWatching) {
                this.gameOver = true
                this.add.text(200, 300, 'GAME OVER', { fontSize: '48px', fill: '#ff0000' })
            }
        }
    }

    spawnEnemy(fromDirection) {
        const startX = fromDirection === 'left' ? 0 : 800
        const moveTexture = fromDirection === 'left' ? 'enemy_right' : 'enemy_left'
        const returnX = fromDirection === 'left' ? 0 : 800
        const returnTexture = fromDirection === 'left' ? 'enemy_left' : 'enemy_right'
        this.enemyDirection = fromDirection

        this.enemy = this.add.sprite(startX, ENEMY_Y, moveTexture)

        this.tweens.add({
            targets: this.enemy,
            x: 400,
            duration: ENEMY_MOVE_DURATION,
            onUpdate: () => {
                this.enemy.setTexture(moveTexture)
            },
            onComplete: () => {
                this.enemy.setTexture('enemy_back')

                this.time.delayedCall(TURN_BACK_TIME, () => {
                    this.enemy.setTexture('enemy_front')
                    this.isWatching = true

                    this.time.delayedCall(WATCH_TIME, () => {
                        this.isWatching = false
                        this.enemy.setTexture(returnTexture)

                        this.tweens.add({
                            targets: this.enemy,
                            x: returnX,
                            duration: ENEMY_MOVE_DURATION,
                            onUpdate: () => {
                                this.enemy.setTexture(returnTexture)
                            },
                            onComplete: () => {
                                this.spawnEnemy(fromDirection === 'left' ? 'right' : 'left')
                            }
                        })
                    })
                })
            }
        })
    }
}
