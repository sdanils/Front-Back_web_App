function setInfoPhrase(value, event) {
    if(document.getElementById('dropDownToggleDt').style.display == 'block'){
        document.getElementById('dropDownToggleDt').style.display = 'none';
        return;
    }
    
    //Сохраняем имя спикера для переименования
    document.getElementById('selectedSpeakerForDT').value = value;
    //Добавляем индекс фразы
    var listItem = event.target.closest('.list-group-item');
    var listPhrase = document.getElementById('list-phrase');
    var index = Array.from(listPhrase.children).indexOf(listItem);
    document.getElementById('indexSelectedPhraseForDT').value = index;

    // Заполнение вариантов выбора
    document.getElementById("oldNameInput").value = value;
    if (document.querySelectorAll('#formSelectSpikerChoose option').length == 0) {
        var selectElement = document.getElementById('formSelectSpikerChoose');
        var listF = document.getElementById('list-spiker-filter');
        var childNodesF = listF.children;
        for (var i = childNodesF.length - 1; i > 0; i--){
            var optionElement = document.createElement('option');
            optionElement.value = childNodesF[i].querySelector('label').textContent;
            optionElement.textContent = childNodesF[i].querySelector('label').textContent;
            selectElement.appendChild(optionElement);
        }
    }

    document.querySelector('#colorSpicker').value = "#ffffff"
    openDropdownMenu(event);
}

function openDropdownMenu(event) {
    var dropdownMenu = document.getElementById('dropDownToggleDt'); 
    dropdownMenu.style.display = 'block'; 
    
    var targetElement = event.target; // Получаем элемент, на котором произошло событие
    // Получаем координаты верхнего левого угла элемента относительно окна браузера
    var elementRect = targetElement.getBoundingClientRect();
    var topPosition = elementRect.top + elementRect.height + window.scrollY;
    dropdownMenu.style.top = topPosition + 'px'; 
    dropdownMenu.style.left = elementRect.left + 'px'; // Левая граница элемента
  }


