import { SCROLL_SPEED, MAX_TIME_MS, GOAL_DISTANCE } from '../config/params.js';
import { stopPlayerAnimation } from './player.js';
import { calculateFinalScore } from './score.js';

const isClear = false; // 👈 CLEAR のときだけ true を渡す

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
  
    // GAME OVER
    if (!scene.gameOver && scene.isWatching && !scene.isTransparent) {
        scene.gameOver = true;
        stopPlayerAnimation(scene);
        scene.bgm?.stop(); scene.bgm?.destroy();

        const score = calculateFinalScore(
        scene.background.tilePositionX,
        scene.startTimestamp,
        scene.time.now,
        false // ← ゲームオーバーなので false
        );

        scene.scene.start('ResultScene', { result: 'GAME OVER', score });
    }

    // CLEAR
    if (!scene.gameOver && scene.background.tilePositionX >= GOAL_DISTANCE) {
        scene.gameOver = true;
        stopPlayerAnimation(scene);
        scene.bgm?.stop(); scene.bgm?.destroy();

        const score = calculateFinalScore(
        scene.background.tilePositionX,
        scene.startTimestamp,
        scene.time.now,
        true // ← クリアなので true
        );

        scene.scene.start('ResultScene', { result: 'CLEAR!', score });
    }
  }
