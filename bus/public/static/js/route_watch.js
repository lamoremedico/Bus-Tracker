function startUpdater(){
  setInterval(function(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:3001/info", true);
    xhttp.send();

    setTimeout(function(){
      var text = xhttp.responseText;
      var point = JSON.parse(text)

      var lat = point[0];
      var lon = point[1];

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
    zoom: 5
  });

  // Create a marker and set its position.
  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
    title: 'Hello World!'
  });

  /*Creates marker when clicked by user - can adjust to allow 
    click if marker is on route and then show distance/time til point */ 
  map.addListener('click', function(e) {
  var marker = new google.maps.Marker({
    position: {lat: e.latLng.lat(), lng: e.latLng.lng()},
    map: map
  });
});
}


startUpdater();
