function startUpdater(){
  setInterval(function(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:3001/info", true);
    xhttp.send();
    setTimeout(function(){
      var text = xhttp.responseText;
      var point = JSON.parse(text)
      document.getElementById('bus_1_info').innerHTML = 'lon: ' + point.point[0] + ' - lat: ' + point.point[1];
    },10)
  },2000)
}


startUpdater()
