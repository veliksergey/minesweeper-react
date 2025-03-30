import {DifficultyEnum, ITile} from './types.ts';


const getIndexesOfSurroundingTiles = (idx: number, boardSize: number): number[] => {
  const arr = [];

  // if top tile exists
  if (idx >= boardSize) {
    arr.push(
      idx - boardSize, // top
    );
  }

  // if bottom tile exists
  if (idx < ((boardSize * boardSize) - boardSize)) {
    arr.push(
      idx + boardSize, // bottom
    );
  }

  if (idx % boardSize > 0) { // if there is tile on the left
    arr.push(
      idx - 1, // left
      idx - boardSize - 1, // top left
      idx + boardSize - 1, // bottom left
    );
  }

  if (idx % boardSize < (boardSize - 1)) { // if tile on the right exists
    arr.push(
      idx + 1, // right
      idx - boardSize + 1, // top right
      idx + boardSize + 1, // bottom right
    );
  }

  return arr;
};

export const generateBoard = (difficulty: DifficultyEnum, boardSize: number): ITile[] => {
  const tilesQty: number = boardSize * boardSize;

  // create array of 100 tiles
  const tiles: ITile[] = Array.from({length: tilesQty}, (_, idx): ITile => ({
    id: idx,
    isMine: false,
    minesAround: 0,
    markedAsMine: false,
    isRevealed: false,
  }));

  // place random mines on the board
  const qtyOfMines = Math.floor((difficulty * tilesQty) / 100);
  const randomMinesIndexes = new Set<number>();
  while (randomMinesIndexes.size < qtyOfMines) {
    randomMinesIndexes.add(Math.floor(Math.random() * tilesQty));
  }
  randomMinesIndexes.forEach((idx) => {
    tiles[idx].isMine = true;

    // modify "minesAround" in nearby tiles
    const addToIdxArr = getIndexesOfSurroundingTiles(idx, boardSize);
    addToIdxArr.forEach((addToIdx) => {
      if (tiles[addToIdx]) tiles[addToIdx].minesAround++;
    });
  });

  return tiles;
};

export const revealTiles = (tiles: ITile[], idIdx: number, boardSize: number): ITile[] => {
  tiles[idIdx].isRevealed = true;

  if (tiles[idIdx].minesAround > 0) return tiles; //  || areAllNearbyTilesRevealed(tiles, id)

  const nearbyIndexes = getIndexesOfSurroundingTiles(idIdx, boardSize);
  nearbyIndexes.forEach((nearbyIdx) => {
    if (tiles[nearbyIdx] && !tiles[nearbyIdx].isRevealed) {
      revealTiles(tiles, nearbyIdx, boardSize);
    }
  });

  return tiles;
};