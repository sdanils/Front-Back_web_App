function statisticFunc(){
    const listItems = document.querySelectorAll('#list-spiker-static .list-group-item');
    const valuesStatic = {};

    listItems.forEach(item => {
        // Получаем чекбокс, лейбл и поле ввода number
        const checkbox = item.querySelector('input[type="checkbox"]');
        const label = item.querySelector('label');
        const numberInput = item.querySelector('input[type="number"]');
            // Проверяем, включен ли чекбокс
        if (checkbox && checkbox.checked) 
            valuesStatic[label.textContent.trim()] = numberInput.value;
    });

    var spikerWords = {};

    if(Object.keys(valuesStatic).length > 0)
        spikerWords = getMostFrequentWords(valuesStatic);
    else
        console.log("Нет выбранных спикеров");
}

function getMostFrequentWords(valuesStatic) {
    // Получаем все элементы списка
    const listItems = document.querySelectorAll('#list-phrase .list-group-item');
    // Объект для хранения слов и их частоты по каждому спикеру
    const spikerWords = {};

    for (const key in valuesStatic) {
        spikerWords[key] = {};
    }

    // Проходим по каждому элементу списка
    listItems.forEach(item => {
        // Получаем значения полей inputSpiker и phraseText
        const spikerInput = item.querySelector('#inputSpiker').value;
        if(spikerInput in valuesStatic || 'Все спикеры' in valuesStatic){
            const phraseText = item.querySelector('#phraseText').value;

            //if (spikerInput && phraseText) {
            const spiker = spikerInput.trim();
            const text = phraseText.trim().toLowerCase();
            // Разделяем текст на слова и считаем частоту каждого слова
            const cleanedText = text.replace(/[.,;:!?-_]/g, "");
            const words = cleanedText.split(/\s+/);
            if(spikerInput in valuesStatic){
                words.forEach(word => {
                    if (word) {
                        if (!spikerWords[spiker][word]) {
                            spikerWords[spiker][word] = 0;
                        }
                        spikerWords[spiker][word]++;
                        if('Все спикеры' in valuesStatic){
                            if (!spikerWords['Все спикеры'][word]) {
                                spikerWords['Все спикеры'][word] = 0;
                            }
                            spikerWords['Все спикеры'][word]++;
                        }
                    }
                });
            }
            else{
                words.forEach(word => {
                    if (word) {
                        if('Все спикеры' in valuesStatic){
                            if (!spikerWords['Все спикеры'][word]) {
                                spikerWords['Все спикеры'][word] = 0;
                            }
                            spikerWords['Все спикеры'][word]++;
                        }
                    }
                });
            }
        }
    });

    const sortedSpikerWords = {};
    for (const spiker in spikerWords) {
        const wordsArray = Object.entries(spikerWords[spiker]);
        wordsArray.sort((a, b) => b[1] - a[1]);

        if (wordsArray.length > valuesStatic[spiker]) 
            sortedSpikerWords[spiker] = wordsArray.slice(0, valuesStatic[spiker]);
        else
            sortedSpikerWords[spiker] = wordsArray; 
    }

    const modalText = document.getElementById("modalStatisticText");

    let modalContent = "";
    for (const spiker in sortedSpikerWords) {
        modalContent += `Спикер: ${spiker}\n`;
        sortedSpikerWords[spiker].forEach(([word, frequency]) => {
            modalContent += `Слово: "${word}" Частота: ${frequency}\n`;
        });
        modalContent += `\n`;
    }
    modalText.textContent = modalContent;
}

function downloadStatistic(){
    var text = document.getElementById('modalStatisticText').textContent;
    // Создаем объект Blob из текста
    var blob = new Blob([text], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'statistic.txt'; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}