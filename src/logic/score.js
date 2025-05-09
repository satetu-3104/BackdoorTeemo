// src/logic/score.js

import { MAX_TIME_MS } from '../config/params.js';

/**
 * Phaserの内部時間を使ったタイムスタンプ取得
 */
export function getStartTimestamp(scene) {
  return scene.time.now;
}

/**
 * 終了時スコア計算（背景スクロール距離と残り時間で決定）
 */
export function calculateFinalScore(distance, startTime, endTime, isClear = false) {
    const distanceScore = Math.floor(distance);
    if (!isClear) {
      return distanceScore; // 🔥 ゲームオーバーは移動距離のみ
    }
  
    const elapsed = endTime - startTime;
    const remaining = Math.max(0, MAX_TIME_MS - elapsed);
    const timeBonus = Math.floor(remaining);
    return distanceScore + timeBonus;
}
  