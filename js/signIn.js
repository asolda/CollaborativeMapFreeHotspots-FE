 function signIn(email, password, onclose){
     if((email.length==0 || email==null) && (password.length==0 || password==null)){
           onclose(false,'CAMPI_EMAIL_PASSWORD_NON_COMPILATI'); 
     }else if((email.length==0 || email==null)){
           onclose(false,'CAMPO_EMAIL_NON_COMPILATO');
     }else if((password.length==0 || password==null)){
           onclose(false,'CAMPO_PASSWORD_NON_COMPILATO');
     }else{     
          $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8080/user/login/',
            data: "email="+email+"&password="+password,
            contentType: "application/x-www-form-urlencoded",
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
            success: function(data) {
              try {
                var ret = data;
                if(ret.status==0){
					onclose(true,ret.message.user);
                }
				else if(ret.status==1){
					 
                      if(strcmp(ret.message,'ERROR_GENERATING_SESSION')==0){
                        onclose(false,'ERROR_GENERATING_SESSION');
                     }else if(strcmp(ret.message,'ERROR_EMAIL_PASSWORD')==0){
                        onclose(false,'ERROR_EMAIL_PASSWORD');
                     }else if(strcmp(ret.message,'ERROR_EMAIL')==0){
                        onclose(false,'ERROR_EMAIL');
                     }else if(strcmp(ret.message,'ERROR_PASSWORD')==0){
                        onclose(false,'ERROR_PASSWORD');
                     }else if(strcmp(ret.message,'ERROR_CREDENTIALS')==0){
                        onclose(false,'ERROR_CREDENTIALS');
                     }                     
                }


              } catch (err) {
                alert('Errore nel login: ' + ret.message);
              }
            },
            error: function(xhr, status, error) {
              console.log('Error: ' + error.message);
            }
          });
         }
 }
         
/** Funzione per effetuare il logout **/
function signOut(onclose){
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8080/user/logout/',
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
            success: function(data) {
                try{
                    if(data.status==0){
                        onclose(true,data.message);
                    }else if(data.status==1){
                        onclose(false,"ERROR_SESSION");
                    }
                }catch(err){
                    window.location.href = ".";
                }
            },
            error: function(xhr, status, error) {
              console.log('Error: ' + error.message);
            }
          });
         }

