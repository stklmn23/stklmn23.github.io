// Инициализация базовых карт
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Карта маршрутов Коломны <a href="https://yandex.com/maps">Test link</a>',
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

// ОБЪЯВЛЕНИЕ СТИЛЕЙ И СЛОЁВ
// Граница города (стиль + чтение из GeoJSON)
var city_boundary_style = {
    "color": '#FF94C5',
    "fill": false,
    "weight": 5,
    "dashArray": [10,  10]
};
var city_boundary_layer = L.geoJSON(city_boundary, {style: city_boundary_style});

// Уникальные остановки (стиль + чтение из GeoJSON и кластеризация точек)
var StopIcon = L.icon({
    iconSize: [20, 20],
    iconAnchor: [13, 27],
    popupAnchor:  [1, -24],
    iconUrl: 'icons/bus.png' 
});

const markers = L.markerClusterGroup();
var stops_layer = L.geoJSON(all_stops, {
    onEachFeature: function (feature, layer) {
        var popupTxt = 'Наименование: ' + feature.properties.stop_name + '<br>' +
        'Вид транспорта: ' + feature.properties.type
        layer.bindPopup(popupTxt);
    },
    pointToLayer: function (feature, latlng){
        return markers.addLayer(L.marker(latlng, {icon: StopIcon}))
    },
});

// ОБЪЯВЛЕНИЕ ГРУПП СЛОЁВ
var boundaries = L.layerGroup([city_boundary_layer]);
var stops = L.layerGroup([stops_layer]);

// Инициализация карты с центром и нужным масштабом и слоями
let config = { minZoom: 11, maxZoom: 18, zoomControl: false, fullscreenControl: true,
    layers: [osm, boundaries, stops]
};
var map = L.map('map', config).setView([55.09, 38.76], 13);

// Размещение +/- масштаба
L.control.zoom({ position: "bottomright" }).addTo(map);

// Формирование групп слоёв
var baseMaps = {
    "Базовая OSM": osm,
    "Спутник": Esri_WorldImagery
};

var overlayMaps = {
    "Границы города": boundaries,
    "Остановочные пункты": stops,
};

// Добавление слоёв на карту
var layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed:false,}).addTo(map);