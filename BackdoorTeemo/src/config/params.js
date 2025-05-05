export const SCROLL_SPEED = 5
export const WATCH_TIME = 1400; // ミリ秒
export const TURN_BACK_TIME = 1000;
export const ENEMY_MOVE_DURATION = 1500;
export const PLAYER_START_X = 400
export const PLAYER_START_Y = 500
export const ENEMY_Y = 100
export const GOAL_DISTANCE = 4000; // プレイヤーがクリアと判定されるスクロール距離
export const MAX_TIME_MS = 57000;
export const TRANSPARENT_DELAY_MS = 1000; //半透明化時間
export const MIN_VARIANCE = 0.5;    //ランダムMAX
export const MAX_VARIANCE = 2.0;    //ランダムMIN
export const SYNOPSIS_TEXT = `
相手チームがバロンバフを携えてシージしている中、
勇敢なティーモ大佐はバックドアを仕掛ける 
味方の熱いハテナピンによる応援を受けながら
突き進むティーモの行く先には敵陣を警戒している、
11/0/3のフルビルドAPマルファイトが見張っていた！

画面奥にいるマルファイトの視線をくぐり抜け、
ときには立ち止まったり、Bushを使いながら
ゴールであるネクサスに到達することが目的です。
見事勝利を収め、敵味方からのラブコールを獲得し、
アイアンへの降格戦を防衛しよう！
`;

// ✅ ランダム係数をかけて値を返すユーティリティ関数
export function getRandomized(baseValue) {
    const factor = Phaser.Math.FloatBetween(MIN_VARIANCE, MAX_VARIANCE);
    return Math.floor(baseValue * factor);
  }