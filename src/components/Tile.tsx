import {ITile} from '../types.ts';
import {MouseEvent} from 'react';

interface Props {
  tile: ITile;
  togglePossibleMine: (tile: ITile) => void;
  reveal: (tile: ITile) => void;
}

const Tile = ({tile, togglePossibleMine, reveal}: Props) => {

  const handleRightClick = (event: MouseEvent) => {
    event.preventDefault();

    if (tile.isRevealed) return; // do nothing if tile is revealed

    togglePossibleMine(tile);
  };

  const handleLeftClick = () => {
    if (tile.isRevealed) return true; // do nothing if revealed
    reveal(tile);
  }

  return (
    <span
      className={`
      tile 
      ${tile.isRevealed ? 'revealed' : ''}
      ${tile.markedAsMine ? 'possible-mine' : ''}
      ${tile.isRevealed && tile.isMine ? 'mine' : ''}
      `}
      onContextMenu={handleRightClick}
      onClick={handleLeftClick}
    >
      {(tile.isRevealed && tile.minesAround > 0 && !tile.isMine) && tile.minesAround}
    </span>
  );
};

export default Tile;