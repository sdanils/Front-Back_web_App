function addPhrase(element, spikerName){
    //Создаем элемент с помощью копирования шаблона
    var template = document.getElementById('list-phrase-item-template');
    var newItem = template.cloneNode(true);
    newItem.style.display = 'block'; // Показываем клонированный элемент
    newItem.querySelector('#phraseText').value = element;
    newItem.querySelector('#inputSpiker').value = spikerName;
    $(newItem).find('#inputTime').mask('00:00:00');
    newItem.querySelector('#inputTime').value = '00:00:00';
    
    document.getElementById('list-phrase').appendChild(newItem);
}  

function addPhraseApi(phrase, fontSize){
    //Создаем элемент с помощью копирования шаблона
    var template = document.getElementById('list-phrase-item-template');
    var newItem = template.cloneNode(true);
    newItem.style.display = 'block'; // Показываем клонированный элемент
    newItem.querySelector('#phraseText').value = phrase[2];
    newItem.querySelector('#phraseText').style.backgroundColor = phrase[3];
    newItem.querySelector('#inputSpiker').value = phrase[1];
    $(newItem).find('#inputTime').mask('00:00:00');
    newItem.querySelector('#inputTime').value = phrase[0];
    newItem.querySelector('textarea.form-control').style.fontSize = fontSize + 'px';
    
    document.getElementById('list-phrase').appendChild(newItem);
}  

// Функция для автоматического регулирования высоты textarea в зависимости от количества строк \n
//function autoAdjustRows(textarea) {
  //  textarea.rows = "1";
    //var rows = textarea.value.split("\n").length;
    //textarea.rows = rows < 1 ? 1 : rows;
//}

