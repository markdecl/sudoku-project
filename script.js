const grid = document.querySelector('.grid');
const autoSolve = document.querySelector('#auto-solve');
const selectedCell = undefined

console.log(selectedCell);

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

const selectCell = (event) => {
    // if (selectedCell !== undefined) {
    //     selectedCell.classList.remove('selected');
    // }
    const cells = grid.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.classList.remove('selected');
        // cell.querySelector('input').display = 'none';
    });
    const selectedCell = event.currentTarget;
    selectedCell.classList.add('selected');
    console.log(selectedCell);
}

const saveBoardState = () => {
    const boardState = [];
    const cells = grid.querySelectorAll('.cell');
    cells.forEach((cell) => {
        if (cell.querySelector('input') != null) {
            cellValue = cell.querySelector('input').value;
        } else {
            cellValue = cell.innerHTML;
        };
        boardState.push(cellValue);
    });
    console.log(boardState);
}

// const validateInput = (cellInput, cellIdx) => {
    // cellRow = 
    // cellCol =
    // cellBox = 
// }

const acceptInput = (event) => {
    // if validateInput()
    // event.currentTarget.style = 'color: green'
    saveBoardState();
    checkIfSolved();
}

// const acceptInput = (e) => {
//     if (e.keyCode === 13) {
//         e.currentTarget.textContent = e.currentTarget.querySelector('input').value;
        // e.currentTarget.insertAdjacentHTML('beforeend', '<input type="number" maxlength="1" size="1" min="1" max="9">');
//     }
// }

const createNewGrid = () => {
    return [
        0, 2, 3, 4, 5, 6, 7, 8, 9,
        1, 2, 3, 4, 5, 6, 7, 8, 9, 
        1, 2, 3, 4, 0, 6, 7, 8, 9,
        1, 2, 3, 4, 0, 6, 7, 8, 9, 
        1, 2, 3, 0, 5, 6, 7, 8, 9, 
        1, 2, 0, 4, 5, 6, 0, 8, 9, 
        1, 2, 0, 4, 5, 6, 7, 8, 9, 
        1, 2, 3, 4, 5, 6, 7, 8, 9, 
        1, 2, 3, 4, 5, 6, 7, 8, 9
    ];

    // const solution = [

    // ];
}

const resetGrid = () => {
    const newGrid = createNewGrid();
    const cells = grid.querySelectorAll('.cell');
    for (let i = 0; i <= 80; i++) {
        if (newGrid[i] === 0) {
            cells[i].addEventListener('click', selectCell);
            cells[i].insertAdjacentHTML('beforeend', '<input type="number" maxlength="1" size="1" min="1" max="9">');
            cells[i].querySelector('input').addEventListener('keyup', acceptInput);
        } else {
            cells[i].innerHTML = newGrid[i];
        }
    };
}

const checkIfSolved = () => {

    // if (boardState === solution) {
    //     alert('You won!');
    //     resetGrid()
    // }
}

// function giveHint()

// function autoSolve()

resetGrid()