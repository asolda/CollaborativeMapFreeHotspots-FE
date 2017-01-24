function changePassword(password,newpassword,c_newpassword,onclose){
    if((password.length==0 || password==null) && (newpassword.length==0 || newpassword==null) && (c_newpassword.length==0 || c_newpassword==null)){
        onclose(false,'CAMPI_PASSWORD_NUOVAPASSWORD_CONFERMANUOVAPASSWORD_NON_COMPILATI');
    }else if((password.length==0 || password==null) && (newpassword.length==0 || newpassword==null)){
        onclose(false,'CAMPI_PASSWORD_NUOVAPASSWORD_NON_COMPILATI');
    }else if((password.length==0 || password==null) && (c_newpassword.length==0 || c_newpassword==null)){
        onclose(false,'CAMPI_PASSWORD_CONFERMANUOVAPASSWORD_NON_COMPILATI');
    }else if((newpassword.length==0 || newpassword==null) && (c_newpassword.length==0 || c_newpassword==null)){
        onclose(false,'CAMPI_NUOVAPASSWORD_CONFERMANUOVAPASSWORD_NON_COMPILATI');
    }else if((password.length==0 || password==null)){
        onclose(false,'CAMPO_PASSWORD_NON_COMPILATO');
    }else if((newpassword.length==0 || newpassword==null)){
        onclose(false,'CAMPO_NUOVAPASSWORD_NON_COMPILATO');
    }else if((c_newpassword.length==0 || c_newpassword==null)){
        onclose(false,'CAMPO_CONFERMANUOVAPASSWORD_NON_COMPILATO');
    }else if(!validatePassword(newpassword)){
        onclose(false,'ERRORE_NUOVA_PASSWORD');
    }else if(newpassword.length<8){
        onclose(false,'ERRORE_LUNGHEZZA_NUOVA_PASSWORD');
    }else if(strcmp(newpassword,c_newpassword)!=0){
        onclose(false,'CAMPI_NON_COINCIDENTI');
    }else{
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8080/user/change_password/',
            data: "old_password="+password+"&password="+newpassword,
            contentType: "application/x-www-form-urlencoded",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function(data){
                try {
                    var ret = data;
                    console.log(JSON.stringify(ret));
                    if(ret.status==0){
                        onclose(true,ret.message);
                    }else if(ret.status==1){
                        if(strcmp(ret.message,'ERROR_SESSION')==0){
                            onclose(false,'ERROR_SESSION');  
                        }else if(strcmp(ret.message,'ERROR_OLD_PASSWORD')==0){
                            onclose(false,'ERROR_OLD_PASSWORD');  
                        }else if(strcmp(ret.message,'ERROR_NOT_FOUND')==0){
                            onclose(false,'ERROR_NOT_FOUND');  
                        }else if(strcmp(ret.message,'ERROR_PASSWORD_LENGTH')==0){
                            onclose(false,'ERROR_PASSWORD_LENGTH');  
                        }else if(strcmp(ret.message,'ERROR_DB')==0){
                            onclose(false,'ERROR_DB');  
                        }    
                    }
                }catch (err){
                    alert('Errore nella modifica della password: ' + ret.message);
                }
            },
            error: function(xhr, status, error) {
                console.log('Error: ' + error.message);
            }
        });
    }
}
