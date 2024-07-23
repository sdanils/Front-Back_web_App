// Уменьшение размера шрифта
function decreaseFontSize() {
    var listItems = document.querySelectorAll('#list-phrase .list-group-item');

    listItems.forEach(function (item) {
        var itemText = item.querySelector('textarea.form-control');
        itemText.style.fontSize = (parseFloat(window.getComputedStyle(itemText).fontSize) - 1) + 'px';
    });
}

// Увеличение размера шрифта
function increaseFontSize() {
    var listItems = document.querySelectorAll('#list-phrase .list-group-item');

    listItems.forEach(function (item) {
        var itemText = item.querySelector('textarea.form-control');
        itemText.style.fontSize = (parseFloat(window.getComputedStyle(itemText).fontSize) + 1) + 'px';
    });
}