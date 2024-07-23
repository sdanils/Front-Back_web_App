function createDoc(){
    var filename = document.getElementById("FileNameForWorkZone").textContent;

    fetch('/upload/word', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'filename': filename}),
    })
    .then(response => {
        if (!response.ok) {
            console.log("Перед скачиванием транскрипции необходимо сохранить фаил")
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob()
    }).then(blob => {
        // Создаем ссылку для загрузки Blob
        const url = window.URL.createObjectURL(blob);
        // Создаем ссылку на элемент <a> для загрузки файла
        const link = document.createElement('a');
        link.href = url;
        link.download = "interview_transcrition.doc";
        // Добавляем элемент <a> на страницу и эмулируем клик для скачивания файла
        document.body.appendChild(link);
        link.click();

        // Удаляем ссылку после скачивания файла
        link.parentNode.removeChild(link);
        // Освобождаем URL-объект
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}

function CreateTXT(){
    const listItems = document.querySelectorAll('#list-phrase .list-group-item');

    let textContent = '';

    Array.from(listItems).slice(1).forEach( item => {
        const inputTime = item.querySelector('#inputTime').value;
        const speaker = item.querySelector('#inputSpiker').value;
        const phraseText = item.querySelector('#phraseText').value;
        // Формируем строку данных для текущего элемента
        const line = `${inputTime}\t ${speaker}\t ${phraseText}\n`;
        // Добавляем строку к общему текстовому содержимому
        textContent += line;
    });

    const filename = 'interview_transcription.txt';
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textContent));
    element.setAttribute('download', filename);
    // Скрываем элемент <a> и добавляем его на страницу
    element.style.display = 'none';
    document.body.appendChild(element);
    // Нажимаем на элемент <a>, чтобы начать загрузку файла
    element.click();

    // Удаляем элемент <a> после завершения загрузки
    document.body.removeChild(element);
}

/*function createPDF(){
    var filename = document.getElementById("FileNameForWorkZone").textContent;

    fetch('/upload/pdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'filename': filename}),
    })
    .then(response => {
        if (!response.ok) {
            console.log("Перед скачиванием транскрипции необходимо сохранить фаил")
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob()
    }).then(blob => {
        // Создаем ссылку для загрузки Blob
        const url = window.URL.createObjectURL(blob);
        // Создаем ссылку на элемент <a> для загрузки файла
        const link = document.createElement('a');
        link.href = url;
        link.download = "interview_transcrition.pdf";
        // Добавляем элемент <a> на страницу и эмулируем клик для скачивания файла
        document.body.appendChild(link);
        link.click();

        // Удаляем ссылку после скачивания файла
        link.parentNode.removeChild(link);
        // Освобождаем URL-объект
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}*/
