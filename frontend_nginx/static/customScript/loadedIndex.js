document.addEventListener('DOMContentLoaded', function() {
    checkCookies();

    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.addEventListener('loadedmetadata', () => {
        // Обработчик события loadedmetadata
        const durationInSeconds = audioPlayer.duration;
        const formattedTime = formatTime(durationInSeconds); // Форматирование времени

        // Установка форматированного времени в элемент с id FileTimeForWorkZone
        const fileTimeElement = document.getElementById("FileTimeForWorkZone");
        fileTimeElement.textContent = formattedTime;
        document.getElementById("columnRewind").style.visibility = "visible";
        document.getElementById('gifSaveText').style.display = 'none';
    });
});

// Оправка запроса для проверки куки и загруженных файлов.
function checkCookies(){
    fetch('/upload/getfiles')
        .then(response => response.json())
        .then(data => {
            if (data.user_id) {
                // Если получен идентификатор пользователя
                console.log("Идентификатор пользователя:", data.user_id);
            } else if (Array.isArray(data.filenames)) {
                // Если получен список имен файлов
                console.log("Получен список файлов.");
                data.filenames.forEach(filename => {
                    addEnterviewAPI(filename);
                });
            } else {
                console.error("Неизвестный формат данных:", data);
            }
        })
        .catch(error => console.error('Ошибка:', error));
}

function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = Math.floor(seconds % 60);
  
    var formattedTime = pad(hours) + ":" + pad(minutes) + ":" + pad(remainingSeconds);
    return formattedTime;
  }