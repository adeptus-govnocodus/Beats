let myMap

ymaps.ready(init);

function init(){
  myMap = new ymaps.Map("map", {
    center: [59.564657, 150.812267],
    zoom: 14,
    controls: []
  });

  const coords = [
    [59.570706, 150.798292],
    [59.559889, 150.813267],
    [59.555443, 150.805725]
  ]

  myCollection = new ymaps.GeoObjectCollection({},{
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: './img/icons/map-mark.svg',
    iconImageSize: [60, 75],
    iconImageOffset: [-3, -12]
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  })

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable('scrollZoom');
}