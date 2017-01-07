//funzione per inserire un pin 
function inseriscipin(ssid,qualita,latitudine,longitudine,necessita_login,restrizioni,altre_informazioni,range,onclose){
    if(ssid == null || ssid.length==0){
        onclose(false, 'ERROR_SSID');
    }else if(qualita <= 0 || qualita > 5){
        onclose(false, 'ERROR_QUALITY');
    }else if(isNaN(necessita_login) || necessita_login < 0 || necessita_login > 1){
        onclose(false, 'ERROR_INVALID_DATA');
    }else if(isNaN(range) || range <= 0){
        onclose(false, 'ERROR_INVALID_DATA');
    }else if(isNaN(latitudine)){
        onclose(false, 'ERROR_INVALID_DATA');
    }else if(isNaN(longitudine)){
        onclose(false, 'ERROR_INVALID_DATA');
    }else{
            $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:8080/pin/new/',
                data: "ssid="+ssid+"&qualit�="+qualita+"&latitudine="+latitudine+"&longitudine="+longitudine+"&necessit�_login="+necessita_login+"&restrizioni="+restrizioni+"&altre_informazioni="+altre_informazioni+"&range="+range,
                contentType: "application/x-www-form-urlencoded",
                crossDomain: true,
                xhrFields: {
                 withCredentials: true
               },
                success: function(data) {
                  try {
                    var ret = data;
                    if(ret.status==0){
                        onclose(true, 'INSERT_OK');
                    }else if(ret.status==1){
                        $('#result').append(ret.message + '</br>');
                            if(strcmp(ret.message,"ERROR_DB")==0){
                                onclose(false, 'ERROR_DB');
                            }else if(strcmp(ret.message,"ERROR_SSID")==0){
                                onclose(false, 'ERROR_SSID');
                            }else if(strcmp(ret.message,"ERROR_QUALITY")==0){
                                onclose(false, 'ERROR_QUALITY');
                            }else if(strcmp(ret.message,"ERROR_LOGIN_NECESSARY")==0){
                                onclose(false, 'ERROR_INVALID_DATA');
                            }else if(strcmp(ret.message,"ERROR_RANGE")==0){
                                onclose(false, 'ERROR_INVALID_DATA');
                            }else if(strcmp(ret.message,"ERROR_LATITUDE")==0){
                                onclose(false, 'ERROR_INVALID_DATA');
                            }else if(strcmp(ret.message,"ERROR_LONGITUDE")==0){
                                onclose(false, 'ERROR_INVALID_DATA');
                            }
                    }
                    
                  } catch (err) {
                    alert('Errore imprevisto: ' + ret.message);
                  }
                },
                error: function(xhr, status, error) {
                  console.log('Error: ' + error.message);
                }
            });
        }  
    }
    
//funzione per visualizzazione le informazioni di un pin    
function getPinInfo(pin_id, onclose){
    if(isNaN(pin_id)){
     //codice per mostrare a frontend l'errore ERROR_DB   
    } 
    else{
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:8080/pin/getPinInfo/'+pin_id,
            crossDomain: true,
                xhrFields: {
                 withCredentials: true
               },
            success: function(data) {
              try {
                var ret = data;
                console.debug(ret);
                if(ret.status==0){
                    //$('#result').append(ret.message + '</br>');
                    //console.debug(ret.message);
                    onclose(ret.message);
                //return ret.message; //se ok, restituisce le info del pin
                }else if(ret.status==1){
                    //$('#result').append(ret.message + '</br>'); //errore
                }                
                
              } catch (err) {
                //alert('Errore nella visualizzazione delle info del pin: ' + ret.message);
              }
            },
            error: function(xhr, status, error) {
              console.log('Error: ' + error.message);
            }
          });
         }

//funzione per eliminare un pin 
function deletepin(rete_wifi,utente){   
         $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:8080/pin/delete/',
                data: "rete_wifi="+rete_wifi+"&utente="+utente, 
                contentType: "application/x-www-form-urlencoded",
                success: function(data) {
                  try {
                    var ret = data; 
                    if(ret.status==0){
                        $('#result').append(ret.message + '</br>');
                    }else if(ret.status==1){
                        $('#result').append(ret.message + '</br>'); 
                            if(strcmp(ret.message,"ERROR_DB")==0){
                                     //codice per mostrare a frontend l'errore ERROR_DB
                            }else if(strcmp(ret.message,"ERROR_IS_NOT_OWNER")==0){
                                    //codice per mostrare a frontend l'errore ERROR_IS_NOT_OWNER
                            }        
                      }
                    } catch (err) {
                    alert('Errore imprevisto: ' + ret.message);
                  }
                },
                error: function(xhr, status, error) {
                  console.log('Error: ' + error.message);
                }
              });
}

//funzione per valutare un pin 
function pinranking(voto,utente,rete_wifi){
        if(isNaN(voto) || voto <= 0 || voto > 5){
            //codice per mostrare a frontend l'errore ERROR_RANKING
        }else{
             $.ajax({
                 type: 'POST',
                 url: 'http://127.0.0.1:8080/pin/rank/',
                 data: "voto="+voto+"&utente="+utente+"&rete_wifi="+rete_wifi, 
                 contentType: "application/x-www-form-urlencoded",
                 success: function(data) {
                     try {
                         var ret = data;
                                        console.log("ret="+ret.message);
                         if(ret.status==0){
                                  $('#result').append(ret.message + '</br>');
                         }else if(ret.status==1){
                                  $('#result').append(ret.message + '</br>'); 
                                    if(strcmp(ret.message,"ERROR_DB")==0){
                                                ////codice per mostrare a frontend l'errore ERROR_DB
                                    }else if(strcmp(ret.message,"ERROR_RANKING")==0){
                                                //codice per mostrare a frontend l'errore ERROR_RANKING
                                    }        
                                  }
                                } catch (err) {
                                alert('Errore imprevisto: ' + ret.message);
                              }
                            },
                            error: function(xhr, status, error) {
                              console.log('Error: ' + error.message);
                            }
                          });
                          }   
}                          
}