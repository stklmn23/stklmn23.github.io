// Инициализация карта с центром и нужным масштабом
var map = L.map('map').setView([55.09, 38.768674], 13);

// load a tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: 'Карта маршрутов Коломны <a href="https://yandex.com/maps">Test link</a>',
      maxZoom: 18,
      minZoom: 10
    }).addTo(map);