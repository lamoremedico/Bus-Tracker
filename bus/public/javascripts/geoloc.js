//Geo Location for busdriver page

var timerId = "";
var topoutput = document.getElementById("out");
console.log("GEOLOC Running");
geoFindMe();
startLocating();

function startLocating() {
  timerId = setInterval(geoFindMe, 5000);
  console.log("Beginning Loop!")
}

function stopLocating() {
  clearTimeout(timerId);
  topoutput.innerHTML = "<p>Tracking stopped. To resume please click below</p>"

}



function success(position) {
  var latitude  = position.coords.latitude;
  var longitude = position.coords.longitude;
  var myLatLng = {lat: latitude, lng: longitude};

  sendCoordinates(latitude,longitude)

  topoutput.innerHTML = '<p>You are successfully being tracked! Your location will continue to update every 5 seconds.<br> Current Latitude: ' + latitude + '° <br>Current Longitude: ' + longitude + '°</p>';

  var map = new google.maps.Map(document.getElementById('bus_22_map'), {
    center: myLatLng,
    scrollwheel: false,
    zoom: 14
  });

  var busmarker = new google.maps.Marker({
    position: myLatLng,
    icon: '/images/superminibus.png'
  });
  busmarker.setMap(map);

  var infowindow = new google.maps.InfoWindow({
    content:"The Bus Driver is here!"
  });

  infowindow.open(map,busmarker);

  //var img = new Image();
  //img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

  //output.appendChild(img);
};

function error(err) {
  console.log(err);
  topoutput.innerHTML = "ERROR RETRIEVING LOCATION";
};

function geoFindMe() {
  topoutput = document.getElementById("out");
  console.log("geoFindMe running");

  if (!navigator.geolocation){
    topoutput.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }


  var geo_options = {
    enableHighAccuracy: true,
    maximumAge        : 30000,
    timeout           : 27000
  };

  topoutput.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
  //var geoId = navigator.geolocation.watchPosition(success, error, geo_options);
}

//geoFindMe();


function sendCoordinates(lat, lon){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", window.location.origin + "/driver/save_position", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send('lat=' + lat + '&lon=' + lon);
}
