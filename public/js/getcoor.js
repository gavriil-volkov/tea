const form = document.getElementById('entry_post');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let myCoords;
  const title = e.target.title.value;
  const description = e.target.description.value;
  const location = e.target.location.value;
  ymaps.ready(init);

  async function init() {
    const myMap = new ymaps.Map('map', {
      center: [55.753994, 37.622093],
      zoom: 2,
    });
      // Поиск координат центра .
    ymaps.geocode(location, {
      results: 1,
    }).then(async (res) => {
      // Выбираем первый результат геокодирования.
      const firstGeoObject = res.geoObjects.get(0);
      // Координаты геообъекта.
      const coords = firstGeoObject.geometry.getCoordinates();
      const myCoords = coords;
      // Область видимости геообъекта.
      bounds = firstGeoObject.properties.get('boundedBy');

      firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
      // Получаем строку с адресом и выводим в иконке геообъекта.
      firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

      // Добавляем первый найденный геообъект на карту.
      myMap.geoObjects.add(firstGeoObject);
      // Масштабируем карту на область видимости геообъекта.
      myMap.setBounds(bounds, {
        // Проверяем наличие тайлов на данном масштабе.
        checkZoomRange: false,
      });
      // console.log('/////////', coords);
      /// ////////////////////////////////////////////////////
      const coordinates = coords;
      const resp = await fetch('/entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title, description, location, coordinates,
        }),
      });
      window.location.assign('/');
      /// ////////////////////////////////////////////////////
    });
  }
});
