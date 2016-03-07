function startUpdater(){
  setInterval(function(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:3001/info", true);
    xhttp.send();

    setTimeout(function(){
      var text = xhttp.responseText;
      var point = JSON.parse(text)

      var lat = point[1];
      var lon = point[0];

      document.getElementById('bus_1_info').innerHTML = 'lat: ' + lat + ' - lon: ' + lon;

      initMap(lat, lon)
    },10)
  },10000)
}

function initMap(lat, lng) {
  var myLatLng = {lat: lat, lng: lng};

  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('bus_1_map'), {
    center: myLatLng,
    scrollwheel: false,
    zoom: 12
  });

  //add traffic layer to map
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);

  // Create a marker and set its position.
  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
    title: 'Hello World!'
  });

  // A kml layer needs 2 things - a kml file and a set of options
    // I selected a random kml file - but since I did not give a location for the
    // map in map options - the kml file better do this

    var kmlUrl = 'https://www.google.com/maps/d/edit?mid=z6sSANoSrkWg.kSQOiF5m2sig';
   //var kmlOptions = { map: map};

    // Create the kmlLayer - and you are done
    var kmlLayer = new google.maps.KmlLayer(kmlUrl, map);

  /*Creates marker when clicked by user - NEED TO adjust to allow
    click if marker is on route and then show distance/time til point */
  map.addListener('click', function(e) {
  var marker = new google.maps.Marker({
    position: {lat: e.latLng.lat(), lng: e.latLng.lng()},
    map: map
  });
});
}


startUpdater();
