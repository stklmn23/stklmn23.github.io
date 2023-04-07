// Инициализация базовых карт
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Карта маршрутов Коломны <a href="https://yandex.com/maps">Test link</a>',
    maxZoom: 18, minZoom: 10
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Объявление стилей и слоёв, чтение из GeoJSON файлов

var city_boundary_style = {
    "color": '#FF94C5',
    "fill": false,
    "weight": 5,
    "dashArray": [10,  10]
};
var city_boundary_layer = L.geoJSON(city_boundary, {style: city_boundary_style});

var stops_layer = L.geoJSON(all_stops, {
    onEachFeature: function (feature, layer) {
      var popupTxt = 'Наименование: ' + feature.properties.stop_name + '<br>' +
                     'Вид транспорта: ' + feature.properties.type
      layer.bindPopup(popupTxt);
    }      
  });

// Объявление групп слоёв
var boundaries = L.layerGroup([city_boundary_layer]);
var stops = L.layerGroup([stops_layer]);

// Инициализация карта с центром и нужным масштабом и слоями
var map = L.map('map', {
    center: [55.09, 38.76],
    zoom: 13,
    zoomControl: false,
    layers: [osm, boundaries]
});

// Размещение +/- масштаба
L.control.zoom({ position: "bottomright" }).addTo(map);

// Формирование групп слоёв
var baseMaps = {
    "Базовая OSM": osm,
    "Спутник": Esri_WorldImagery
};

var overlayMaps = {
    "Границы города": boundaries,
    "Остановочные пункты": stops
};

// Добавление слоёв на карту
var layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed:false,}).addTo(map);

// // Кластеризация точек остановок
// var markers = L.markerClusterGroup();
// markers.addLayer(stops_layer);
// map.addLayer(markers);