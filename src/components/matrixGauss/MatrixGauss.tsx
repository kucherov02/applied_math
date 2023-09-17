import React, {useState} from 'react';
import { gauss } from '../../functions/gauss';

import style from '../../styles/matrix.module.css'
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type Props = {
  rows: number,
  cols: number,
}

const MatrixGauss = ({ rows, cols }: Props) => {
  const [solution, setSolution] = useState<number[]>([])
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: rows }, () => Array(cols).fill(''))
  );
  
  const submit = () => {
    setSolution(gauss(matrix).map(arr => arr[arr.length - 1]))
  }

  const updateMatrix = (row: number, col: number, value: number) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = value
    setMatrix(newMatrix);
  }

  const renderCell = (row: number, col: number) => {
    return (
      <input
        className={style.matrix_cell}
        type="number"
        value={matrix[row][col]}
        onChange={(e) => updateMatrix(row, col, Number.parseFloat(e.target.value))}
      />
    );
  }

  return (
    <div className='p-2 px-4'>
      <table className={style.matrix_table}>
        <tbody>
          <tr>
            <td>
              <Typography variant="h6">Matrix</Typography>
            </td>
          </tr>
          {matrix.map((row, rowIndex) => (
          <tr className={style.matrix_tr} key={rowIndex}>
            {row.map((col, colIndex) => (
              <td className={style.matrix_td} key={colIndex}>{renderCell(rowIndex, colIndex)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
      <Button variant="outlined" onClick={submit} type="button">Submit</Button>
    <p>Solution:{solution.map((number, index) => (
      <span className='mx-2' key={index}>{number}</span>
    ))}</p>
    </div>
  );
}

export default MatrixGauss;