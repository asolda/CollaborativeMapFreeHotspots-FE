 function login(email, password){
          $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8080/user/login/',
            data: "email="+email+"&password="+password,
            contentType: "application/x-www-form-urlencoded",
            success: function(data) {
              try {
                var ret = data;
                if(ret.status==0){
                    $('#result').append(ret.message + '</br>');
					var id_utente = ret.message.user;
					return id_utente; //login ok
                }
				else if(ret.status==1){
                    $('#result').append(ret.message + '</br>');
					return 0; //email e/o password errati
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