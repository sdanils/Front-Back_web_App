//Скрипт выбора интервью  и  вывода его текста
async function handleClickInterview() {
    document.getElementById('gifSaveText').style.display = 'block';
    blockButton();
    blockEnterviews();
    document.getElementById('audioPlayer').pause();
    
    //Очиаем данные файла.
    document.getElementById("columnRewind").style.visibility = "hidden";
    document.getElementById("FileNameForWorkZone").textContent = '';
    document.getElementById("FileTimeForWorkZone").textContent = '';

    document.getElementById("Notification of an empty list-phrase").style.display = 'none';
    var list = document.getElementById('list-interview');

    //Удаление спикеров
    var listS = document.getElementById('list-spiker-static');
    var childNodesS = listS.children;
    for (var i = childNodesS.length - 1; i > 0; i--) 
        listS.removeChild(childNodesS[i]);

    var listF = document.getElementById('list-spiker-filter');
    var childNodesF = listF.children;
    for (var i = childNodesF.length - 1; i > 0; i--) 
        listF.removeChild(childNodesF[i]);
    //Удаление всех фраз
    var listP = document.getElementById('list-phrase');
    var childNodesP = listP.children;
    for (var i = childNodesP.length - 1; i > 0; i--) 
        listP.removeChild(childNodesP[i]);

    document.getElementById("LoadingListPhrase").style.display = 'block';
    var clickedEntry = this; // Получаем нажатый элемент списка
    var filename = clickedEntry.querySelector('#nameInterviewForLI').textContent;
    console.log(filename);


    await Promise.all([
        downloadAudioInterview(filename),
        downloadTextInterview(filename)
    ]);
    
    //Устанавливает имя файла в строку функционала
    document.getElementById("FileNameForWorkZone").textContent = filename;
    //Длителоность файла переносится в обработчике события после загрузки данных
    // Убираем выделение со всех элементов списка
    var entries = list.getElementsByTagName('li');
    for (var i = 0; i < entries.length; i++) {
        entries[i].classList.remove('active');
    }
    // Выделяем выбранный элемент списка
    clickedEntry.classList.add('active');
    unblockFunctions();

}
async function downloadAudioInterview(fileNamed) {
    try {
        const response = await fetch('/upload/getfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 'filename': fileNamed }),
        })
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const serverHash = response.headers.get('X-File-Hash');    
        const blob = await response.blob();
        const clientHash = await calculateHash(blob);
        if (clientHash !== serverHash) 
          throw new Error('File integrity check failed: hash mismatch.');
    
        const audioPlayer = document.getElementById('audioPlayer');
        if (audioPlayer.src) {
          URL.revokeObjectURL(audioPlayer.src);
        }
        audioPlayer.src = URL.createObjectURL(blob);
      } catch (error) {
        console.error("Error during file download:", error);
    }
}
async function downloadTextInterview(filename) {
    try {
      const response = await fetch('/upload/gettext', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'filename': filename }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      const phrases = data.phrases;
      const spikers = data.spikers;
      spikers.forEach(spikerName => {
        addSpikerStatic(spikerName);
        addSpikerFilter(spikerName);
      });
      const fontSize = data.sizeFont;
      phrases.forEach(phraseData => {
        addPhraseApi(phraseData, fontSize);
      });
      document.getElementById("LoadingListPhrase").style.display = 'none';
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
}

async function calculateHash(file) {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

function unblockButton(){
    document.getElementById("+fontSizeButton").removeAttribute('disabled');
    document.getElementById("+fontSizeButton").style.opacity = 1;
    document.getElementById("-fontSizeButton").removeAttribute('disabled');
    document.getElementById("-fontSizeButton").style.opacity = 1;
    document.getElementById("filterButton").removeAttribute('disabled');
    document.getElementById("staticButton").removeAttribute('disabled');
    document.getElementById("downloadButton").removeAttribute('disabled');
    document.getElementById("saveButton").removeAttribute('disabled');
}

function blockButton(){
    document.getElementById("+fontSizeButton").setAttribute('disabled', 'true');
    document.getElementById("+fontSizeButton").style.opacity = 0.5;
    document.getElementById("-fontSizeButton").setAttribute('disabled', 'true');
    document.getElementById("-fontSizeButton").style.opacity = 0.5;
    document.getElementById("filterButton").setAttribute('disabled', 'true');
    document.getElementById("staticButton").setAttribute('disabled', 'true');
    document.getElementById("downloadButton").setAttribute('disabled', 'true');
    document.getElementById("saveButton").setAttribute('disabled', 'true');
}

function blockEnterviews(){
    var listItems = document.querySelectorAll('#list-interview li');
    // Проходимся по каждому элементу списка и устанавливаем стиль выделения
    listItems.forEach(function(item) {
        item.style.pointerEvents = 'none';
        item.style.opacity = '0.5';
    });
}

function unblockEnterviews(){
    var listItems = document.querySelectorAll('#list-interview li');
    // Проходимся по каждому элементу списка и устанавливаем стиль выделения
    listItems.forEach(function(item) {
        item.style.pointerEvents = 'auto';
        item.style.opacity = '1';
    });
}

function unblockFunctions(){
    unblockEnterviews();
    unblockButton();
}