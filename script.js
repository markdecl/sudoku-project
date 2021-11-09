const grid = document.querySelector('.grid');
const newGame = document.querySelector('#new-game');
const restart = document.querySelector('#restart');
const hint = document.querySelector('#hint');
const autoSolve = document.querySelector('#auto-solve');
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

// const validateInput = (gridCell) => {
//     const boardState = [];
//     const rows = grid.querySelectorAll('tr');
//     for (i = 0; i < 9; i++) {
//         const row = rows[i];
//         const cells = row.querySelectorAll('td');
//         boardStateRow = [];
//         for (j = 0; j < 9; j++) {
//             const cell = cells[j]
//             boardStateRow.push(cell.textContent);
//         }
//         boardState.push(boardStateRow);
//     }
//     console.log(gridCell)
// }

const acceptInput = (event) => {
    gridCell = event.currentTarget.parentElement;
    cellInput = event.currentTarget.value;
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(cellInput)) {
        gridCell.textContent = cellInput;
        gridCell.insertAdjacentHTML('beforeend', '<input>'); // ADDED FOR TESTING
        gridCell.querySelector('input').addEventListener('keyup', acceptInput); // ADDED FOR TESTING
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

// const restart = () => {
//     // Delete the contents of all the input boxes
// }

const resetGrid = () => {
    const grid = document.querySelector('.grid');
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
                
            } else {
                rowCell.setAttribute('blank', 'false');
                rowCell.textContent = newGrid[i][j];
            }
        }
    };
}

const checkIfSolved = () => {
    let boardSolved = true;

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
                const input = gridCell.textContent;
                const rowIdx = gridCell.getAttribute('row_index');
                const columnIdx = gridCell.getAttribute('column_index');
                
                // find all other numbers in cell row
                const cellRow = [];
                for (k = 0; k < 9; k++) {
                    cellRow.push(cells[k].textContent);
                }
                cellRow.splice(columnIdx, 1);
                console.log('cellRow:');
                console.log(cellRow);

                // find all other numbers in cell column
                const cellCol = [];
                for (l = 0; l < 9; l++) {
                    tds = rows[l].querySelectorAll('td');
                    cellCol.push(tds[columnIdx].textContent);
                }
                cellCol.splice(rowIdx, 1);
                console.log('cellCol:');
                console.log(cellCol);

                // find all other numbers in cell square
                // FIX THIS --------
                const cellSquare = [];
                const squareRowIdx = (Math.floor((parseInt(rowIdx))/3.0) * 3);
                console.log('column idx');
                console.log(columnIdx);
                const squareColumnIdx = (Math.floor(parseInt(columnIdx)/3.0) * 3);
                console.log('square column idx');
                console.log(squareColumnIdx);
                for (m = squareRowIdx + 1; m < squareRowIdx + 3; m++) {
                    console.log('m');
                    console.log(m);
                    const td_rows = rows[m].querySelectorAll('td');
                    for (n = squareColumnIdx + 1; n < squareColumnIdx + 3; n++) {
                        console.log('n');
                        console.log(n);
                        cellSquare.push(td_rows[n].textContent);
                    }
                }
                console.log('cellSquare:');
                console.log(cellSquare);


                // if the cell's number isn't duplicated in its row, column or square, color it blue
                console.log(input);
                console.log(cellRow);
                console.log(cellCol);
                if (cellRow.includes(`${input}`) === false && cellCol.includes(`${input}`) === false && cellSquare.includes(`${input}` === false)) {
                    gridCell.style.color = "blue";
                } else {
                    gridCell.style.color = "red";
                    let boardSolved = false;
                    console.log(boardSolved);
                }
            }
        }
    }
    console.log(boardSolved);
    if (boardSolved === true) {
        alert('You won!');
        // resetGrid();
    }
}

// function giveHint()

// function autoSolve()


resetGrid();
checkIfSolved();

// newGame.addEventListener('click', resetGrid);
// restart.addEventListener('click', restart);
// hint.addEventListener('click', hint);
// autoSolve.addEventListener('click', autoSolve);

