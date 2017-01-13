 function segnala(utente,rete,tipo,dettagli,onclose){
          $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8080/segnala/',
            data: "utente="+utente+"&rete_wifi="+rete+"&tipo="+tipo+"&dettagli="+dettagli,
            contentType: "application/x-www-form-urlencoded",
            success:  function(data) {
                onclose(data);
            },
            error: function(xhr, status, error) {
              console.log('Error: ' + error.message);
            }
          });
         }
