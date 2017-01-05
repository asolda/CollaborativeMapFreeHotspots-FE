//funzione per la validazione della email
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//funzione per la validazione della password
function validatePassword(password){
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(password);
}


//funzione per la prima parte della reimpostazione della password
function resetpassword(email){
        if( email.length==0 || email==null){
           //codice per mostrare a frontend l'errore CAMPO VUOTO
        }else if(!validateEmail(email)){
           //codice per mostrare a frontend l'errore EMAIL INVALIDA
        }
        else { 
            $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8080/user/reset_password/request/',
            data: "email="+email+"&frontend_url="+window.location.href, 
            contentType: "application/x-www-form-urlencoded",
            success: function(data) {
              try {
                var ret = data;
                if(ret.status==0){
                    $('#result').append(ret.message + '</br>'); //EMAIL_OK visualizzare il modal "ci siamo quasi"
                }else if(ret.status==1){
                    $('#result').append(ret.message + '</br>');
                        if(strcmp(ret.message,"ERROR_EMAIL")==0){
                                //codice per mostrare a frontend l'errore ERROR_EMAIL
                        }else if(strcmp(ret.message,"ERROR_DB")==0){
                                //codice per mostrare a frontend l'errore ERROR_DB
                        }else if(strcmp(ret.message,"ERROR_EMAIL_NOT_FOUND")==0){
                                //codice per mostrare a frontend l'errore ERROR_EMAIL_NOT_FOUND
                        }
                    }
                
               } catch (err) {
                 alert('Errore nel recupero: ' + ret.message);
               }
            },
            error: function(xhr, status, error) {
               console.log('Error: ' + error.message);
            }
          });
         }
        }


//funzione per la seconda parte della reimpostazione della password
function resetpassword2(password,conf_password){
       if(password == null || password.length==0 || !validatePassword(password)){
            //codice per mostrare a frontend l'errore PASSWORD INVALIDA
        }else if(password.length<8){
            //codice per mostrare a frontend l'errore LUNGHEZZA INVALIDA
        }else if(strcmp(passwrod,conf_password)==0){    
            //codice per mostrare a frontend l'errore CAMPI DIVERSI
        }else{
            var token= getParameter("token");
            if(token!=null){
                $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:8080/user/reset_password/do/',
                data: "token="+token+"&password="+password, 
                contentType: "application/x-www-form-urlencoded",
                success: function(data) {
                  try {
                    var ret = data;
                    if(ret.status==0){
                        $('#result').append(ret.message + '</br>');
                    }else if(ret.status==1){
                        $('#result').append(ret.message + '</br>');
                            if(strcmp(ret.message,"ERROR_TOKEN")==0){
                                    //ERROR_TOKEN  
                            }else if(strcmp(ret.message,"ERROR_DB")==0){
                                    //codice per mostrare a frontend l'errore ERROR_DB
                            }else if(rstrcmp(ret.message,"ERROR_PASSWORD")==0){
                                    //codice per mostrare a frontend l'errore ERROR_PASSWORD
                            }else if(strcmp(ret.message,"ERROR_PASSWORD_LENGHT")==0){
                                    //codice per mostrare a frontend l'errore ERROR_PASSWORD_LENGHT
                            }
                    }
                    
                  } catch (err) {
                    alert('Errore nel recupero: ' + ret.message);
                  }
                },
                error: function(xhr, status, error) {
                  console.log('Error: ' + error.message);
                }
              });
            }     
        }
}
