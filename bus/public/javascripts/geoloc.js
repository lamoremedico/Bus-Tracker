//Geo Location for busdriver page
/*var express = require('express');
var router = express.Router();

var cookieParser = require('cookie-parser')
 
var app = express()

app.use(cookieParser())
*/
console.log("Works");
geoFindMe();
var timerId = setInterval(geoFindMe, 5000);


function geoFindMe() {
  var output = document.getElementById("out");
  console.log("hello");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    var myLatLng = {lat: latitude, lng: longitude};

    output.innerHTML = '<p>You are successfully being tracked! Your location will continue to update every 5 seconds.<br> Current Latitude: ' + latitude + '° <br>Current Longitude: ' + longitude + '°</p>';


    var map = new google.maps.Map(document.getElementById('bus_22_map'), {
    center: myLatLng,
    scrollwheel: false,
    zoom: 12
  });

    var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
    title: 'Bus Driver Location'
  });
  var infowindow = new google.maps.InfoWindow({
  content:"The Bus Driver is here!"
  });

infowindow.open(map,marker);

    //var img = new Image();
    //img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    //output.appendChild(img);
  };

  function error(err) {
    console.log(err);
    output.innerHTML = "ERROR RETRIEVING LOCATION";
  };

  var geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 30000, 
  timeout           : 27000
};

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
  //var geoId = navigator.geolocation.watchPosition(success, error, geo_options);
}

//geoFindMe();