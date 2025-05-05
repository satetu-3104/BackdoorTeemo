export function createPlayer(scene, x, y) {
    const player = scene.add.sprite(x, y, 'walk2');
  
    if (!scene.anims.exists('walk')) {
      scene.anims.create({
        key: 'walk',
        frames: [
          { key: 'walk1' },
          { key: 'walk2' },
          { key: 'walk3' }
        ],
        frameRate: 8,
        repeat: -1
      });
    }
  
    return player;
  }
  
  export function updatePlayerAnimation(scene) {
    if (scene.player) {
      scene.player.play('walk');
    }
  }
  
  export function stopPlayerAnimation(scene) {
    if (scene.player) {
      scene.player.anims.stop();
      scene.player.setTexture('walk2');
    }
  }
  