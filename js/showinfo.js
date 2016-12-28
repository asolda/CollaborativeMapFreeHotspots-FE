 function showinfo(pin_id){
          $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:8080/showinfo/',
            data: "pin_id="+pin_id+,
            contentType: "application/x-www-form-urlencoded",
            success: function(data) {
              try {
                var ret = jQuery.parseJSON(JSON.stringify(data));
                if(ret.status==0){
                    $('#result').append(ret.message + '</br>');
                }else if(ret.status==1){
                    $('#result').append(ret.message + '</br>');
                }
				return ret;
                
                
              } catch (err) {
                alert('Errore nella visualizzazione delle info del pin: ' + ret.message);
              }
            },
            error: function(xhr, status, error) {
              console.log('Error: ' + error.message);
            }
          });
         }