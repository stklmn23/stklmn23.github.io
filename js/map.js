// Инициализация базовых карт
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Карта маршрутов Коломны <a href="https://yandex.com/maps">Test link</a>',
    maxZoom: 18, minZoom: 10
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// Набор точек для слоя (нужно научиться делать из shp в этот файл)
var littleton = L.marker([55.09, 38.76]).bindPopup('This is Littleton, CO.'),
    denver    = L.marker([55.08, 38.75]).bindPopup('This is Denver, CO.'),
    aurora    = L.marker([55.09, 38.75]).bindPopup('This is Aurora, CO.'),
    golden    = L.marker([55.08, 38.76]).bindPopup('This is Golden, CO.');

// Объявление слоя
var cities = L.layerGroup([littleton, denver, aurora, golden]);

// Инициализация карта с центром и нужным масштабом и слоями
var map = L.map('map', {
    center: [55.09, 38.76],
    zoom: 13,
    zoomControl: false,
    layers: [osm, cities]
});

// Размещение +/- масштаба
L.control.zoom({ position: "bottomright" }).addTo(map);

// Формирование групп слоёв
var baseMaps = {
    "Базовая OSM": osm,
    "Спутник": Esri_WorldImagery
};

var overlayMaps = {
    "Административные границы": cities
};

// Добавление слоёв на карту
var layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed:false,}).addTo(map);