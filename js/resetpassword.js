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
function resetpassword(email,onclose){
    if(email.length==0 || email==null){
        onclose(false,"EMPTY_FIELD");
    }else if(!validateEmail(email)){
        onclose(false,"INVALID_EMAIL");
    }
    else {
        var i_url=window.location.href;
        var url= i_url.replace("#","");
        
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8080/user/reset_password/request/',
            data: "email="+email+"&frontend_url="+url,
            contentType: "application/x-www-form-urlencoded",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
                try {
                    var ret = data;
                    console.log(JSON.stringify(ret));
                    if(ret.status==0){
                        onclose(true,ret.message);
                    }else if(ret.status==1){
                        $('#result').append(ret.message + '</br>');
                        if(strcmp(ret.message,"ERROR_EMAIL")==0){
                            onclose(false,"ERROR_EMAIL");
                        }else if(strcmp(ret.message,"ERROR_DB")==0){
                            onclose(false,"ERROR_DB");
                        }else if(strcmp(ret.message,"ERROR_EMAIL_NOT_FOUND")==0){
                            onclose(false,"ERROR_EMAIL_NOT_FOUND");
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
function resetpassword2(password,conf_password,onclose){
    console.log(password+","+conf_password);
    if(password == null || password.length==0 || !validatePassword(password)){
        onclose(false,'INVALID_PASSWORD');
    }else if(password.length<8){
        onclose(false,'INVALID_PASSWORD_LENGTH');
    }else if(strcmp(password,conf_password)!=0){
        onclose(false,'NOT_IDENTICAL_FIELDS');
    }else{
        var token= getParameter("token");
        if(token!=null){
            $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:8080/user/reset_password/do/',
                data: "token="+token+"&password="+password,
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
                            if(strcmp(ret.message,"ERROR_TOKEN")==0){
                                onclose(false,"ERROR_TOKEN");
                            }else if(strcmp(ret.message,"ERROR_DB")==0){
                                onclose(false,"ERROR_DB");
                            }else if(rstrcmp(ret.message,"ERROR_PASSWORD")==0){
                                onclose(false,"ERROR_PASSWORD");
                            }else if(strcmp(ret.message,"ERROR_PASSWORD_LENGTH")==0){
                                onclose(false,"ERROR_PASSWORD_LENGTH");
                            }
                        }
                        
                    } catch (err) {
                        alert('Errore nel recupero: ' + err.message);
                    }
                },
                error: function(xhr, status, error) {
                    console.log('Error: ' + error.message);
                }
            });
        }else{
            alert("token null");
        }
    }
}
