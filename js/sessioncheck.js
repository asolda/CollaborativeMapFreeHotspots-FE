 function sessioncheck(cookie){
          $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:8080/sessioncheck/',
            data: "cookie="+cookie,
            contentType: "application/x-www-form-urlencoded",
            success: function(data) {
              try {
                var ret = jQuery.parseJSON(JSON.stringify(data));
                if(ret.status==0){
                    $('#result').append(ret.message + '</br>');
					return id_utente; //sessione esistente
                }else if(ret.status==1){
                    $('#result').append(ret.message + '</br>');
					return ""; //sessione non esistente
                }
                
                
              } catch (err) {
                alert('Errore nella richiesta di controllo sessione: ' + ret.message);
              }
            },
            error: function(xhr, status, error) {
              console.log('Error: ' + error.message);
            }
          });
         }