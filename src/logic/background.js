export function createBackground(scene) {
    const { width, height } = scene.scale;
    const texture = scene.textures.get('background').getSourceImage();
  
    const originalWidth = texture.width;
    const originalHeight = texture.height;
  
    // 高さに合わせてスケールを計算（縦フィット）
    const scaleY = height / originalHeight;
    const scaleX = scaleY; // ← 横も同じ比率で拡大（アスペクト比維持）
  
    // 拡大した後の幅・高さ
    const displayWidth = originalWidth * scaleX;
    const displayHeight = originalHeight * scaleY;
  
    const background = scene.add.tileSprite(
      width / 2,        // 中央に表示
      height / 2,
      displayWidth,
      displayHeight,
      'background'
    );
  
    background.setTileScale(scaleX, scaleY);
    background.setDepth(-1); // 背景を一番奥に
  
    return background;
  }
  