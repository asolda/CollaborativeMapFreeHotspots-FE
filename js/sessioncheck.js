 function sessionCheck(){
          $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:8080/session/check/',
            success: function(data) {
              try {
                var ret = data;
                if(ret.status == 0){
                    $('#result').append(ret.message + '</br>');
					var id_utente = ret.message.user;
					return id_utente; //sessione esistente
                }
				else if(ret.status == 1){
                    $('#result').append(ret.message + '</br>');
					return 0; //sessione non esistente
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