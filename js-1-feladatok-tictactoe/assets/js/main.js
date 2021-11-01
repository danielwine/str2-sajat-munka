
let matrix = [];
let stepCount = 0;
let cols = 3;
let rows = 3;
let mark = 'X';

const initState = () => {
    matrix = Array(rows).fill(null).map(() => Array(cols).fill(null));
}

const changeMatrixValue = (element) => {
    const row = parseInt(element.dataset.row, 10);
    const cell = parseInt(element.dataset.cell, 10);
    matrix[row][cell] = element.textContent;
}

const deleteSigns = () => {
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        const element = cells[i];
        element.innerHTML = ' ';
    }
}

const increaseCounter = () => {
    stepCount += 1
}

const modifyCell = (element) => {
    element.innerHTML = mark;
    element.removeEventListener('click', handleClick)
}

const setMark = () => {
    if (mark === 'X') { mark = '0' }
    else if (mark === '0') { mark = 'X' }
}

const handleClick = (event) => {
    increaseCounter();
    modifyCell(event.target);
    setMark();
    changeMatrixValue(event.target);
    checkWinner();
}

const addClickListener = () => {
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        const element = cells[i];
        element.addEventListener('click', handleClick);
    }
}

const removeAllClickListeners = () => {
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        const element = cells[i];
        element.removeEventListener('click', handleClick);
    }
}

const checkValues = (array) => array.map(row => {
    return row.every(item => item == "X") || row.every(item => item == "0")
})
    .indexOf(true) !== -1;
/*
Ha true-t kapunk visza adott sorra, akkor 
annak indexét vizsgálva nem kaphatunk -1-et.
Azaz az elem benne van a tömbben.
*/

const checkColumnValues = () =>
    checkValues(matrix.map((array, i) =>
        array.map((item, j) => matrix[j][i])));

const checkDiagonalValues = () =>
    checkValues([
        matrix.map((array, i) => matrix[i][i]),
        matrix.map((array, i) => matrix[i][matrix[i].length - i - 1])

        /*
        Miután az első függvénnyel leellenőriztük a sorok tartalmát,
        a fentiekkel megvizsgáljuk az oszlopok és az átlókban lévő mezők tartalmát.
        Ez azért fontos, mert így tudhatjuk meg, 
        hogy lesz-e három azonos jel egymás mellett/alatt/átlósan.
        */
    ]);

const checkWinner = () => {
    let checkedColumnValues = checkColumnValues();
    let checkedDiagonalValues = checkDiagonalValues();
    console.log(checkedColumnValues);
    console.log(checkedDiagonalValues);
    if (checkValues(matrix) || checkedColumnValues || checkedDiagonalValues) {
        endGame();
    }
}

const setMessage = (message) => {
    let msg = document.querySelector('div.message');
    msg.innerHTML = message;
}

const startGame = () => {
    initState()
    addClickListener()
    newGame()
}

const endGame = () => {
    setMessage('The winner is Player ' + (mark === 'X' ? 'O' : 'X') + '.');
    removeAllClickListeners();
}

const newGame = () => {
    let button = document.querySelector('button#startButton')
    button.addEventListener('click', () => {
        initState();
        addClickListener();
        deleteSigns();
        setMessage('Playing...');
        setMark();
    })
}

startGame();
