import {
  CHARACTER_SCALE,
  getEnemyY,
  getRandomizedRange,
  ENEMY_MOVE_DURATION,
  ENEMY_MOVE_DURATION_VARIANCE,
  TURN_BACK_TIME,
  TURN_BACK_TIME_VARIANCE,
  WATCH_TIME,
  WATCH_TIME_VARIANCE,
  ENEMY_SPAWN_DELAY,
  ENEMY_SPAWN_DELAY_VARIANCE
} from '../config/params.js';

export function spawnEnemy(scene, fromDirection) {
  const offset = 0;
  const startX = fromDirection === 'left' ? -50 - offset : scene.scale.width + offset;
  const returnX = fromDirection === 'left' ? scene.scale.width + offset + 50 : 0 - offset;
  const y = getEnemyY(scene);

  const moveOutTexture = fromDirection === 'left' ? 'enemy_right' : 'enemy_left';
  const returnTexture = fromDirection === 'left' ? 'enemy_right' : 'enemy_left';

  scene.enemyDirection = fromDirection;
  scene.enemy = scene.add.sprite(startX, y, moveOutTexture).setScale(CHARACTER_SCALE.enemy);

  // 🔁 画面中央まで移動
  scene.tweens.add({
    targets: scene.enemy,
    x: scene.scale.width / 2,
    duration: getRandomizedRange(ENEMY_MOVE_DURATION, ...ENEMY_MOVE_DURATION_VARIANCE),
    onStart: () => {
      scene.enemy.setTexture(moveOutTexture); // ✅ 行きの向き
    },
    onComplete: () => {
      scene.enemy.setTexture('enemy_back');

      // 🔁 しばらく背中を向ける
      scene.time.delayedCall(
        getRandomizedRange(TURN_BACK_TIME, ...TURN_BACK_TIME_VARIANCE),
        () => {
          scene.enemy.setTexture('enemy_front');
          scene.isWatching = true;

          // 🔁 監視後に帰る
          scene.time.delayedCall(
            getRandomizedRange(WATCH_TIME, ...WATCH_TIME_VARIANCE),
            () => {
              scene.isWatching = false;

              // 帰るときの向き
              scene.enemy.setTexture(returnTexture);

              scene.tweens.add({
                targets: scene.enemy,
                x: returnX,
                duration: getRandomizedRange(ENEMY_MOVE_DURATION, ...ENEMY_MOVE_DURATION_VARIANCE),
                onStart: () => {
                  scene.enemy.setTexture(returnTexture); // ✅ 帰りの向き
                },
                onUpdate: () => {
                  scene.enemy.setTexture(returnTexture);
                },
                onComplete: () => {
                  scene.enemy.destroy();

                  scene.time.delayedCall(
                    getRandomizedRange(ENEMY_SPAWN_DELAY, ...ENEMY_SPAWN_DELAY_VARIANCE),
                    () => {
                      spawnEnemy(scene, fromDirection === 'left' ? 'right' : 'left');
                    }
                  );
                }
              });
            }
          );
        }
      );
    }
  });
}
