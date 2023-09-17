export function lagrangeInterpolation(arr: number[]): [Function, Function] {
    const n = arr.length;
    const x = arr.map((_, i) => i + 1);
    const y = arr;

    // calculate the Lagrange basis polynomials
    const basisPolys = x.map((xi, i) => {
        const numerators = x.filter((xj, j) => j !== i).map((xj) => `((x-${xj})/${xi}-${xj})`);
        const numeratorStr = numerators.join("*");
        const denominator = y.filter((_, j) => j !== i).map((yj) => `${xi}-${yj}`).join("*");
        return `((${numeratorStr})/${denominator})`;
    });

    // create the interpolation function using the Lagrange basis polynomials
    const interpolationPoly = basisPolys.map((basisPoly, i) => `${basisPoly}*${y[i]}`).join("+");
    const interpolationFunc = new Function("x", `return ${interpolationPoly}`);

    // create the approximation function using the first-order approximation
    const firstOrderApprox = (y[n-1] - y[0]) / (n - 1);
    const approximationFunc = (x: number) => y[0] + (x - 1) * firstOrderApprox;

    return [interpolationFunc, approximationFunc];
}

export function polynomialAproximation(arr: number[]): [Function, Function] {
    const n = arr.length;
    const x = arr.map((_, i) => i + 1);
    const y = arr;

    // calculate the Lagrange basis polynomials
    const basisPolys = x.map((xi, i) => {
        const numerators = x.filter((xj, j) => j !== i).map((xj) => `((x-${xj})/${xi}-${xj})`);
        const numeratorStr = numerators.join("*");
        const denominator = y.filter((_, j) => j !== i).map((yj) => `${xi}-${yj}`).join("*");
        return `((${numeratorStr})/${denominator})`;
    });

    // create the interpolation function using the Lagrange basis polynomials
    const interpolationPoly = basisPolys.map((basisPoly, i) => `${basisPoly}*${y[i]}`).join("+");
    const interpolationFunc = new Function("x", `return ${interpolationPoly}`);

    // calculate the least-squares approximation using polynomials of the first and second degree
    const A = [];
    const B = [];

    // first-degree polynomial
    for (let i = 0; i < n; i++) {
        A.push([1, x[i]]);
        B.push(y[i]);
    }

    const [a1, b1] = solveLeastSquares(A, B);

    // second-degree polynomial
    for (let i = 0; i < n; i++) {
        A[i].push(x[i] ** 2);
    }

    const [a2, b2, c2] = solveLeastSquares(A, B);

    // choose the best polynomial using the method of least squares
    const errors1 = y.map((yi, i) => (yi - (a1 + b1 * x[i])) ** 2);
    const errors2 = y.map((yi, i) => (yi - (a2 + b2 * x[i] + c2 * x[i] ** 2)) ** 2);
    const ssq1 = errors1.reduce((acc, error) => acc + error, 0);
    const ssq2 = errors2.reduce((acc, error) => acc + error, 0);

    let approximationFunc: Function;
    if (ssq1 < ssq2) {
        approximationFunc = (x: number) => a1 + b1 * x;
    } else {
        approximationFunc = (x: number) => a2 + b2 * x + c2 * x ** 2;
    }

    return [interpolationFunc, approximationFunc];
}

function solveLeastSquares(A: number[][], B: number[][]): number[] {
    const At = transpose(A);
    const AtA = multiplyMatrices(At, A);
    const Atb = multiplyMatrices(At, B);

    return solveLinearSystem(AtA, Atb);
}

function transpose(A: number[][]): number[][] {
    return A[0].map((_, colIndex) => A.map((row) => row[colIndex]));
}

function multiplyMatrices(A: number[][], B: number[][]): number[][] {
    const n = A.length;
    const m = B[0].length;
    const result = [];

    for (let i = 0; i < n; i++) {
        const row = [];

        for (let j =0; j < m; j++) {
            let sum = 0;
            for (let k = 0; k < B.length; k++) {
                sum += A[i][k] * B[k][j];
            }

            row.push(sum);
        }

        result.push(row);
    }

    return result;
}

function solveLinearSystem(A: number[][], b: number[][]): number[] {
    const n = A.length;
    const x = new Array(n);

    for (let i = 0; i < n; i++) {
// find the row with the largest coefficient in column i
        let maxRowIndex = i;
        let maxRowValue = Math.abs(A[i][i]);
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(A[j][i]) > maxRowValue) {
                maxRowIndex = j;
                maxRowValue = Math.abs(A[j][i]);
            }
        }

// swap rows i and maxRowIndex
        if (maxRowIndex !== i) {
            [A[i], A[maxRowIndex]] = [A[maxRowIndex], A[i]];
            [b[i], b[maxRowIndex]] = [b[maxRowIndex], b[i]];
        }

// perform Gaussian elimination on column i
        for (let j = i + 1; j < n; j++) {
            const factor = A[j][i] / A[i][i];

            for (let k = i + 1; k < n; k++) {
                A[j][k] -= factor * A[i][k];
            }

            b[j] -= factor * b[i];
            A[j][i] = 0;
        }

    }

// perform back substitution to solve for x
    for (let i = n - 1; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < n; j++) {
            sum += A[i][j] * x[j];
        }

        x[i] = (b[i] - sum) / A[i][i];
    }

    return x;
}