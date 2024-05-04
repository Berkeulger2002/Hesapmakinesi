darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-theme');
});

const screen = document.querySelector('.output');
const buttons = document.querySelectorAll('button');
const operator = document.querySelector('.operator');

// Ekran değerini ve işlem sonucunu saklamak için değişkenler oluştur

let result = '';
let screenValue = '';

// Önceki işlemleri ve sonuçları saklamak için bir dizi
// Son üç işlemi ve sonuçlarını saklayan bir dizi
// Önceki işlemleri ve sonuçları saklamak için bir dizi
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
            addToHistory(screenValue, result); // İşlemi geçmişe ekle
        } else if (buttonText === 'd') { // "d" butonuna tıklandığında geçmişi göster
            showHistory();
        } else {
            // Çarpma, bölme ve mod işlemlerini kontrol et
            if (buttonText === 'X') {
                screenValue += '*';
            } else if (buttonText === '/') {
                screenValue += '/';
            } else if (buttonText === '%') {
                screenValue += '%';
            } else {
                screenValue += buttonText;
            }
        }

        screen.textContent = screenValue;
    });
});

function addToHistory(expression, result) {
    history.push({ expression, result });
    // Eğer geçmişin uzunluğu üçten fazlaysa, en eski işlemi kaldır
    if (history.length > 3) {
        history.shift(); // En eski işlemi kaldır
    }
    updateHistoryPage();
}
// Geçmiş sayfasını gösterir
function showHistory() {
    // Önceki işlemlerin ve sonuçlarının gösterileceği yeni bir HTML sayfası oluştur
    let historyHTML = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Geçmiş İşlemler</title></head><body><h1>Geçmiş İşlemler</h1><ul>';

    // Geçmiş dizisindeki her öğeyi dolaşarak HTML'e ekle
    history.forEach(item => {
        historyHTML += `<li>${item.expression} = ${item.result}</li>`;
    });

    historyHTML += '</ul></body></html>';

    // Yeni HTML içeriğini yeni bir pencerede aç
    const newWindow = window.open('');
    newWindow.document.write(historyHTML);
}
