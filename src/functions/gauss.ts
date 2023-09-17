// деление всех элементов строки (ось Х) матрицы на определенный делитель
const divide = (matrix:number[][], y:number) => {
    // элемент с горизонтали матрицы на который будет делится вся принадлежащяя ему строка
    let divide_by = matrix[y][y];
    for (let x = 0; x < 4; x++) {
        // matrixGauss[y][y] элемент с горизонтали матрицы на который делится весь ряд
        matrix[y][x] = matrix[y][x] / divide_by;
        matrix[y][x] = Math.round(matrix[y][x] * 100) / 100;
    }
}

const minus = (matrix:number[][], x:number) => {
    for (let y = 0; y < 3; y++) {
        // значение горизонтали матрицы приравнивать к 0 не надо! оно и так 1 все норм
        if (y == x) {
            continue;
        }
        let multiplier = matrix[y][x];
        for (let local_x = 0; local_x < 4; local_x++) {
            matrix[y][local_x] = matrix[y][local_x] - (matrix[x][local_x] * multiplier);
            matrix[y][local_x] = Math.round(matrix[y][local_x] * 100) / 100;
        }
    }
}

const round_to_int = (matrix:number[][]) => {
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 3; y++) {
            matrix[y][x] = Number((matrix[y][x]).toFixed(0));
        }
    }
}

export const gauss = (matrix: number[][]):number[][] =>{

    // цикл для прохождения по оси X (строка)
    for (let x = 0; x < 4; x++) {
        // цикл для прохождения по оси Y (столбец)
        for (let y = 0; y < 3; y++) {
            // print(x, y);
            // если ключи Х и У указывают на значение матрицы в горизонтали - используется метод деления divide
            // пример значений которые пренодлежат горизонтали: matrixGauss[0][0]; matrixGauss[1][1]; matrixGauss[2[2];
            if (x == y) {
                // в метод передается не просто значение матрицы (ее копия) но непосредственно ее ссылка,
                // СООТВЕТСТВЕННО возвращать функция ничего не должна тк в ее теле идет манипуляция над оригинальной матрицей
                divide(matrix, y);
            }
            // если элемент матрицы в ее горизонтали уже прировняли к единице (1) и указатель программы
            // стоит на элементе который идет в столбце ниже - значит можно все остальные столбцы приравнивать к нулю
            if (x == y - 1 || (y == 2 && x == 2)) {
                minus(matrix, x);
            }
        }
    }

    round_to_int(matrix)

    return matrix;
}

