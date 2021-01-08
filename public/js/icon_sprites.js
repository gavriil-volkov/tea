ymaps.ready(init);

async function init() {
  const myMap = new ymaps.Map('map', {
    center: [55.95, 32.44],
    zoom: 2,
  });

  const entrys = await fetch('/getentry');
  const arrentrys = await entrys.json();

  for (let i = 0; i < arrentrys.length; i++) {
    if (arrentrys[i].coordinates) {
      const myPlacemark1 = new ymaps.Placemark(arrentrys[i].coordinates, {
        balloonContent: `ПОДРОБНЕЕ: <a href="/card/${arrentrys[i]._id}">${arrentrys[i].title}</a>`,
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/green-tea.svg',
      });
      myMap.geoObjects.add(myPlacemark1);
    }
  }
}
