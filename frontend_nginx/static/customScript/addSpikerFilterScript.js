function addSpikerFilter(spikerName){
    var template = document.getElementById('list-spiker-filter-item-template');
    var newItem = template.cloneNode(true);
    newItem.style.display = 'inline-block'; // Показываем клонированный элемент

    newItem.querySelector('input').id = 'checkboxFilter' + spikerName; 
    newItem.querySelector('input').name = 'checkboxFilter' + spikerName; 
    newItem.querySelector('input').value = 'checkboxFilter' + spikerName; 
    newItem.querySelector('label').setAttribute('for', 'checkboxFilter' + spikerName);
    // Изменяем текст внутри label
    newItem.querySelector('label').textContent = spikerName;
     
    newItem.querySelector('input').addEventListener('change', function() {
        filterSpiker.call(this);
    });
    // Добавляем копию обратно в список
    let listContainer = document.getElementById('list-spiker-filter');
    listContainer.appendChild(newItem);
}

function addSpikerStatic(spikerName){
    var template = document.getElementById('list-spiker-static-item');
    var newItem = template.cloneNode(true);

    newItem.querySelector('#checkboxAll').name = 'checkboxStatic' + spikerName; 
    newItem.querySelector('#checkboxAll').value = 'checkboxStatic' + spikerName; 
    var el = newItem.querySelector('#checkboxAll');
    el.id = 'checkboxStatic' + spikerName; 
    newItem.querySelector('label').setAttribute('for', 'checkboxStatic' + spikerName);
    // Изменяем текст внутри label
    newItem.querySelector('label').textContent = spikerName;

    // Добавляем копию обратно в список
    let listContainer = document.getElementById('list-spiker-static');
    listContainer.appendChild(newItem);
}