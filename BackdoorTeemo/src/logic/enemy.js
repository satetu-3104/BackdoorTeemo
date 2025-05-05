import { ENEMY_Y, WATCH_TIME, TURN_BACK_TIME, ENEMY_MOVE_DURATION, getRandomized } from '../config/params.js';

export function spawnEnemy(scene, fromDirection) {
  const startX = fromDirection === 'left' ? 0 : 800;
  const moveTexture = fromDirection === 'left' ? 'enemy_right' : 'enemy_left';
  const returnX = fromDirection === 'left' ? 800 : 0;
  const returnDirection = returnX > 400 ? 'right' : 'left';
  const returnTexture = returnDirection === 'left' ? 'enemy_left' : 'enemy_right';

  scene.enemyDirection = fromDirection;
  scene.enemy = scene.add.sprite(startX, ENEMY_Y, moveTexture);

  scene.tweens.add({
    targets: scene.enemy,
    x: 400,
    duration: getRandomized(ENEMY_MOVE_DURATION),
    onUpdate: () => {
      scene.enemy.setTexture(moveTexture);
    },
    onComplete: () => {
      scene.enemy.setTexture('enemy_back');

      scene.time.delayedCall(getRandomized(TURN_BACK_TIME), () => {
        scene.enemy.setTexture('enemy_front');
        scene.isWatching = true;

        scene.time.delayedCall(getRandomized(WATCH_TIME), () => {
          scene.isWatching = false;
          scene.enemy.setTexture(returnTexture);

          scene.tweens.add({
            targets: scene.enemy,
            x: returnX,
            duration: getRandomized(ENEMY_MOVE_DURATION),
            onUpdate: () => {
              scene.enemy.setTexture(returnTexture);
            },
            onComplete: () => {
              scene.enemy.destroy();
              spawnEnemy(scene, fromDirection === 'left' ? 'right' : 'left');
            }
          });
        });
      });
    }
  });
}
