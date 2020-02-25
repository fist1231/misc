class Isla {
    main() {
        console.log(`Isla main`);

        // const grid = [
        //     ["1", "1", "1", "1", "0"],
        //     ["1", "1", "0", "1", "0"],
        //     ["1", "1", "0", "0", "0"],
        //     ["0", "0", "0", "0", "0"]
        // ];
        const grid = [
            ["1", "1", "0", "0", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "1", "0", "0"],
            ["0", "0", "0", "1", "1"]
        ];

        console.log(`grid length: ${grid.length}`);
        const res = this.numIslands(grid);
        console.log(`result: ${res}`);
    }

    numIslands(grid) {
        let count = 0;
        for (let i = 0; i < grid.length; i++) {
            console.log(`grid[${i}] length: ${grid[i].length}`);
            for (let j = 0; j < grid[i].length; j++) {
                console.log(`processing grid[${i}][${j}] = ${grid[i][j]}; grid: ${JSON.stringify(grid)}`);
                if (grid[i][j] === "1" && this.isIsla(i, j, grid)) {
                    count++;
                    console.log(`conut: ${count}`);
                }
            }
        }
        return count;
    }

    isIsla(x, y, grid) {
        grid[x][y] = "0";
        if (x > 0) {
            if (grid[x - 1][y] === "1" && this.isIsla(x - 1, y, grid)) {

            }
        }
        if (x < grid.length - 1) {
            if (grid[x + 1][y] === "1" && this.isIsla(x + 1, y, grid)) {

            }
        }
        if (y > 0) {
            if (grid[x][y - 1] === "1" && this.isIsla(x, y - 1, grid)) {

            }
        }
        if (y < grid[x].length - 1) {
            if (grid[x][y + 1] === "1" && this.isIsla(x, y + 1, grid)) {

            }
        }
        return true;
    }

}

const run = () => {
    console.log(`run`);
    new Isla().main();
}

run();

export default Isla;