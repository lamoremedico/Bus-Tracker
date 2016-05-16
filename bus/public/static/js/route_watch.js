var stops = [
  {address: "4565 Lanercost Way" , lat: 83.007932, lon: 40.052394},
  {},
  {},
  {}
]; //To be filled with all stops


function startUpdater(){
  setInterval(function(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", window.location.origin + "/get_bus22_position", true);
    xhttp.send();



    setTimeout(function(){
      var text = xhttp.responseText;
      var busposition
//      console.log(text)
      if (text !== ''){
        busposition = JSON.parse(text)
//                console.log(position)
//                console.log(position.lat + " " + position.lon)

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


        document.getElementById('bus_22_info').innerHTML = '<p>The Bus is currently at a latitude of ' + busposition.lat + '˚ and a longitude of ' + busposition.lon + '˚.<br>It will arrive at the next stop, 2415 Sandover Rd, in approximately 3 minutes</p>';
        //This is currently a placeholder ^ for variables that will later display any needed address
        initMap(busposition.lat, busposition.lon)
        getETA(busposition, stops[0])

    },10)

  },10000)
}



function getETA(busloc, point2){


  var origin = new google.maps.LatLng(busloc.lat, busloc.lon);
  var destination = new google.maps.LatLng(point2.lat, point2.lon);
  //var origin = new google.maps.LatLng(40.4320203, 83.4059503);
  //var destination = new google.maps.LatLng(40.39204, 83.029102);
  
  var service = new google.maps.DistanceMatrixService();
  console.log(origin + " " + destination);
  
    //Beginning of Google Code
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        avoidHighways: false,
        avoidTolls: false
      }, 
      callback);
  }


  function callback(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    } else {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
      var outputDiv = document.getElementById('outputDiv');
      outputDiv.innerHTML = '';

      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        console.log(results.distance)
        for (var j = 0; j < results.length; j++) {
          outputDiv.innerHTML += origins[i] + " to " + destinations[j]
              + ": " + results[j].distance + " in "
              + results[j].duration + "<br />"; //UNDEF results distance and duration both UNDEFINED???
        console.log(results[j].distance + " in "
              + results[j].duration);
        }
      }
    }
  }

    //GOOGLE CODE STOPS HERE
/*
  service.getDistanceMatrix(
      {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
         avoidHighways: false,
          avoidTolls: false
      }, 
      callback
  );

  function callback(response, status) {
      var orig = document.getElementById("orig"),
          dest = document.getElementById("dest"),
         dist = document.getElementById("dist");

     if(status=="OK") {
         orig.innerHTML = "Next Bus Stop Coordinates: " + response.destinationAddresses[0];
         dest.innerHTML = "Bus Current Location: " + response.originAddresses[0];
         dist.innerHTML = response.rows[0].elements[0].distance.text;
     } else {
         alert("Error: " + status);
      }
  }
}
*/

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
