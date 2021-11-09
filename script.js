const grid = document.querySelector('.grid');
const newGameBtn = document.querySelector('#new-game');
const restartBtn = document.querySelector('#restart');
const hintBtn = document.querySelector('#hint');
const autoSolveBtn = document.querySelector('#auto-solve');
// const selectedCell = undefined

// const boardState = [];

// function isNumberKey(evt){
//     var charCode = (evt.which) ? evt.which : evt.keyCode
//     if (charCode > 31 && (charCode < 48 || charCode > 57))
//         return false;
//     return true;
// }

// const selectCell = (event) => {
//     const cells = grid.querySelectorAll('.cell');
//     cells.forEach((cell) => {
//         cell.classList.remove('selected');
//     });
//     const selectedCell = event.currentTarget;
//     selectedCell.classList.add('selected');
// }

const acceptInput = (event) => {
    gridCell = event.currentTarget.parentElement;
    cellInput = event.currentTarget.value;
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(cellInput)) {
        gridCell.textContent = cellInput;
        gridCell.insertAdjacentHTML('beforeend', '<input>'); // ADDED FOR TESTING
        gridCell.querySelector('input').addEventListener('keyup', acceptInput); // ADDED FOR TESTING
        // gridCell.querySelector('input').style.display = 'none';
        checkIfSolved();
    } else {
        gridCell.textContent == '';
    }
}

const createInputBox = (event) => {
    if (event.currentTarget.querySelector('input') === null) {

        console.log(event.currentTarget);

        // FIX THIS ------
        newInputBox = document.createElement('input');
        newInputBox.addEventListener('keyup', acceptInput);
        newInputBox.textContent = event.currentTarget.textContent;

        console.log(newInputBox);
        
        event.currentTarget.appendChild(newInputBox);
        // event.currentTarget.insertAdjacentHTML('beforeend', '<input>');
        // event.currentTarget.innerHTML = '<input>';

        console.log(event.currentTarget);

        // FIX THIS ------
        // event.currentTarget.querySelector('input')

        event.currentTarget.textContent = '';
        
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
                // rowCell.addEventListener('click', selectCell);
                // rowCell.addEventListener('click', createInputBox);
                rowCell.insertAdjacentHTML('beforeend', '<input>'); // ADDED FOR TESTING
                rowCell.querySelector('input').addEventListener('keyup', acceptInput);
                rowCell.addEventListener('click', (event) => {
                    console.log('clicked');
                    rowCell.querySelector('input').style.display = 'initial';
                })
                // rowCell.addEventListener('arrow keys', move);
            } else {
                rowCell.setAttribute('blank', 'false');
                rowCell.textContent = newGrid[i][j];
            }
        }
    }
}

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
    // const gridCell = cells[j];

    // find all other numbers in cell row
    const cellRow = [];
    for (k = 0; k < 9; k++) {
        cellRow.push(cells[k].textContent);
    }
    cellRow.splice(columnIdx, 1);
    // console.log('cellRow:');
    // console.log(cellRow);

    // find all other numbers in cell column
    const cellCol = [];
    for (l = 0; l < 9; l++) {
        tds = rows[l].querySelectorAll('td');
        cellCol.push(tds[columnIdx].textContent);
    }
    cellCol.splice(rowIdx, 1);
    // console.log('cellCol:');
    // console.log(cellCol);

    // find all other numbers in cell square
    // FIX THIS -------- THINK IT'S FIXED
    const cellSquare = [];
    const squareRowIdx = (Math.floor((parseInt(rowIdx))/3.0) * 3);
    // console.log('square row idx');
    // console.log(squareRowIdx);
    // console.log('column idx');
    // console.log(columnIdx);
    const squareColumnIdx = (Math.floor(parseInt(columnIdx)/3.0) * 3);
    // console.log('square column idx');
    // console.log(squareColumnIdx);
    for (m = squareRowIdx; m < squareRowIdx + 3; m++) {
        // console.log('m');
        // console.log(m);
        const td_rows = rows[m].querySelectorAll('td');
        for (n = squareColumnIdx; n < squareColumnIdx + 3; n++) {
            // console.log('n');
            // console.log(n);
            // if (rowIdx != m && columnIdx != n) {
            // console.log(td_rows[n].textContent);
            cellSquare.push(td_rows[n].textContent);
            // }
        }
    }
    squareIdx = ((rowIdx % 3) * 3) + (columnIdx % 3);
    // console.log(squareIdx);
    cellSquare.splice(squareIdx, 1);
    // console.log('cellSquare:');
    // console.log(cellSquare);


    // if the cell's number isn't duplicated in its row, column or square, color it blue
    // console.log('input:');
    console.log(input);
    console.log(cellRow);
    console.log(cellCol);
    console.log(cellSquare);
    // if (cellRow.includes(`${input}`) === false && cellCol.includes(`${input}`) === false) {
    if (cellRow.includes(`${input}`) === false && cellCol.includes(`${input}`) === false && cellSquare.includes(`${input}`) === false) {
        console.log('Returning true...');
        return true;
    } else {
        console.log('Returning false...');
        return false;
    }
}

const checkIfSolved = () => {
    // let boardSolved = true;
    grid.setAttribute('solved', 'true');

    // iterate through every cell in the grid and check whether input value is valid
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
                    gridCell.style.color = "blue";
                } else {
                    gridCell.style.color = "red";
                    grid.setAttribute('solved', 'false');
                    // let boardSolved = false;
                    // console.log(boardSolved);
                }
            }
        }
    }
    // console.log(boardSolved);
    // if (boardSolved === true) {
    if (grid.getAttribute('solved') === 'true') {
        alert('You won!');
        // resetGrid();
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
                gridCell.insertAdjacentHTML('beforeend', '<input>');
                gridCell.querySelector('input').addEventListener('keyup', acceptInput);
            }
        }
    }
}

// function giveHint()

// const sleepSync = (ms) => {
//     const end = new Date().getTime() + ms;
//     while (new Date().getTime() < end) { /* do nothing */ }
// }

const autoSolve = () => {
    console.log('RUNNING AUTO_SOLVE...');
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

                    // gridCell.textContent = `${attempt}`;
                    gridCell.textContent = 'wys';

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
                        if (autoSolve()) {
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


resetGrid();
checkIfSolved();

newGameBtn.addEventListener('click', resetGrid);
restartBtn.addEventListener('click', restart);
// hintBtn.addEventListener('click', hint);
autoSolveBtn.addEventListener('click', autoSolve);

