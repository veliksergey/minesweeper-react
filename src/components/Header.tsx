import {DifficultyEnum, StatusEnum} from '../types.ts';
import {ChangeEvent} from 'react';

interface Props {
  difficulty: DifficultyEnum;
  size: number;
  minesLeft: number | null;
  status: StatusEnum;
  setDifficulty: (difficulty: DifficultyEnum) => void;
  setSize: (size: number) => void;
  onNewGame: () => void;
}

const difficultyList = Object.entries(DifficultyEnum)
  .filter(([, value]) => typeof value === 'number')
  .map(([key, value]) => ({value, label: key.charAt(0) + key.slice(1).toLowerCase()}));

const sizeList: number[] = [5, 10, 15];

const Header = (
  {onNewGame, minesLeft, status, difficulty, setDifficulty, size, setSize}: Props,
) => {

  const handleDifficultyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(event.target.value as unknown as DifficultyEnum);
  };

  const handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSize(parseInt(event.target.value));
  };

  return (
    <div className="header">
      <h1>Minesweeper</h1>

      {/* row */}
      <div className="row">

        {/* difficulty */}
        <div>
          <label htmlFor="difficulty">Difficulty: </label>
          <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
            {difficultyList.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        {/* size */}
        <div>
          <label htmlFor="size">Size: </label>
          <select
            id="size"
            value={size}
            onChange={handleSizeChange}
          >
            {sizeList.map((s) => (
              <option key={s} value={s}>{s}x{s}</option>
            ))}
          </select>
        </div>

        {/* new game btn */}
        <p>
          <button onClick={onNewGame}>New Game</button>
        </p>

      </div>
      {/* !row */}

      {/* row */}
      <div className="row">

        {/* mines left*/}
        <p>Mines Left: {minesLeft}</p>

        {/* status */}
        <p>
          Status: {status === StatusEnum.LOST ? (
          <span style={{color: 'red'}}>{StatusEnum.LOST}</span>
        ) : status === StatusEnum.WON ? (
          <span style={{color: 'green'}}>{StatusEnum.WON}</span>
        ) : (
          status
        )}
        </p>

      </div>
      {/* row */}

    </div>
  );
};

export default Header;