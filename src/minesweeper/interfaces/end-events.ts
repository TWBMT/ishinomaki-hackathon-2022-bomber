/**
 * クリアした際に発火するイベント
 */
export interface SuccessEvent {}

/**
 * 失敗した際に発火するイベント
 */
export interface FaliEvent {}

export type MinesweeperEndEvent = FaliEvent | SuccessEvent;
