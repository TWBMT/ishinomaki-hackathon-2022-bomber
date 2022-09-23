import { MinesweeperEndEvent } from "./end-events";
import { SubmitMinesweeperEvents } from "./start-events";

export interface MinesweeperInterface {
  addEndingEventListner(event: MinesweeperEndEvent): void;
  submitUiEvent(event: SubmitMinesweeperEvents): void;
}
