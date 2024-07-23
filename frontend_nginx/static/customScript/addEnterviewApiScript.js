function addEnterviewAPI(fileName) {
    document.getElementById('Notification of an empty list-interview').style.display = 'none';
    //Создаем элемент с помощью копирования шаблона
    var newItem = document.getElementById('list-interview-item-template').cloneNode(true);
    newItem.style.display = 'block'; // Показываем клонированный элемент
  
    newItem.querySelector('#nameInterviewForLI').textContent = fileName;
    newItem.addEventListener('click', handleClickInterview);
  
    document.getElementById('list-interview').appendChild(newItem);
 }