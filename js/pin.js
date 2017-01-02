//funzione per inserire un pin 
function inseriscipin(ssid,qualita,latitudine,longitudine,necessita_login,restrizioni,altre_informazioni,range,utente){
    if(ssid == null || ssid.length==0){
             //codice per mostrare a frontend l'errore ERROR_SSID
        }else if(qualita <= 0 || qualita > 5){
            //codice per mostrare a frontend l'errore ERROR_QUALITY
        }else if(isNaN(necessita_login) || necessita_login < 0 || necessita_login > 1){
            //codice per mostrare a frontend l'errore ERROR_LOGIN_NECESSARY
        }else if(isNaN(range) || range <= 0){
            //codice per mostrare a frontend l'errore ERROR_RANGE
        }else if(isNaN(latitudine)){
            //codice per mostrare a frontend l'errore ERROR_LATITUDE
        }else if(isNaN(longitudine)){
            //codice per mostrare a frontend l'errore ERROR_LONGITUDE
        }else{
             $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:8080/pin/new/',
                data: "ssid="+ssid+"&qualità="+qualita+"&latitudine="+latitudine+"&longitudine="+longitudine+"&necessità_login="+necessita_login+"&restrizioni="+restrizioni+"&altre_informazioni="+altre_informazioni+"&range="+range+"&utente="+utente, 
                contentType: "application/x-www-form-urlencoded",
                success: function(data) {
                  try {
                    var ret = data;
                    if(ret.status==0){
                        $('#result').append(ret.message + '</br>');
                    }else if(ret.status==1){
                        $('#result').append(ret.message + '</br>');
                            if(ret.message.equals("ERROR_DB")){
                                    //codice per mostrare a frontend l'errore ERROR_DB
                            }else if(ret.message.equals("ERROR_SSID")){
                                    //codice per mostrare a frontend l'errore ERROR_SSID
                            }else if(ret.message.equals("ERROR_PASSWORD")){
                                    //codice per mostrare a frontend l'errore ERROR_PASSWORD
                            }else if(ret.message.equals("ERROR_QUALITY")){
                                    //codice per mostrare a frontend l'errore ERROR_QUALITY
                            }else if(ret.message.equals("ERROR_LOGIN_NECESSARY")){
                                    //codice per mostrare a frontend l'errore ERROR_LOGIN_NECESSARY
                            }else if(ret.message.equals("ERROR_RANGE")){
                                    //codice per mostrare a frontend l'errore ERROR_RANGE
                            }else if(ret.message.equals("ERROR_LATITUDE")){
                                    //codice per mostrare a frontend l'errore ERROR_LATITUDE
                            }else if(ret.message.equals("ERROR_LONGITUDE")){
                                    //codice per mostrare a frontend l'errore ERROR_LONGITUDE
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
    
//funzione per  le informazioni di un pin    
function getpininfo(id){
    if(isNaN(id)){
     //codice per mostrare a frontend l'errore ERROR_DB   
    } 
    else{
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:8080/getinfo/'+id,
            success: function(data) {
                try {
                  var ret = data;
                  if(ret.status==0){
                            //richiama function scritta dal FE      
                  }else if(ret.status==1){
                            //codice per mostrare a frontend l'errore ERROR_DB
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
                            if(ret.message.equals("ERROR_DB")){
                                     //codice per mostrare a frontend l'errore ERROR_DB
                            }else if(ret.message.equals("ERROR_IS_NOT_OWNER")){
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