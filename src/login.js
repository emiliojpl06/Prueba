
function login (){
    // alert("Saludar Persona");
     var username = document.getElementById("inputEmail").value;
     var password = document.getElementById("inputPassword").value;
 
     var data = {
         username: username,
         email: username,
         password: password
     };
 
     console.log(data);
     
     fetch(`${API_PATH}/login`,{
         method: 'POST',
         body: JSON.stringify(data),
         headers: {
             'Content-Type': 'application/json'
         }
     })
     .then(res => res.json())
     .then(response => {
        if(response.estatus && response.estatus == "error"){
            alert("Credenciales incorrectas.",'danger');
            //$(username).focus();
        }else{
            var UserData = {
                id:response.id,
                name:response.name,
                email:response.email,
                token:response.token
            };
            localStorageSaver(JSON.stringify(UserData));
            alert("Usuario "+ data.username + " Logueado correctamente");
            window.location.href = "index.html";
        }
    })
     .catch(error => alert('Error:', error));
 }
 
 function localStorageSaver(data){
    if(localStorage.getItem("blogapi")){
        localStorage.setItem("blogapi",data);
    }else{
        localStorage.setItem("blogapi",data);
    }
}
function checkToken(){
    if(localStorage.getItem("blogapi")){
         var userdata = JSON.parse(localStorage.getItem("blogapi"));
         if(userdata.id > 0 && userdata.token.length == 36){
             window.location.href = 'index.html';
         }else{
             localStorage.removeItem("blogapi");
         }
     }
 }


 window.onload = function(){
    checkToken();
     document.getElementById("btnLogin").addEventListener('click', function(){
         login();
     });
 }