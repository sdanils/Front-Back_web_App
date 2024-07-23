function renameSpiker() {    
    var oldName = document.getElementById("oldNameInput").value;
    var newName = document.getElementById("newNameInput").value;

    // Проверка на совпадение спикеров
    let foundMatch = false;
    const listSpiker = document.querySelectorAll('#list-spiker-filter .list-group-item');
    listSpiker.forEach(item => {
        const label = item.querySelector('label');
        if (label.textContent.trim().toLowerCase() === newName.trim().toLowerCase()){
            foundMatch = true;
            return;
        }
    });
    if(foundMatch){
        document.getElementById("newNameInput").classList.add('is-invalid');
        document.getElementById("oldNameInput").classList.add('is-invalid');
        return;
    }

    document.getElementById("newNameInput").value = '';

    //"list-speaker-static"
    var speakerItems = document.querySelectorAll("#list-spiker-static .list-group-item");
    speakerItems.forEach(function(item) {
        var label = item.querySelector("label");
        if (label.textContent.trim() === oldName) 
            label.textContent = newName;
    });

    //"list-spiker-filter"
    var spikerItems = document.querySelectorAll("#list-spiker-filter label");
    spikerItems.forEach(function(item) {
        if (item.textContent.trim() === oldName) 
            item.textContent = newName;
    });

    //"list-phrase"
    var listItems = document.querySelectorAll("#list-phrase .list-group-item");
    listItems.forEach(function(item) {
        var secondField = item.querySelector("#inputSpiker");
        if (secondField.value === oldName) 
            secondField.value = newName; 
    });

    //formSelectSpikerChoose
    var selectElement = document.getElementById("formSelectSpikerChoose");
    var optionToChange = selectElement.querySelector('option[value="' + oldName + '"]');
    optionToChange.textContent = newName;
    optionToChange.value = newName;

    document.getElementById("oldNameInput").value = newName;

    document.getElementById('selectedSpeakerForDT').value = newName;

    document.getElementById("newNameInput").classList.remove('is-invalid');
    document.getElementById("oldNameInput").classList.remove('is-invalid');

    $('#renameModal').modal('hide');
}

function chooseSpiker() {
    var selectedSpiker = document.getElementById('formSelectSpikerChoose').value;
    var itemIndex = document.getElementById('indexSelectedPhraseForDT').value;
    var listItem = document.getElementById('list-phrase').children[itemIndex];
    var dropdownInput = listItem.querySelector('#inputSpiker');
    dropdownInput.value = selectedSpiker;
    document.getElementById('selectedSpeakerForDT').value = selectedSpiker;
    document.getElementById("oldNameInput").value = selectedSpiker;
    
    $('#spikerChooseModal').modal('hide');
}

function changeColorText() {
    var itemIndex = document.getElementById('indexSelectedPhraseForDT').value;
    var allCheckbox = document.querySelector('#checkboxAllPhrase');
    var listItems = document.querySelectorAll('#list-phrase .list-group-item');

    if (allCheckbox.checked) {
        var spiker = document.getElementById('selectedSpeakerForDT').value;
        listItems.forEach(function (item) {
            if (item.querySelector('#inputSpiker').value === spiker) {
                item.querySelector('#phraseText').style.backgroundColor = document.querySelector('#colorSpicker').value;
            }
        });
    } else {
        listItems[itemIndex].querySelector('#phraseText').style.backgroundColor = document.querySelector('#colorSpicker').value;
    }
    
    $('#spikerColorModal').modal('hide');
}


function ChangeFontIntr() {
    var itemIndex = document.getElementById('indexSelectedPhraseForDT').value;
    var listItems = document.querySelectorAll('#list-phrase .list-group-item');
    var spiker = document.getElementById('selectedSpeakerForDT').value;

    if (listItems[itemIndex].querySelector('#phraseText').style.fontWeight === 'bold') {
        listItems.forEach(function (item) {
            item.querySelector('#phraseText').style.fontWeight = 'normal';
        });
    } else {
        listItems.forEach(function (item) {
            if (item.querySelector('#inputSpiker').value === spiker) {
                item.querySelector('#phraseText').style.fontWeight = 'bold';
            }
            else{
                item.querySelector('#phraseText').style.fontWeight = 'normal';
            }
        });
    }
}

function CloseListFunc(){
    document.getElementById('dropDownToggleDt').style.display = 'none';
}