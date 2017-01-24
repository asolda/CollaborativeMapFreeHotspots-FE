var lastCenterNE, lastCenterSW, lastCenter, markers = [], map, pos, current_pin_id, current_pin_can_rank, mod_insert_pin=false, current_pin_can_only_select=false, forceRefresh=false;
var pins_info = []; var overlay=null; var user;
var map_loaded=false;
var mutex_new_pin = 0;
var new_pin_position;
var new_marker;

/** Oggetto/funzione che restituisce il colore in base al
/** valore (segnalazioni) ricevute come parametro
/** 0 - 3 -> green;
/** 4 - 7 -> yellow;
/** >8 -> red **/
var pinColor = {
    green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    yellow: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    red: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
}
pinColor.getColor = function(val){
    if(val <= 3){
        return this.green;
    }else if(val <= 7){
        return this.yellow;
    }
    return this.red;
}

var valutazione;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: {
            lat: 42.516122,
            lng: 12.513889
        },
    });
    lastCenter = map.getCenter();
    //console.log('Posizione default: '+lastCenter.lat() + " "+lastCenter.lng());
    
    google.maps.event.addListener(map, 'tilesloaded', function() {
        lastCenterNE = map.getBounds().getNorthEast();
        lastCenterSW = map.getBounds().getSouthWest();
    });
    
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            var infoWindow = new google.maps.InfoWindow({
                map: map
            });
            
            infoWindow.setPosition(pos);
            infoWindow.setContent('Tu sei qui');
            //console.log('New position: '+pos.lat + " " + pos.lng);
            map.setCenter(pos);
            
            console.log("MAP GETBOUNDS: "+JSON.stringify(map.getBounds()));
            
            //console.log('lastCenterNE: ' +lastCenterNE.lat() + " " + lastCenterNE.lng());
            
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else { // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    
    loadMarkers(lastCenter.lat(), lastCenter.lng(), 0, 0);
    //console.debug(markers);
    //loadPins(map, markers);
    //console.debug(markers);
    
    // evento che triggera ogni volta che vengono modificati gli estremi dell' area da visualizzare
    google.maps.event.addListener(map, 'bounds_changed', function () {
        if(!map_loaded){
            overlay = new USGSOverlay(map.getBounds(), map);
            lastCenter = map.getCenter();
            lastCenterNE = map.getBounds().getNorthEast();
            lastCenterSW = map.getBounds().getSouthWest();
        }
        //$('.pin-detail-container').css('visibility','hidden');
        
        var newPosNE = map.getBounds().getNorthEast();
        var newPosSW = map.getBounds().getSouthWest();
        
        
        var center = map.getCenter();
        
        var d_lng = Math.abs(newPosNE.lng() - newPosSW.lng());
        var d_lat = Math.abs(newPosNE.lat() - newPosSW.lat());
        //var d_lng = Math.abs(lastCenterNE.lng() - lastCenterSW.lng());
        //var d_lat = Math.abs(lastCenterNE.lat() - lastCenterSW.lat());
        
        //console.debug("d_lng="+d_lng+", d_lat="+d_lat);
        
        d_lng /= 2;
        d_lat /= 2;
        
        
        
        //activation = Math.pow(d_lng, 2) + Math.pow(d_lat, 2);
        //activation = Math.sqrt(activation);
        
        //console.debug(lastCenterNE +" " + lastCenterSW);
        
        //console.debug(calcDistance(center.lat(), center.lng(), lastCenter.lat(), lastCenter.lng()))
        //l' if è vero solo se la distanza dall' ultimo centro di mappa dista più di 1 km da quello visualizzato
        //se vero aggiorna il nuovo centro
        
        //console.debug("cdlat="+Math.abs(lastCenter.lat() - center.lat())+",cdlng="+Math.abs(lastCenter.lng() - center.lng())+",d_lng="+d_lng+", d_lat="+d_lat);
        
        if(overflow_distance(lastCenter.lat(), lastCenter.lng(), center.lat(), center.lng(), d_lng, d_lat) || overflow_distance(lastCenterNE.lat(), lastCenterNE.lng(), newPosNE.lat(), newPosNE.lng(), d_lng, d_lat) || !map_loaded || forceRefresh){
            if(forceRefresh){console.log("lol");forceRefresh=false;}
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
            lastCenterNE = newPosNE;
            lastCenterSW = newPosSW;
            lastCenter = center;
            
            loadMarkers(lastCenter.lat(), lastCenter.lng(), extreme.lat, extreme.lng);
        }
        
        map_loaded=true;
    });
    
}  //end func initMap



function overflow_distance(lat_center, lng_center, lat_new, lng_new, dlat, dlng){
    return ( Math.abs(lat_center - lat_new) > dlat || Math.abs(lng_center - lng_new) > dlng);
}



function calcDistance(fromLat, fromLng, toLat, toLng) {
    return google.maps.geometry.spherical.computeDistanceBetween(
    new google.maps.LatLng(fromLat, fromLng), new google.maps.LatLng(toLat, toLng)
    );
}


function popolateOverlay(marker,data){
    
    //cambia il nome
    $('.pin-detail-title .mdl-dialog__sub').text(data.ssid);
    
    //cambia le restrizioni
    $('#dett_restrizioni').text(data.restrizioni);
    //cambia il range
    $('#dett_range').text(data.range_wifi);
    
    //cambia login necessario
    if(data.necessità_login == 0){
        a = 'No';
    }else{
        a = 'Si'
    }
    $('#dett_login-necessario').text(a);
    //cambia altre info
    $('#dett_altreinfo').text(data.altre_informazioni);
    createPinDetailMenu(data);
    //inizializza valutazione
    valutazione = inizializzaValutazione('#wifi-quality',data.qualità);
    
    $('.pin-detail-container').css('visibility','visible');
}


/**
function vota(voto){
pinranking(current_pin_id, voto, function(status_ok, data){
if(status_ok){
showSnackbar({message: 'Valutazione effettuata con successo.'});
}else{
if(strcmp(data,"ERROR_SESSION_NOT_FOUND")==0){
showSnackbar({message: 'Errore: devi effettuare l\'accesso.'});
}else if(strcmp(data,"ERROR_RANKING")==0){
showSnackbar({message: 'Errore nel ranking.'});
}else if(strcmp(data,"ERROR_RANKING_ALREADY_DONE")==0){
showSnackbar({message: 'Errore: hai già valutato questa rete.'});
}else if(strcmp(data,"ERROR_DB")==0){
showSnackbar({message: 'ERROR_DB'});
}else if(strcmp(data,"ERROR_IS_OWNER")==0){
showSnackbar({message: 'Errore: non sei il proprietario di questa rete!'});
}
}
});
}
**/


/**
function delete_pins() {
deleteMarkers();
}
**/
function hideRads() {
    for (var i = 0; i < pins_info.length; i++) {
        pins_info[i].rad.setMap(null);
    }
}
function deleteAllPins(callback) {
    for (var i = 0; i < pins_info.length; i++) {
        pins_info[i].pin.setMap(null);
        pins_info[i]=null;
    }
    pins_info.length=0;
    callback();
}

function loadMarkers(lat, lng, rad_lat, rad_lng) {
    var url_request = 'http://127.0.0.1:8080/pin/get_networks/'+lat+'/'+lng+'/'+rad_lat+'/'+rad_lng;
    //console.log("called");
    $.ajax({
        type: 'GET',
        url: url_request,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            deleteAllPins(function(){
                $.each(data, function(idx, pin){
                    //console.log(pin);
                    var marker = new google.maps.Marker({
                        position: { lat: pin.latitudine, lng: pin.longitudine },
                        map: map,
                        icon: pinColor.getColor(pin.numero_segnalazioni), //attribuisce il colore del pin in base al numero di segnalazioni
                        id: pin.id,
                        nsegnalazioni: pin.numero_segnalazioni,
                    });
                    
                    marker.addListener('click', function () {
                        getPinInfo(marker.id,function(data){
                            data.id = marker.id;
                            console.log('set data: '+data.id);
                            current_pin_id = data.id;
                            overlay.setBounds(marker);
                            popolateOverlay(marker,data);
                        });
                    });
                    
                    var pinRadius = new google.maps.Circle({
                        strokeColor: '#1b85b8',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#1b85b8',
                        fillOpacity: 0.0,
                        map: null,
                        center: { lat: pin.latitudine, lng: pin.longitudine },
                        radius: pin.range_wifi
                    });
                    
                    pins_info.push({ pin: marker, rad: pinRadius });
                });
            });
        },
        error: function(xhr, status, error) {
            console.log('Error: ' + error.message);
        }
    });
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
}

USGSOverlay.prototype = new google.maps.OverlayView();

/** @constructor */
function USGSOverlay(bounds, map) {
    
    // Initialize all properties.
    this.bounds_ = bounds;
    this.map_ = map;
    
    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;
    
    // Explicitly call setMap on this overlay.
    this.setMap(map);
}

USGSOverlay.prototype.setBounds = function(){
    this.draw();
}

/**
* onAdd is called when the map's panes are ready and the overlay has been
* added to the map.
*/
USGSOverlay.prototype.onAdd = function(data) {
    
    // Create the img element and attach it to the div.
    var finestra_dett = document.createElement('div');
    finestra_dett.className = 'pin-detail-container';
    finestra_dett.style.width = '400px';
    finestra_dett.style.height = '500px;';
    finestra_dett.style.cursor = 'pointer';
    finestra_dett.style.position = 'absolute';
    
    var pindetail =
    "<div class='pin-detail-title'>"+
    "<div id='close-pin-detail'><i class='material-icons'>close</i></div>"+
    "<h4 class='mdl-dialog__title'><i id='mdl-title-icon' class='material-icons'>info</i>Dettagli rete Wi-Fi</h4>"+
    "<p class='mdl-dialog__sub'>Rete1</p>" +
    "</div>"+
    "<div class='pin-detail-info'>"+
    "<div id='wifi-quality' class='pin-detail-star'>"+
    
    "<ul>"+
    
    "<li class='star-val'>"+
    "<button id='star1' class='mdl-button mdl-js-button mdl-button--icon'><i id='1' class='material-icons'>star_rate</i></button>"+
    "</li>"+
    
    "<li class='star-val'>"+
    "<button id='star2' class='mdl-button mdl-js-button mdl-button--icon star-selected'><i id='2' class='material-icons'>star_rate</i></button>"+
    "</li>"+
    
    "<li class='star-val'>"+
    "<button id='star3' class='mdl-button mdl-js-button mdl-button--icon'><i id='3' class='material-icons'>star_rate</i></button>"+
    "</li>"+
    
    "<li class='star-val'>"+
    "<button id='star4' class='mdl-button mdl-js-button mdl-button--icon'><i id='4' class='material-icons'>star_rate</i></button>"+
    "</li>"+
    
    "<li class='star-val'>"+
    "<button id='star5' class='mdl-button mdl-js-button mdl-button--icon'><i id='5' class='material-icons'>star_rate</i></button>"+
    "</li>"+
    
    "</ul>"+
    "<input value='0' style='visibility:hidden;'>"+
    "</div>"+
    
    "<div style='clear:both;'><p>Restrizioni: <span id='dett_restrizioni'></span</p>"+
    "<p>Range: <span id='dett_range'></span></p>"+
    "<p>Login Necessario: <span id='dett_login-necessario'></span></p>"+
    "<p>Altre informazioni: <span id='dett_altreinfo'></span></p></div>"+
    
    '<div id="pin-detail-action">' +
    '<button id="pin-detail-edit" type="button" class="buttonInfo mdl-button mdl-js-button mdl-js-ripple-effect dialog-close">Modifica</button>' +
    '<button id="pin-detail-delete" type="button" class=" buttonInfo mdl-button mdl-js-button mdl-js-ripple-effect dialog-close">Elimina</button>' +
    '<button id="pin-detail-report" type="button" class="buttonInfo mdl-button mdl-js-button mdl-js-ripple-effect dialog-close">Segnala</button>' +
    '</div>' +
    "</div>";
    
    
    finestra_dett.innerHTML= pindetail;
    
    
    
    this.div_ = finestra_dett;
    
    
    // Add the element to the "overlayLayer" pane.
    var panes = this.getPanes();
    panes.overlayImage.appendChild(finestra_dett);
    $('#close-pin-detail').click(function(){
        $('.pin-detail-container').css('visibility','hidden');
    });
};

//function to draw the overlay
USGSOverlay.prototype.draw = function() {
    // We use the south-west and north-east
    // coordinates of the overlay to peg it to the correct position and size.
    // To do this, we need to retrieve the projection from the overlay.
    var overlayProjection_loc = this.getProjection();
    
    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    var sw1 = overlayProjection_loc.fromLatLngToDivPixel(map.getBounds().getSouthWest());
    var ne1 = overlayProjection_loc.fromLatLngToDivPixel(map.getBounds().getNorthEast());
    
    // Resize the image's div to fit the indicated dimensions.
    var div_to_change = this.div_;
    div_to_change.style.position = 'relative';
    
    div_to_change.style.left = sw1.x +100+ 'px';
    div_to_change.style.top = ne1.y +100+ 'px';
};

// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
USGSOverlay.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
};

USGSOverlay.prototype.toggle = function() {
    if (this.div_) {
        if (this.div_.style.visibility === 'hidden') {
            this.show();
        } else {
            this.hide();
        }
    }
};

USGSOverlay.prototype.toggleDOM = function() {
    if (this.getMap()) {
        // Note: setMap(null) calls OverlayView.onRemove()
        this.setMap(null);
    } else {
        this.setMap(this.map_);
    }
};
google.maps.event.addDomListener(window, 'load', initMap);

function createPinDetailMenu(marker){
    /** L'utente non è loggato. Nessun menu **/
    if(!user_id){ console.log('utente non loggato');
        
        current_pin_can_rank=false;
        $('#pin-detail-action').hide(); //nasconde il div action che contiene il menu
        return;
        
    }else if(marker.utente == user_id){ //utente proprietario della rete
        current_pin_can_rank=false;
        /** Mostra il contenitore del menu, i tasti Modifica e Elimina rete
        /** Associa i listener per chiamare le relative funzioni
        **/ console.log('Utente Loggato, proprietario');
        $('#pin-detail-report').hide();
        $(
        '#pin-detail-action,#pin-detail-edit,#pin-detail-delete'
        ).show();
        
        ListenersHandler.addListener('pin-detail-delete', 'click', function(){
            console.log(marker);
            $('#dialog-deletewifi').attr('data', JSON.stringify(marker) );
            deleteModal = inizializzaCancellaRete(jQuery.parseJSON($('#dialog-deletewifi').attr('data')));
            deleteModal.showModal();
        });
        
        ListenersHandler.addListener('pin-detail-edit', 'click', function(){
            $('#dialog-editwifi').attr('data', JSON.stringify(marker) );
            editModal = inizializzaModificaRete(jQuery.parseJSON($('#dialog-editwifi').attr('data')));
            editModal.showModal();
        });
        
        return;
    }
    
    /** Utente loggato non proprietario della rete
    /** Mostra il contenitore del menu, i tasti Modifica e Elimina rete
    /** Associa i listener per chiamare le relative funzioni
    **/ console.log('Utente loggato ('+ marker.utente +'), non proprietario');
    current_pin_can_rank=true;
    
    $('#pin-detail-edit,#pin-detail-delete').hide();
    $('#pin-detail-action, #pin-detail-report').show();
    
    ListenersHandler.addListener('pin-detail-report', 'click', function(){
        $('#dialog-report').attr( 'data' , JSON.stringify(marker) );
        reportModal = inizializzaSegnalazione();
        reportModal.showModal();
    } );
    
    
    
}
