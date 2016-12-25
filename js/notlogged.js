function notLoggedModal(){
    
    var signup, login, recover;
    
    
    setLoginModal();
    setSignupModal();
    setRecoverModal();
    
    function setLoginModal(){
        
        document.getElementById('show-login').addEventListener('click', function(){
            
            login = document.getElementById('dialog-login'); //get dialog element
            
            if (! login.showModal) {
                dialogPolyfill.registerDialog(login);
            }
            
            /** close button function **/
            var v = document.getElementById('closebtn-login');
            v.addEventListener('click', function() {
                
                login.close();
            });
            
            /** login request **/
            
            
            /**./Login request **/
            
           login.showModal();
                
        }); //./document
        
    } //./setLoginModal
    
    function setRecoverModal(){
        
            document.getElementById('show-recover').addEventListener('click', function(){
            
            recover = document.getElementById('dialog-recover'); //get dialog element
            
            if (! recover.showModal) {
                dialogPolyfill.registerDialog(recover);
            }
            
            /** close button function **/
            var v = document.getElementById('closebtn-recover');
            v.addEventListener('click', function() {
                
                //GO BACK to login modal, and hide recover 
                recover.close(); 
                login.showModal();
                
            });
            
            /** recover request **/
            
            
            /**./recover request **/
            
            login.close();
            recover.showModal();
            
            
        });
    }
    
    function setSignupModal(){
        
        document.getElementById('show-signup').addEventListener('click', function(){
            
            signup = document.getElementById('dialog-signup'); //get dialog element
            
            if (! signup.showModal) {
                dialogPolyfill.registerDialog(signup); 
            }
            
            /** close button function **/
            var v = document.getElementById('closebtn-signup');
            v.addEventListener('click', function() {
                signup.close();
            });
            
            /** signup request **/
            
            
            /**./signup request **/
            
           signup.showModal();
            
            
        });
        
    } //./setSignupModal
    

    
} //./notloggedModal