export const SCROLL_SPEED = 5

// 敵パラメータ
export const WATCH_TIME = 2000;
export const TURN_BACK_TIME = 1000;
export const ENEMY_MOVE_DURATION = 3000;
export const ENEMY_SPAWN_DELAY = 1000;
// それぞれに個別の倍率幅
export const WATCH_TIME_VARIANCE = [0.8, 1.5];
export const TURN_BACK_TIME_VARIANCE = [0.5, 1.0];
export const ENEMY_MOVE_DURATION_VARIANCE = [0.5, 2.0];
export const ENEMY_SPAWN_DELAY_VARIANCE = [0.5, 3.0];

// スケール定義（キャラ種別ごとに）
export const CHARACTER_SCALE = {
    player: 0.7,
    enemy: 0.6
  };


  export const getPlayerStartPosition = (scene) => {
  const { width, height } = scene.scale;
  return {
    x: width / 2,
    y: height * 0.8
  };
};

// 敵の出現位置（画面中央・上から15%）
export const getEnemyY = (scene) => {
  const { height } = scene.scale;
  return height * 0.15;
};

export const GOAL_DISTANCE = 4000; // プレイヤーがクリアと判定されるスクロール距離
export const MAX_TIME_MS = 57000;
export const TRANSPARENT_DELAY_MS = 1500; //半透明化時間
export const MIN_VARIANCE = 0.5;    //ランダムMAX
export const MAX_VARIANCE = 2.0;    //ランダムMIN
export const SYNOPSIS_TEXT = `
相手チームがバロンバフを
携えてシージしている中
勇敢なティーモ大佐は
バックドアを仕掛ける

味方のハテナピンによる
熱い応援を受けながら
突き進むティーモ大佐の
行く先には11/0/3の
フルビルドAPマルファイトが
見張っていた！

画面奥にいるマルファイトの
視線をくぐり抜けて
バックドアを成功させ、
アイアンへの降格戦を防衛しよう！
`;

// ✅ ランダム係数をかけて値を返すユーティリティ関数
export function getRandomizedRange(base, minFactor, maxFactor) {
    const factor = Phaser.Math.FloatBetween(minFactor, maxFactor);
    return Math.floor(base * factor);
}
