function deleteAccount(password,onclose){
    if(password.length==0 || password==null){
           onclose(false,"EMPTY_FIELD");
    }else{ 
            $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8080/user/delete/request/',
            data: "password="+password+"&frontend_url="+window.location.href+"", 
            contentType: "application/x-www-form-urlencoded",
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            success: function(data){
              try {
                var ret = data;
                console.log(JSON.stringify(data));
                if(ret.status==0){
                    onclose(true,ret.message);
                }else if(ret.status==1){
                    if(strcmp(ret.message,'ERROR_SESSION')){
                      onclose(false,'ERROR_SESSION');   
                    }else if(strcmp(ret.message,'ERROR_PASSWORD')){
                      onclose(false,'ERROR_PASSWORD');   
                    }
                }
              }catch (err){
                 alert('Errore nel eliminazione account: ' + ret.message);
              }
            },
            error: function(xhr, status, error) {
               console.log('Error: ' + error.message);
              }
            });
    }                    
}   
