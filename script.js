const grid = document.querySelector('.grid');
const newGameBtn = document.querySelector('#new-game');
const restartBtn = document.querySelector('#restart');
const hintBtn = document.querySelector('#hint');
const autoSolveBtn = document.querySelector('#auto-solve');

const acceptInput = (event) => {
    const InputBoxInCell = event.currentTarget;
    const gridCell = InputBoxInCell.parentElement;
    const cellInput = InputBoxInCell.value;

    if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(cellInput)) {
        gridCell.textContent = cellInput;
        console.log(gridCell);
        gridCell.addEventListener('click', createInputBox);
        checkIfSolved();
    } else {
        gridCell.textContent == '';
    }
}

const createInputBox = (event) => {
    // Delete any other input boxes in the grid
    const rows = grid.querySelectorAll('tr');
    // Iterate through all board rows
    for (i = 0; i < 9; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll('td');
        // Iterate through each cell in each board row
        for (j = 0; j < 9; j++) {
            const gridCell = cells[j];
            // If there's an input box in the cell, remove it
            if (gridCell.querySelector('input') != null && gridCell != event.currentTarget) {
                gridCell.removeChild(gridCell.querySelector('input'));
            }
        }
    }
    if (event.currentTarget.querySelector('input') === null) {
        console.log(event.currentTarget);
        newInputBox = document.createElement('input');
        newInputBox.addEventListener('keyup', acceptInput);
        newInputBox.value = event.currentTarget.textContent;
        event.currentTarget.textContent = "";
        event.currentTarget.appendChild(newInputBox);
    }
}

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

const resetGrid = () => {
    const grid = document.querySelector('.grid');
    grid.innerHTML = "";
    const newGrid = createNewGrid();
    // iterate through the rows of the generated grid
    for (let i = 0; i < 9; i++) {
        const gridRow = grid.insertRow();
        // iterate through the cells in each row of the generated grid
        for (let j = 0; j < 9; j++) {
            const rowCell = gridRow.insertCell();
            rowCell.setAttribute('row_index', i);
            rowCell.setAttribute('column_index', j);
            if (newGrid[i][j] === 0) {
                rowCell.setAttribute('blank', 'true');
                rowCell.addEventListener('click', createInputBox);
                // rowCell.addEventListener('arrow keys', move);
            } else {
                rowCell.setAttribute('blank', 'false');
                rowCell.textContent = newGrid[i][j];
            }
        }
    }
}

resetGrid();

const validateInput = (gridCell) => {
    console.log('VALIDATE_INPUT:');
    const input = gridCell.textContent;
    console.log('GridCell input:')
    console.log(input);
    const rowIdx = gridCell.getAttribute('row_index');
    const columnIdx = gridCell.getAttribute('column_index');

    const rows = grid.querySelectorAll('tr');
    const row = rows[rowIdx];
    const cells = row.querySelectorAll('td');

    // find all other numbers in cell row
    const cellRow = [];
    for (k = 0; k < 9; k++) {
        cellRow.push(cells[k].textContent);
    }
    cellRow.splice(columnIdx, 1);

    // find all other numbers in cell column
    const cellCol = [];
    for (l = 0; l < 9; l++) {
        tds = rows[l].querySelectorAll('td');
        cellCol.push(tds[columnIdx].textContent);
    }
    cellCol.splice(rowIdx, 1);

    // find all other numbers in cell square
    const cellSquare = [];
    const squareRowIdx = (Math.floor((parseInt(rowIdx))/3.0) * 3);
    const squareColumnIdx = (Math.floor(parseInt(columnIdx)/3.0) * 3);
    for (m = squareRowIdx; m < squareRowIdx + 3; m++) {
        const td_rows = rows[m].querySelectorAll('td');
        for (n = squareColumnIdx; n < squareColumnIdx + 3; n++) {
            cellSquare.push(td_rows[n].textContent);
            // }
        }
    }
    squareIdx = ((rowIdx % 3) * 3) + (columnIdx % 3);
    cellSquare.splice(squareIdx, 1);

    // if the cell's number isn't duplicated in its row, column or square, color it blue

    console.log(input);
    console.log(cellRow);
    console.log(cellCol);
    console.log(cellSquare);

    if (cellRow.includes(`${input}`) === false && cellCol.includes(`${input}`) === false && cellSquare.includes(`${input}`) === false) {
        console.log('Returning true...');
        return true;
    } else {
        console.log('Returning false...');
        return false;
    }
}

const checkIfSolved = () => {
    // iterate through every cell in the grid and check whether input value is valid
    grid.setAttribute('solved', 'true');
    // validate cell input by colour
    const rows = grid.querySelectorAll('tr');
    // iterate through all board rows
    for (i = 0; i < 9; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll('td');
        // iterate through each cell in each board row
        for (j = 0; j < 9; j++) {
            const gridCell = cells[j];
            if (gridCell.getAttribute('blank') === 'true') {
                if (validateInput(gridCell)) {
                  gridCell.style.color = "#00FFFF";
                } else {
                  gridCell.style.color = "#ff0100";
                    grid.setAttribute('solved', 'false');
                }
            }
        }
    }
    if (grid.getAttribute('solved') === 'true') {
        alert('You won!');
        resetGrid();
    }
}

const restart = () => {
    // Delete the contents of all the input boxes
    const rows = grid.querySelectorAll('tr');
    // iterate through all board rows
    for (i = 0; i < 9; i++) {
        const row = rows[i];
        const cells = row.querySelectorAll('td');
        // iterate through each cell in each board row
        for (j = 0; j < 9; j++) {
            const gridCell = cells[j];
            if (gridCell.getAttribute('blank') === 'true') {
                gridCell.textContent = "";
            }
        }
    }
}

// function giveHint()

// const sleepSync = (ms) => {
//     const end = new Date().getTime() + ms;
//     while (new Date().getTime() < end) { /* do nothing */ }
// }

// backtracking algorithm:

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

newGameBtn.addEventListener('click', resetGrid);
restartBtn.addEventListener('click', restart);
// hintBtn.addEventListener('click', hint);
autoSolveBtn.addEventListener('click', autoSolve);
