function addEnterview() {
  var fileName = document.getElementById('FileNameInput').value.trim();
  var numberSpikers = document.getElementById('numberSpiker').value;
  var file = document.getElementById('FileInput').files[0];

  // Получаем расширение файла из свойства name объекта file
  var fileExtension = file.name.split('.').pop();
  // Добавляем расширение к имени файла
  fileName += '.' + fileExtension;

  //Проверка на размер файла
  if (file.size > 90*1024*1024) {
    file.value = ''; // сбрасываем выбранный файл
    document.getElementById('FileInput').classList.add('is-invalid');
    return;
  }
  // Проверяем, что оба поля не пустые
  if (fileName.trim() === ''){
    document.getElementById('FileNameInput').classList.add('is-invalid');
    return;
  }
  else 
    document.getElementById('FileNameInput').classList.remove('is-invalid');
  
  if (!file || !isFileMp3OrMp4(file)){ 
    document.getElementById('FileInput').classList.add('is-invalid');
    return;
  }
  else 
    document.getElementById('FileInput').classList.remove('is-invalid');
  //Проверка на совпадение имени файла
  let foundMatch = false;
  const listEnterviews = document.querySelectorAll('#list-interview .list-group-item');
  listEnterviews.forEach(item => {
    const span = item.querySelector('span');
    if (span.textContent.trim().toLowerCase() === fileName.trim().toLowerCase()){
      foundMatch = true;
      return;
    }
  });
  if(foundMatch){
    document.getElementById("FileNameInput").classList.add('is-invalid');
    return;
  }
  else{
    document.getElementById("FileNameInput").classList.remove('is-invalid');
  }

  document.getElementById('FileNameInput').value = '';
  document.getElementById('FileInput').value = '';
  document.getElementById('Notification of an empty list-interview').style.display = 'none';

  //Создаем элемент с помощью копирования шаблона
  var newItem = document.getElementById('list-interview-item-template').cloneNode(true);
  newItem.style.display = 'block'; // Показываем клонированный элемент

  //Делает элемент не активным, до завершения запроса.
  newItem.style.pointerEvents = 'none';
  newItem.style.opacity = '0.5';
  newItem.querySelector('#gifLoadInterview').style.display = 'block';
  // Отправка POST запроса на сервер
  sendAudioFile(file, fileName, numberSpikers, newItem);

  newItem.querySelector('#nameInterviewForLI').textContent = fileName;
  newItem.addEventListener('click', handleClickInterview);

  document.getElementById('list-interview').appendChild(newItem);
  $('#UploadingInterviewModal').modal('hide');
}

function pad(num) {
  return (num < 10 ? "0" : "") + num;
}

function isFileMp3OrMp4(file) {
  var fileName = file.name;
  var fileExtension = fileName.split('.').pop().toLowerCase();
  return fileExtension === 'mp3' || fileExtension === 'mp4';
}
