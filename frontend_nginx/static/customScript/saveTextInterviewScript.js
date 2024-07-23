function saveTextInterview() {
    document.getElementById('gifSaveText').style.display = 'block';

    const listItems = document.querySelectorAll('#list-phrase .list-group-item');
    //Преобразуем NodeList в массив и пропустим первый элемент
    const itemsArray = Array.from(listItems).slice(1);
    const data = [];
    itemsArray.forEach(item => {
        // Получаем значения полей из элемента
        const inputTime = item.querySelector('#inputTime').value;
        const speaker = item.querySelector('#inputSpiker').value;
        const phraseText = item.querySelector('#phraseText').value;
        const phraseTextColor = item.querySelector('#phraseText').style.backgroundColor;

        data.push([inputTime, speaker, phraseText, phraseTextColor]);
    });

    const listItemsS = document.querySelectorAll('#list-spiker-filter .list-group-item');
    //Преобразуем NodeList в массив и пропустим первый элемент
    const itemsArrayS = Array.from(listItemsS).slice(1);
    const dataS = [];
    itemsArrayS.forEach(item => {
        dataS.push(item.querySelector('label').textContent);
    });

    var item = itemsArray[0].querySelector('#phraseText');
    var interview = document.getElementById("FileNameForWorkZone").textContent;
    // Объединяем данные в объект для отправки на сервер
    const postData = {
        phrases: data,
        nameAudio: interview,
        sizeFont: parseFloat(window.getComputedStyle(item).fontSize),
        spikers: dataS
    };
    sendTextDataToServer(postData);
}

async function sendTextDataToServer(postData) {
    try {
        const response = await fetch('/upload/savetext', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        if (!response.ok) {
            throw new Error(`Ошибка при отправке данных на сервер: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Ошибка при отправке данных на сервер:', error);
    }
    document.getElementById('gifSaveText').style.display = 'none';
}