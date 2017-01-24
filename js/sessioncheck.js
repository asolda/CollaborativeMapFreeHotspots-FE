 function sessionCheck(onCheckTermination){
          $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:8080/session/check/',
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
            success: function(data) {
              try {
                var ret = data;
                if(ret.status == 0){
					//sessione esistente
                    //$('#result').append(ret.message + '</br>');
					onCheckTermination(ret.message.user);
                }
				else if(ret.status == 1){
					//sessione non esistente
                    //$('#result').append(ret.message + '</br>');
					onCheckTermination(ret.message);
                }
                
                
              } catch (err) {
                alert('Errore nella richiesta di controllo sessione: ' + ret.message);
              }
            },
            error: function(xhr, status, error) {
              console.log('Error: ' + error.message);
            }
          }).fail(function() {
                $('#page_id').empty().html(
                '<div style="background:url(\'./assets/gopher_background_error.jpg\'); height:550px; background-repeat: no-repeat; background-attachment: fixed; background-position: center; color: black;" align="center">'+
                '<h1>ATTENZIONE!</h1><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>'+
                '<h6>Il server non risponde; non è possibile utilizzare il sistema finché non verrà riavviato da un Gopher.</h1>'+
                
                '</div>');
          });
}