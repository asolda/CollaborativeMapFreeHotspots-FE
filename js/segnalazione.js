 function segnala(utente,rete,tipo,dettagli){
          $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8080/segnala/',
            data: "utente="+utente+"&rete_wifi="+rete+"&tipo="+tipo+"&dettagli="+dettagli,
            contentType: "application/x-www-form-urlencoded",
            success: function(data) {
              try {
                var ret = jQuery.parseJSON(JSON.stringify(data));
                if(ret.status==0){
                    $('#result').append(ret.message + '</br>');
                }else if(ret.status==1){
                    $('#result').append(ret.message + '</br>');
                }
                
                
              } catch (err) {
                alert('Errore nella segnalazione: ' + ret.message);
              }
            },
            error: function(xhr, status, error) {
              console.log('Error: ' + error.message);
            }
          });
         }