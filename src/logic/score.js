import { MAX_TIME_MS } from '../config/params.js';

/**
 * ゲーム開始時の現在時刻を返す（Date.now()）
 */
export function getStartTimestamp() {
  return Date.now();
}

/**
 * スコアを計算する
 * @param {number} distance - 背景のスクロール距離
 * @param {number} startTimestamp - ゲーム開始時のタイムスタンプ（Date.now()）
 */
export function calculateScore(distance, startTimestamp) {
  const elapsed = Date.now() - startTimestamp;
  const remaining = Math.max(0, MAX_TIME_MS - elapsed);
  const distanceScore = Math.floor(distance);
  const timeBonus = Math.floor(remaining);
  return distanceScore + timeBonus;
}

export function calculateFinalScore(distance, timeLeft) {
    const distanceScore = Math.floor(distance);
    const timeBonus = Math.floor(timeLeft);
    return distanceScore + timeBonus;
  }
  