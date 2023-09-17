import {useState} from 'react';
import style from "../../styles/matrix.module.css";
import React from "react";
import Typography from "@mui/material/Typography";

type Props = {
    size: number,
    setX0: Function
}

const X0_input = ({size, setX0}:Props) => {
    const [array, setArray] = useState<number[]>(
        Array(size).fill('')
    )

    const updateArray = (pos: number, value: number) => {
        const newArray = [...array];
        newArray[pos] = value
        setArray(newArray);
        setX0(newArray);
    }

    const renderInputCell = (pos: number, value: number) => {
        return (
            <input
                className={style.matrix_cell}
                type="number"
                value={value}
                onChange={(e) => updateArray(pos, Number.parseFloat(e.target.value))}
            />
        )
    }

    return (
        <div className='p-2 px-4'>
            <table className={style.matrix_table}>
                <tbody>
                    <tr>
                        <td>
                            <Typography variant="h6">X0 array</Typography>
                        </td>
                    </tr>
                    <tr>
                        {array.map((item, index) => (
                            <td className={style.matrix_td} key={index}>
                                {renderInputCell(index, item)}
                            </td>
                        ))}
                    </tr>
               </tbody>
            </table>
        </div>
    );
};

export default X0_input;
