export function createBackground(scene) {
    const { width, height } = scene.scale;
    const background = scene.add.tileSprite(width / 2, height / 2, width, height, 'background');
    const bgFrame = scene.textures.get('background').getSourceImage();
    background.setTileScale(width / bgFrame.width, height / bgFrame.height);
    background.setDepth(-1);
    return background;
  }
  