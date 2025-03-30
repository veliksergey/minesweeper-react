import Tile from './Tile.tsx';
import {ITile} from '../types.ts';

interface Props {
  tiles: ITile[];
  boardSize: number;
  revealTile: (tile: ITile) => void;
  togglePossibleMine: (tile: ITile) => void;
}

const Board = ({tiles, boardSize, revealTile, togglePossibleMine}: Props) => {

  return (
    <div className="board-wrapper" style={{width: `${boardSize * 50 + 10}px`}}>
      <div className="board" style={{width: `${boardSize * 50 + 10}px`}}>
        {tiles.map((tile, idx) => (
          <Tile
            key={idx}
            tile={tile}
            reveal={revealTile}
            togglePossibleMine={togglePossibleMine}
          />
        ))}
      </div>
    </div>
  );

};

export default Board;