function startUpdater(){
  setInterval(function(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", window.location.origin + "/get_bus22_position", true);
    xhttp.send();

    setTimeout(function(){
      var text = xhttp.responseText;
      var position
//      console.log(text)
      if (text !== ''){
        position = JSON.parse(text)
//        console.log(obj)

      }
      // var positions = JSON.parse(text)
      //
      // console.log(positions)
      // var lat = point[1];
      // var lon = point[0];
      // console.log(lat);
      // console.log(lon);
      // document.getElementById('bus_22_info').innerHTML = 'lat: ' + lat + ' - lon: ' + lon;
      //
      // initMap(lat, lon)


       document.getElementById('bus_22_info').innerHTML = '<p>The Bus is currently at a latitude of ' + position.lat + '˚ and a longitude of ' + position.lon + '˚.<br>It will arrive at the next stop, 2415 Sandover Rd, in approximately 3 minutes</p>';
        //This is currently a placeholder ^ for variables that will later display any needed address
      //  initMap(lat, lon)

    },10)


  // var lat = 40.047258
  // var lon = -83.077615
  },10000)
}

function getETA(point){

}


function initMap(lat, lng) {
  var myLatLng = {lat: lat, lng: lng};

  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('bus_22_map'), {
    center: myLatLng,
    scrollwheel: false,
    zoom: 12
  });

  //add traffic layer to map
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);

  // Create a marker and set its position.
  var marker = new google.maps.Marker({
    position: myLatLng,
    icon: '/images/superminibus.png'
  });
  marker.setMap(map);
  // Info window on marker
    var infowindow = new google.maps.InfoWindow({
  content:"The Bus Driver is here!"
  });

infowindow.open(map, marker);

/*
var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [origin1, origin2],
          destinations: [destinationA, destinationB],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== google.maps.DistanceMatrixStatus.OK) {
            alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var outputDiv = document.getElementById('output');
            outputDiv.innerHTML = '';
            deleteMarkers(markersArray);
*/

var bus27Route = new google.maps.KmlLayer({
    url: 'https://sites.google.com/site/kmlroute/home/kml/Bus%2022%20Route.kml.xml?attredirects=0&d=1',
    map: map
  });

//Intended to show description of point to side - does not work
//Need to alter "featureData.description" to include est time of arrival and such
  bus27Route.addListener('click', function(kmlEvent) {
    var text = kmlEvent.featureData.description;
    showInContentWindow(text);
  });

  function showInContentWindow(text) {
    var sidediv = document.getElementById('content-window');
    sidediv.innerHTML = text;
  }

  // A kml layer needs 2 things - a kml file and a set of options
    // I selected a random kml file - but since I did not give a location for the
    // map in map options - the kml file better do this

    //var kmlUrl = 'https://www.google.com/maps/d/edit?mid=z6sSANoSrkWg.kSQOiF5m2sig';
   //var kmlOptions = { map: map};

    // Create the kmlLayer - and you are done
   // var kmlLayer = new google.maps.KmlLayer(kmlUrl, map);

  //Creates marker when clicked by user - NEED TO adjust to allow
    //click if marker is on route and then show distance/time til point
  map.addListener('click', function(e) {
  var marker = new google.maps.Marker({
    position: {lat: e.latLng.lat(), lng: e.latLng.lng()},
    map: map
  });
});
}


startUpdater();
