export const fixedPointIteration = (a: number[][], x0: number[], tolerance: number = 1, maxIterations: number = 1000): number[] => {
    const n = a.length;
    let x = [...x0];
    let error = Number.MAX_VALUE;
    let iterations = 0;

    while (error > tolerance && iterations < maxIterations) {
        const nextX = [];

        for (let i = 0; i < n; i++) {
            let sum = a[i][n];

            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    sum -= a[i][j] * x[j];
                }
            }

            nextX[i] = sum / a[i][i];
        }

        error = Math.max(...nextX.map((nextXi, i) => Math.abs(nextXi - x[i])));
        x = [...nextX];
        iterations++;
    }

    if (iterations === maxIterations) {
        throw new Error(`Maximum number of iterations (${maxIterations}) reached without achieving desired tolerance.`);
    }

    return x.map((num) => Math.round(num));
}

const a = [
    [5,1,-1,1,42],
    [1, -4, 1, -1, 8],
    [-1, 1, 4, 1, 1],
    [1, 2, 1, -5, 16]
]

const x0 = [21, 1,2,0,5]

const solution = fixedPointIteration(a, x0);

console.log(solution)