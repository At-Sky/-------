let mainPlace = [55.80294795964377,37.19445194243071];

function init(){
    let map = new ymaps.Map("map-container", {
        center: mainPlace,
        zoom: 17
    });

    let placemark = new ymaps.Placemark(mainPlace, {}, {
        iconLayout: 'default#image',
        iconImageHref: '/Images/icons/map-marker-svgrepo-com.svg',
        iconImageSize: [40, 40],
        iconImageOffset: [-21, -35]
    });

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    // map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    map.geoObjects.add(placemark);
}



ymaps.ready(init);