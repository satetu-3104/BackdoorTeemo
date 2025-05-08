import { updatePlayerAnimation, stopPlayerAnimation } from './player.js';
import { TRANSPARENT_DELAY_MS } from '../config/params.js';

export function setupPlayerInput(scene) {
  scene.input.removeAllListeners();

  scene.input.on('pointerdown', () => {
    scene.moving = true;
    updatePlayerAnimation(scene);
    if (scene.transparentTimer) scene.transparentTimer.remove();
    scene.player.setAlpha(1);
    scene.isTransparent = false;
  });

  scene.input.on('pointerup', () => {
    scene.moving = false;
    stopPlayerAnimation(scene);
    if (scene.transparentTimer) scene.transparentTimer.remove();

    scene.transparentTimer = scene.time.delayedCall(
      TRANSPARENT_DELAY_MS,
      () => {
        scene.player.setAlpha(0.4);
        scene.isTransparent = true;
      }
    );
  });
}
