// Функция для отправки аудиофайла на сервер
function sendAudioFile(file, filename, numberSpikers, newItem) {
    const MyformData = new FormData();
    MyformData.append('myfile', file);
    MyformData.append('filename', filename);
    MyformData.append('fileType', 'mp');
    MyformData.append('fileSize', file.size);
    MyformData.append('numSpikers', numberSpikers);

    fetch('/upload/loadfile', {
      method: 'POST',
      body: MyformData,
    })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok.');
      }
      //Востанавливает активность элемента интервью
      newItem.style.pointerEvents = 'auto';
      newItem.style.opacity = '1';
      newItem.querySelector('#gifLoadInterview').style.display = 'none';
    })
    .catch(error => {
      console.error('Error:', error);
      newItem.remove();
    });    
}