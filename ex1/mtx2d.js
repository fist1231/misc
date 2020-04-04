class Mtx2d {
    main() {
        const mtx = [
            [1, 2, 3, 4, 8, 9],
            [11, 12, 13, 14, 18, 19],
            [21, 22, 23, 24, 28, 29],
            [31, 32, 33, 34, 38, 39],
            [41, 42, 43, 44, 48, 49]
        ];
        const target = -23;
        console.log(`Mtx2d`);
        const res = this.find(mtx, target);
        console.log(`result: ${res}`);
    }

    find(mtx, target) {
        let result = false;
        const xlen = mtx.length;
        const ylen = mtx[0].length;

        if (mtx.length === 0 || target < mtx[0][0] || target > mtx[xlen - 1][ylen - 1]) {
            return false;
        }

        const idxRow = this.findRow(mtx, target, 0, xlen - 1);
        const idxColumn = this.findColumn(mtx[idxRow], target, 0, ylen - 1);

        if (idxColumn === -1) {
            return result;
        }
        return `mtx[${idxRow}][${idxColumn}]`;

    }

    findColumn(arr, target, start, end) {
        // console.log(`arr: ${JSON.stringify(arr)}`);
        if (start === end) {
            if (arr[start] === target) {
                return start;
            } else {
                return -1;
            }
        }
        const mid = Math.floor((end - start) / 2) + start;
        if (target >= arr[0] && target <= arr[mid]) {
            return this.findColumn(arr, target, 0, mid);
        } else {
            return this.findColumn(arr, target, mid + 1, end);
        }

    }

    findRow(mtx, target, start, end) {
        const ylen = mtx[0].length;
        // console.log(`start: ${start}; end: ${end}; target: ${target}`);
        if (start === end) {
            return start;
        }
        // if(target >= mtx[start] && target <= mtx[end]) {
        //     return true;
        // }

        const mid = Math.floor((end - start) / 2) + start;
        // console.log(`mid: ${mid}`);
        // console.log(`mtx[start, 0]: ${mtx[start][0]}; mtx[mid, ylen - 1]: ${mtx[mid][ylen - 1]}; target: ${target}`);
        if (target >= mtx[start][0] && target <= mtx[mid][ylen - 1]) {
            return this.findRow(mtx, target, 0, mid);
        } else {
            return this.findRow(mtx, target, mid + 1, end);
        }
    }

}

const run = () => {
    new Mtx2d().main();
}

run();

export default Mtx2d;