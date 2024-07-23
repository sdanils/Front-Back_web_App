function filterSpiker(){
    const listItem = this.closest('li');
    const nameSpiker = listItem.querySelector('label').textContent;

    var listPhrase = document.querySelectorAll("#list-phrase .list-group-item");
    if(this.checked){
        listPhrase.forEach(function(item) {
            var secondField = item.querySelector("#inputSpiker");
            if (secondField.value === nameSpiker) 
                item.style.display = 'block';
        });
    }
    else{
        listPhrase.forEach(function(item) {
        var secondField = item.querySelector("#inputSpiker");
        if (secondField.value === nameSpiker) 
            item.style.display = 'none';
        });
    }
}