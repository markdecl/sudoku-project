const createNewGrid = () => {
    return [
        [0, 0, 0, 8, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 4, 3, 0],
        [5, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 7, 0, 8, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 2, 0, 0, 3, 0, 0, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 7, 5],
        [0, 0, 3, 4, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 6, 0, 0]
    ];

    // const solution = [

    // ];
}

const solve = (grid) => {
    console.log('RUNNING AUTO_SOLVE...');
    console.log(grid);
    const rows = grid.querySelectorAll('tr');
    // iterate through all board rows
    for (i = 0; i < 9; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll('td');
        // iterate through each cell in each board row
        for (j = 0; j < 9; j++) {
            const gridCell = cells[j];
            if (gridCell.textContent === "") {
                for (attempt = 1; attempt <= 9; attempt++) {
                    // sleepSync(1000);
                    console.log('Row: ' + (i + 1));
                    console.log('Column: ' + (j + 1));
                    console.log('Attempt: ' + attempt);
                    
                    // gridCell.style.boxShadow = "0 0 10px 10px rgba(0, 0, 0, 0.2)";

                    const rows = grid.querySelectorAll('tr');
                    const row = rows[i];
                    const cells = row.querySelectorAll('td');
                    const gridCell = cells[j];
                    gridCell.style.background = 'yellow';

                    console.log(gridCell);

                    gridCell.textContent = `${attempt}`;
                    // gridCell.textContent = 'wys';

                    console.log(gridCell);
                    // console.log(validateInput(gridCell));

                    if (validateInput(gridCell) == true) {
                        console.log('NEXT RECURSION LEVEL:');

                        const rows = grid.querySelectorAll('tr');
                        const row = rows[i];
                        const cells = row.querySelectorAll('td');
                        const gridCell = cells[j];

                        gridCell.textContent = `${attempt}`;
                        console.log(gridCell);
                        // console.log(gridCell)
                        // checkIfSolved();
                        console.log(grid);
                        if (solve(grid)) {
                            return true;
                        } else {
                            // if this solution is invalid, backtrack
                            gridCell.textContent = "";
                        }
                    }
                }
                return false;
            }
        }
    }
    checkIfSolved();
    return true;
}

const autoSolve = () => {
    solve(grid);
}