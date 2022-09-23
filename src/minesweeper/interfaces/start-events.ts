/**
 * セルをクリックするイベント
 * クリックしたセルを特定するに足る情報をもたせるべき
 */
export interface StartMinesweeperEvent {}

/**
 * セルをクリックするイベント
 * クリックしたセルを特定するに足る情報をもたせるべき
 */
export interface ClickedCellEvent {
  x: number;
  y: number;
}

/**
 * リタイアした際のイベント
 */
export interface RetirementEvent {}

export type SubmitMinesweeperEvents =
  | StartMinesweeperEvent
  | ClickedCellEvent
  | RetirementEvent;
