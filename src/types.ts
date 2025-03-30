export interface ITile {
  id: number;
  isMine: boolean;
  minesAround: number;
  markedAsMine: boolean;
  isRevealed: boolean;
}

export enum DifficultyEnum {
  EASY = 8,
  MEDIUM = 10,
  HARD = 14,
  IMPOSSIBLE = 18,
}

export enum StatusEnum {
  IN_PROGRESS = 'In Progress',
  WON = 'Won',
  LOST = 'Lost',
}