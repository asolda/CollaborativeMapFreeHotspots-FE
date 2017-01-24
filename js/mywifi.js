// Funzione per ottenere la lista delle proprie reti WiFi.
function get_user_wifi_list(onclose){
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:8080/pin/get_user_networks/',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            onclose(true, data);
        }
    });
}