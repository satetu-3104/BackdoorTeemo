export function preloadGameAssets(scene) {
    const base = import.meta.env.BASE_URL;
    scene.load.image('background', base + 'images/background.jpg');
    scene.load.image('player1', base + 'images/player1.png');
    scene.load.image('player2', base + 'images/player2.png');
    scene.load.image('player3', base + 'images/player3.png');
    scene.load.image('enemy_back', base + 'images/enemy_back.png');
    scene.load.image('enemy_front', base + 'images/enemy_front.png');
    scene.load.image('enemy_left', base + 'images/enemy_left.png');
    scene.load.image('enemy_right', base + 'images/enemy_right.png');
    scene.load.audio('bgm', base + 'sounds/TEEMIX.mp3');
  }
  