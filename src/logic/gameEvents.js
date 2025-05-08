import { SCROLL_SPEED, MAX_TIME_MS, GOAL_DISTANCE } from '../config/params.js';
import { stopPlayerAnimation } from './player.js';


export function setupGameTimer(scene) {
  scene.time.delayedCall(MAX_TIME_MS, () => {
    if (!scene.gameOver) {
      scene.gameOver = true;
      stopPlayerAnimation(scene);
      if (scene.bgm?.isPlaying) scene.bgm.stop();
      scene.add.text(150, 300, 'TIME UP!', { fontSize: '48px', fill: '#ff0000' });
      scene.input.once('pointerdown', () => scene.scene.start('ResultScene', { result: 'CLEAR!' }));
    }
  });
}

export function checkGameConditions(scene) {
  if (scene.moving && !scene.gameOver) {
    scene.background.tilePositionX += SCROLL_SPEED;
  }

  if (!scene.gameOver && scene.isWatching && !scene.isTransparent) {
    scene.gameOver = true;
    stopPlayerAnimation(scene);
    scene.bgm?.stop(); scene.bgm?.destroy();
    const score = Math.floor(scene.background.tilePositionX);
    scene.scene.start('ResultScene', { result: 'GAME OVER', score });
  }

  if (!scene.gameOver && scene.background.tilePositionX >= GOAL_DISTANCE) {
    scene.gameOver = true;
    stopPlayerAnimation(scene);
    scene.bgm?.stop(); scene.bgm?.destroy();
    const elapsed = scene.time.now;
    const remaining = Math.max(0, MAX_TIME_MS - elapsed);
    const score = Math.floor(scene.background.tilePositionX) + Math.floor(remaining);
    scene.scene.start('ResultScene', { result: 'CLEAR!', score });
  }
}
