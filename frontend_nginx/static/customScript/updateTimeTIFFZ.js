function updateTimeTIFFZ(value) {
    var secondsTotal = parseFloat(value); // Получаем значение диапазона в секундах
    var hours = Math.floor(secondsTotal / 3600); // Вычисляем часы
    var minutes = Math.floor((secondsTotal - (hours * 3600)) / 60); // Вычисляем минуты
    var seconds = Math.floor(secondsTotal - (hours * 3600) - (minutes * 60)); // Вычисляем секунды

    // Форматируем вывод времени
    var formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    
    // Обновляем текст span
    document.getElementById('timeInterviewForFuncZone').textContent = formattedTime;
}