import { CHARACTER_SCALE } from '../config/params.js';

export function createPlayer(scene, x, y) {
  const player = scene.add.sprite(x, y, 'player3');
  player.setScale(CHARACTER_SCALE.player); // ← プレイヤー用スケール！
  
    if (!scene.anims.exists('walk')) {
      scene.anims.create({
        key: 'walk',
        frames: [
          { key: 'player1' },
          { key: 'player2' }
        ],
        frameRate: 6,
        repeat: -1
      });
    }
  
    return player;
  }
  
  export function updatePlayerAnimation(scene) {
    if (scene.player && scene.anims.exists('walk')) {
      scene.player.play('walk');
    }
  }
  
  export function stopPlayerAnimation(scene) {
    if (scene.player) {
      scene.player.anims.stop();
      scene.player.setTexture('player3'); // ← 止まったら player3 に切り替え
    }
  }
  