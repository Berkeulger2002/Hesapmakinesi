darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-theme');
});
const dButton = document.getElementById('d');

dButton.addEventListener('click', () => {
    showHistory();
});


const screen = document.querySelector('.output');
const buttons = document.querySelectorAll('button');
const operator = document.querySelector('.operator');

let parenthesesCount = 0;
let result = '';
let screenValue = '';


let history = [];

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.innerText;

        if (buttonText === 'AC') {
            screenValue = '';
            result = '';
            operator.textContent = '';
        } else if (buttonText === '=') {
            result = eval(screenValue);
            operator.textContent = result ? `= ${result}` : '';
            addToHistory(screenValue, result); 
        }  else if (buttonText === '()') { 
            // Ekran değerine "(" veya ")" ekle
            if (parenthesesCount % 2 === 0) {
                screenValue += '(';
            } else {
                screenValue += ')';
            }
            parenthesesCount++;
        } else if (buttonText === 'back') { 
            // Ekran değerinin son karakterini sil
            if (screenValue.length > 0) {
                screenValue = screenValue.slice(0, -1);
            }
        } else {
            if (buttonText === 'X') {
                screenValue += '*';
            } else if (buttonText === '/') {
                screenValue += '/'; 
            } else {
                screenValue += buttonText;
            }
        }

        screen.textContent = screenValue;
    });
});


function addToHistory(expression, result) {
    history.push({ expression, result });
    if (history.length > 3) {
        history.shift(); 
    }
    updateHistoryPage();
}
function showHistory() {
    let historyHTML = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Geçmiş İşlemler</title></head><body><h1>Geçmiş İşlemler</h1><ul>';

    history.forEach(item => {
        historyHTML += `<li>${item.expression} = ${item.result}</li>`;
    });

    historyHTML += '</ul></body></html>';

    const newWindow = window.open('');
    newWindow.document.write(historyHTML);
}
