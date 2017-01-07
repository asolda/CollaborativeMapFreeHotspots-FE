//UPDATED FILE MAP
var lastPosNE, lastPosSW, lastCenter, markers = [];
var pins_info = [];
var user_position;
var mutex_new_pin = 0;

var map, pos;
var bounds;
var srcImage = 'https://golang.org/doc/gopher/appenginegophercolor.jpg';

function initMap() {
  var infoWindow = new google.maps.InfoWindow({
    map: map
  });
  //inizializzo la info windows dei marker
  var infowindowMarker = new google.maps.InfoWindow({
    content: '<h1>Loading</h1>' + '<p>Caricamentos</p>'
  });
var infowindowNewMarker = new google.maps.InfoWindow({
    content: '<h1>Loading</h1>' + '<p>Caricamentos</p>'
  });


  //var myLatLng = {lat: 41.060816, lng: 14.334157};


  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {
      lat: 42.516122,
      lng: 12.513889
    },
  });
  lastCenter = map.getCenter();
  // lastPosNE = map.getBounds().getNorthEast();
  //console.debug(map.getNorthEast());
  //lastCenter.lat() = 0;
  //lastCenter.lng() = 0;

  google.maps.event.addListenerOnce(map, 'tilesloaded', function () {

    lastPosNE = map.getBounds().getNorthEast();

    lastPosSW = map.getBounds().getSouthWest();

    lastCenter = map.getCenter();

    bounds = map.getBounds();
  });

  var infoWindow = new google.maps.InfoWindow({
    map: map
  });

  // Try HTML5 geolocation.

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {

      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      user_position = pos;


      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else { // Browser doesn't support Geolocation

    handleLocationError(false, infoWindow, map.getCenter());
  }


  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
  }
  console.debug(markers);

  loadMarkers(lastCenter.lat(), lastCenter.lng(), 0, 0);
  console.debug(markers);

  loadPins(map, markers, infowindowMarker);
  console.debug(markers);

  //aggiungo un nuovo pin con il click sulla mappa
  
  /*
google.maps.event.addListener(map,'click',function(event) {
        if(mutex_new_pin  == 0){
          mutex_new_pin = 1;
          addMarker(event.latLng, 'Click Generated Marker', map, infowindowNewMarker);
        }else{
          alert("Completa prima l' inserimento di un pin");
        } 
});
*/


  // evento che triggera ogni volta che vengono modificati gli estremi dell' area da visualizzare
  google.maps.event.addListener(map, 'bounds_changed', function () {
    //console.debug(map.getCenter().lat()+" "+map.getCenter().lng());
    var newPosNE = map.getBounds().getNorthEast();
    var newPosSW = map.getBounds().getSouthWest();
    bounds = map.getBounds();

    var center = map.getCenter();

    var d_lng = Math.abs(newPosNE.lng() - newPosSW.lng());
    var d_lat = Math.abs(newPosNE.lat() - newPosSW.lat());
    //var d_lng = Math.abs(lastPosNE.lng() - lastPosSW.lng());
    //var d_lat = Math.abs(lastPosNE.lat() - lastPosSW.lat());
    
    //console.debug("d_lng="+d_lng+", d_lat="+d_lat);
    
    d_lng /= 2;
    d_lat /= 2;
    
    

    //activation = Math.pow(d_lng, 2) + Math.pow(d_lat, 2);
    //activation = Math.sqrt(activation);

    //console.debug(lastPosNE +" " + lastPosSW);

    //console.debug(calcDistance(center.lat(), center.lng(), lastCenter.lat(), lastCenter.lng()))
    //l' if è vero solo se la distanza dall' ultimo centro di mappa dista più di 1 km da quello visualizzato
    //se vero aggiorna il nuovo centro
    
    //console.debug("cdlat="+Math.abs(lastCenter.lat() - center.lat())+",cdlng="+Math.abs(lastCenter.lng() - center.lng())+",d_lng="+d_lng+", d_lat="+d_lat);
    
    if(overflow_distance(lastCenter.lat(), lastCenter.lng(), center.lat(), center.lng(), d_lng, d_lat) || overflow_distance(lastPosNE.lat(), lastPosNE.lng(), newPosNE.lat(), newPosNE.lng(), d_lng, d_lat)){
    //if (calcDistance(center.lat(), center.lng(), lastCenter.lat(), lastCenter.lng()) > activation) {
      //console.debug(map.getBounds().getNorthEast() +" " + map.getBounds().getSouthWest());
      lng_diff = calcDistance(newPosNE.lat(), newPosNE.lng(), newPosNE.lat(), center.lng());
      lat_diff = calcDistance(newPosNE.lat(), newPosNE.lng(), center.lat(), newPosNE.lng());
      radius = Math.max(lng_diff, lat_diff);
      extreme = {
        lat: 0.0,
        lng: 0.0
      };
      if(radius == lng_diff){
        extreme.lat = center.lat();
        extreme.lng = newPosNE.lng();
      }
      if(radius == lat_diff){
        extreme.lat = newPosNE.lat();
        extreme.lng = center.lng();
      }
      console.debug(lastCenter.lat() + " " + lastCenter.lng() + " " + radius);
      lastPosNE = newPosNE;
      lastPosSW = newPosSW;
      lastCenter = center;


      //console.debug(markers);
      delete_pins();
      //console.debug(markers);


      loadMarkers(lastCenter.lat(), lastCenter.lng(), extreme.lat, extreme.lng);
      //console.debug(markers);

      loadPins(map, markers, infowindowMarker);
    }

    //console.debug(map.getBounds().getNorthEast() +" " + map.getBounds().getSouthWest());

  });

  bounds = map.getBounds();
        //google.maps.event.addDomListener(window, 'load', initMap);

        // The custom USGSOverlay object contains the USGS image,
        // the bounds of the image, and a reference to the map.
  overlay = new USGSOverlay(bounds, srcImage, map, null);

  //end func initMap
}



function overflow_distance(lat_center, lng_center, lat_new, lng_new, dlat, dlng){
    if ( Math.abs(lat_center - lat_new) > dlat || Math.abs(lng_center - lng_new) > dlng)
        return true;
    else
        return false;
}



function calcDistance(fromLat, fromLng, toLat, toLng) {

  return google.maps.geometry.spherical.computeDistanceBetween(

    new google.maps.LatLng(fromLat, fromLng), new google.maps.LatLng(toLat, toLng));

}


function bindInfoWindow(marker, map, infowindow, id) {
  marker.pin.addListener('click', function () {
    hideRads();
    //id has pin id
    //console.debug("1");
    
    var text;
  getPinInfo(id, function onclose(text){
    //console.debug(text[0].ssid);
    //overlay.setData(text[0]);
    overlay.toggleDOM(text[0]);
  });
      //console.debug(text);
       
  
    //infowindow.setContent(text);
    //infowindow.open(map, this);
    marker.rad.setMap(map);
  });
}
/*
function addMarker(latlng,title,map, infowindowNewMarker) {
    var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: title,
            draggable:true
    });
    google.maps.event.addListener(marker,'drag',function(event) {
        console.debug(this.position.lat()+" "+this.position.lng());
        //alert('drag');
    });

    google.maps.event.addListener(marker,'dragend',function(event) {
            console.debug(this.position.lat()+" "+this.position.lng());
            infowindowNewMarker.setContent("<h1>CIAO</h1>");
            infowindowNewMarker.open(map, this);
            //qui vanno completati i campi ed effettuata la richiesta del be
    });
    google.maps.event.addListener(marker,'click',function(event) {
            console.debug(this.position.lat()+" "+this.position.lng());
            infowindowNewMarker.setContent("<h1 onclick='query_insert_pin()'>CIAO</h1>");
            infowindowNewMarker.open(map, this);
            console.debug("My position "+user_position.lat+" "+user_position.lng);
            //qui vanno completati i campi ed effettuata la richiesta del be
    });
}
*/

/*
function query_insert_pin(){
inseriscipin(1,1,user_position.lat,user_position.lng,1,1,1,1,1);
}
*/
/*
//handler per il click sulla conferma di inserimento pin
document.getElementById('enterbtn-insertpin').addEventListener('click', function() {
				var ssid = document.forms["insertpin-form"]["p-ssid"].value;
        var qualita = document.forms["insertpin-form"]["p-qualita"].value;
        var latitudine = user_position.lat;
        var longitudine = user_position.lng;
        var necessita_login = document.forms["insertpin-form"]["p-necessita_login"].value;
        var restrizioni = document.forms["insertpin-form"]["p-restrizioni"].value;
        var altre_informazioni = document.forms["insertpin-form"]["p-altre_informazioni"].value;
        var range = document.forms["insertpin-form"]["p-range"].value;
        var utente = //da recuperare nella sessione
				inseriscipin(ssid,qualita,latitudine,longitudine,necessita_login,restrizioni,altre_informazioni,range,utente); 
	    });
*/

function loadPins(map, markers, infowindowMarker) {
  for (var pin in markers) {
    var marker = new google.maps.Marker({
      position: markers[pin].position,
      map: map,
      title: markers[pin].title,
      icon: markers[pin].icon
    });
    var pinRadius = new google.maps.Circle({
      strokeColor: '#1b85b8',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#1b85b8',
      fillOpacity: 0.35,
      map: map,
      center: markers[pin].position,
      radius: markers[pin].radius
    });
    pin_info = { pin: marker, rad: pinRadius };
    bindInfoWindow(pin_info, map, infowindowMarker, markers[pin].id);
    pins_info.push(pin_info)
  }
  hideRads();
}

function delete_pins() {
  deleteMarkers();
}

function hideRads() {
  for (var i = 0; i < pins_info.length; i++) {
    pins_info[i].rad.setMap(null);
  }
}

function setMapOnAll(map) {
  for (var i = 0; i < pins_info.length; i++) {
    pins_info[i].pin.setMap(map);
    pins_info[i].rad.setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  pins_info = [];
  pins_info = [];
  markers = [];
}


function loadMarkers(lat, lng, rad_lat, rad_lng) {
  //function loadMarkers(lat, lng, radius) {

//funzione per caricare i markers da be
var image = 'http://marcoaprea.altervista.org/Goopher/golang-logo2.png';

var url_request = 'http://127.0.0.1:8080/pin/get_networks/'+lat+'/'+lng+'/'+rad_lat+'/'+rad_lng;
$.ajax({
    type: 'GET',
    url: url_request,
    async: false,
    crossDomain: true,
            xhrFields: {
             withCredentials: true
           },
    success: function(data) {
      //var data_from_back = jQuery.parseJSON(data);
      //console.debug(data);
      $.each(data, function(idx, pin){
      //console.debug(data);
      var mark = {
        position: {
          lat: pin.latitudine,
          lng: pin.longitudine
        },
        map: map,
        icon: image,
        id: pin.id,
        radius: 100
      };
      
      markers.push(mark);
   });
    },
    error: function(xhr, status, error) {
      console.log('Error: ' + error.message);
    }
  });
  
  //fine funzione per caricare i markers da be
  
  /*
  var markers = {
    mark1: {
      position: {
        lat: 41.060816,
        lng: 14.334157

      },
      map: map,
      title: 'Hello World!',
      icon: image,
      description: "<h1>Potato1</h1>",
      radius: 100
    },
    mark2: {
      position: {
        lat: 41.062675,
        lng: 14.335943
      },
      map: map,
      title: 'Hello World!',
      icon: image,
      description: "<h1>Potato2</h1>",
      radius: 30
    },
    mark3: {
      position: {
        lat: 41.063015,
        lng: 14.333100
      },
      map: map,
      title: 'Hello World!',
      icon: image,
      description: "<h1>Potato3</h1>",
      radius: 70
    },
    mark4: {
      position: {
        lat: 41.060078,
        lng: 14.336319
      },
      map: map,
      title: 'Hello World!',
      icon: image,
      description: "<h1>Potato4</h1>",
      radius: 20
    }
  };
  */
  
}

