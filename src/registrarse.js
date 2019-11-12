function registrarse() {
var name = document.getElementById("inputName").value;
var email = document.getElementById("inputEmail").value;
var password = document.getElementById("inputPassword").value;
var repassword = document.getElementById("inputRepassword").value;


    if (password === repassword) {
        //var url = `${API_PATH}/register`;
        var data = {
            name: name,
            email: email,
            password: password
        };
        fetch(`${API_PATH}/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                if (response.error) {
                    alert("No es posible registrar el usuario.",'danger');
                } else {
                    alert("Usuario registrado con exito",'success');
                    window.location.href = 'login.html';
                }
            }
            )
            .catch(error => alert('Error: '+error.message,'danger'));


    } else {
        alert("No es posible registrar el usuario, intentelo de nuevo.",'danger');
        window.location.href = 'registro.html';
    }

}
window.onload = function(){
    document.getElementById("btnCreate").addEventListener('click', function(){
        registrarse();
      });
}