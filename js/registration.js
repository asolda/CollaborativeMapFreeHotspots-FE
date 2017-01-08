function registration(email,password,confermapassword,onclose){
        if((email.length==0 || email==null) && (password.length==0 || password==null) && (confermapassword.length==0 || confermapassword==null)){
           onclose(false,'CAMPI_EMAIL_PASSWORD_CONFERMAPASSWORD_NON_COMPILATI');   
        }else if((email.length==0 || email==null) && (password.length==0 || password==null)){
           onclose(false,'CAMPI_EMAIL_PASSWORD_NON_COMPILATI'); 
        }else if((password.length==0 || password==null) && (confermapassword.length==0 || confermapassword==null)){
           onclose(false,'CAMPI_PASSWORD_CONFERMAPASSWORD_NON_COMPILATI');  
        }else if((email.length==0 || email==null) && (confermapassword.length==0 || confermapassword==null)){
           onclose(false,'CAMPI_EMAIL_CONFERMAPASSWORD_NON_COMPILATI');
        }else if((email.length==0 || email==null)){
           onclose(false,'CAMP0_EMAIL_NON_COMPILATO');
        }else if((password.length==0 || password==null)){
           onclose(false,'CAMP0_PASSWORD_NON_COMPILATO'); 
        }else if((confermapassword.length==0 || confermapassword==null)){
           onclose(false,'CAMP0_CONFERMAPASSWORD_NON_COMPILATO'); 
        }else if(!validateEmail(email)){
           onclose(false,'ERROR_EMAIL');     
        }else if(!validatePassword(password)){
           onclose(false,'ERROR_PASSWORD');   
        }else if(user.password.length<8){
           onclose(false,'ERROR_PASSWORD_LENGTH');        
        }else if(strcmp(password,confermapassword)==0){
           onclose(false,'CAMPI_NON_COINCIDENTI');    
        }else{    
            $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:8080/user/new/request/',
                data: "email="+email+"&password="+password+"&frontend_url="+window.location.href,
                contentType: "application/x-www-form-urlencoded",
                crossDomain: true,
                xhrFields: {
                  withCredentials: true
               },
                success: function(data) {
                    try {
                        var ret = data;
                            if(ret.status==0){
                                 onclose(true,ret.message);
                            }else if(ret.status==1){
                                $('#result').append(ret.message + '</br>');
                                if(strcmp(ret.message,'ERROR_EMAIL_PASSWORD')==0){
                                   onclose(false,'ERROR_EMAIL_PASSWORD');  
                                }else if(strcmp(ret.message,'ERROR_EMAIL')==0){
                                   onclose(false,'ERROR_EMAIL');     
                                }else if(strcmp(ret.message,'ERROR_PASSWORD')==0){
                                   onclose(false,'ERROR_PASSWORD');  
                                }else if(strcmp(ret.message,'ERROR_PASSWORD_LENGTH')==0){
                                   onclose(false,'ERROR_PASSWORD_LENGTH');      
                                }    
                            }
                    }catch(err){
                        alert('Errore nella registrazione: ' + ret.message);
                    }
                },
                error: function(xhr, status, error) {
                    console.log('Error: ' + error.message);
            }
          });
         }