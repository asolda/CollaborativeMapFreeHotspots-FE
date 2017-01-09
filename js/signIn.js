 function signIn(email, password, onSignInTermination){
          $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8080/user/login/',
            data: "email="+email+"&password="+password,
            contentType: "application/x-www-form-urlencoded",
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
            success: function(data) {
              try {
                var ret = data;
                if(ret.status==0){
					//login ok
                    //$('#result').append(ret.message + '</br>');
					onSignInTermination('LOGIN_OK', ret.message.user);
                }
				else if(ret.status==1){
					//errore login
                    //$('#result').append(ret.message + '</br>');
					onSignInTermination(ret.message, null);
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
         
/** Funzione per effetuare il logout **/
function signOut(){

  //aja call

  console.log('logout');
}
