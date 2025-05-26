import './App.css';
import Board from './components/Board.tsx';
import {useEffect, useState} from 'react';
import {DifficultyEnum, ITile, StatusEnum} from './types.ts';
import {generateBoard, revealTiles} from './helper.ts';
import Header from './components/Header.tsx';

const App = () => {
  const [tiles, setTiles] = useState<ITile[]>([]);
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.IN_PROGRESS);
  const [difficulty, setDifficulty] = useState<DifficultyEnum>(DifficultyEnum.MEDIUM);
  const [boardSize, setBoardSize] = useState<number>(10);
  const [minesLeft, setMinesLeft] = useState<number | null>(null);

  useEffect(() => {
    const newTiles: ITile[] = generateBoard(difficulty, boardSize);
    setTiles(newTiles);
    setStatus(StatusEnum.IN_PROGRESS);
    calculateLeftovers(newTiles);
  }, [difficulty, boardSize]);

  const calculateLeftovers = (changedTiles: ITile[]) => {
    // how many mines left
    const totalMines = changedTiles.filter((t) => t.isMine).length;
    const markedMines: number = changedTiles.filter((t) => t.markedAsMine).length;
    const left = totalMines - markedMines;
    setMinesLeft(left);

    // if won
    const totalTiles = changedTiles.length;
    const markedAndRevealed = changedTiles.filter((t) => t.isRevealed || t.markedAsMine).length;
    const won = (markedAndRevealed === totalTiles) && left >= 0;
    if (won) {
      setStatus(StatusEnum.WON);
      setTimeout(() => {
        alert("Congratulations, you’ve won! Now try a harder difficulty.");
      }, 1);
    }
  };

  const togglePossibleMine = (tile: ITile) => {
    // if game is over
    if (status !== StatusEnum.IN_PROGRESS) {
      alert('Game is over! Click "New Game" to play again.');
      return;
    }

    const changedTiles = tiles.map((t): ITile => {
      if (t.id === tile.id) return {
        ...t,
        markedAsMine: !t.markedAsMine,
      };
      return t;
    });
    setTiles(changedTiles);
    calculateLeftovers(changedTiles);
  };

  const revealTile = (tile: ITile) => {
    // if game is over
    if (status !== StatusEnum.IN_PROGRESS) {
      alert('Game is over! Click "New Game" to play again.');
      return;
    }

    // if tile was marked as mine
    if (tile.markedAsMine) return;

    // update tiles
    const changedTiles = revealTiles([...tiles], tile.id, boardSize);
    setTiles(changedTiles);

    // if selected tile is a mine
    const found = tiles.find((t) => t.id === tile.id);
    if (found && found.isMine) {
      setStatus(StatusEnum.LOST);
      setTimeout(() => {
        alert('Sorry, you lost! Want to try again? Click "New Game" button.');
      }, 1);
    }

    calculateLeftovers(changedTiles);
  };

  const handleRestartGame = () => {
    setTiles(generateBoard(difficulty, boardSize));
    setStatus(StatusEnum.IN_PROGRESS);
  };

  return (
    <div className="container">
      <Header
        onNewGame={handleRestartGame}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        size={boardSize}
        setSize={setBoardSize}
        minesLeft={minesLeft}
        status={status}
      />

      <Board
        tiles={tiles}
        boardSize={boardSize}
        revealTile={revealTile}
        togglePossibleMine={togglePossibleMine}
      />
    </div>
  );
};

export default App;
