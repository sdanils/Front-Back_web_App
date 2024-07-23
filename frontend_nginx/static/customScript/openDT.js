function openDropdownMenu(event) {
    var dropdownMenu = document.getElementById('dropDownToggleDt'); 
    dropdownMenu.style.display = 'block'; 
    // Позиционируем выпадающее меню под элементом
    dropdownMenu.style.top = (event.target.offsetTop + event.target.offsetHeight) + 'px';
    dropdownMenu.style.left = event.target.offsetLeft + 'px';
  }