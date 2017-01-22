function segnala(rete,tipo,dettagli,onclose){
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8080/segnala/',
        data: "rete_wifi="+rete+"&tipo="+tipo+"&dettagli="+dettagli,
        contentType: "application/x-www-form-urlencoded",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success:  function(data) {
            onclose(data);
        },
        error: function(xhr, status, error) {
            console.log('Error: ' + error.message);
        }
    });
}

function notifications(onclose){
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8080/segnala/',
        data: "rete_wifi="+rete+"&tipo="+tipo+"&dettagli="+dettagli,
        contentType: "application/x-www-form-urlencoded",
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success:  function(data) {
            onclose(data);
        },
        error: function(xhr, status, error) {
            console.log('Error: ' + error.message);
        }
    });
}