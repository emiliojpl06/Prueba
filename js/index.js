//alert("Hello Word");

function login (){
   // alert("Saludar Persona");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

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
    .then(Response => console.log('Success:', Response))
    .catch(error => console.error('Error:', error));
}

window.onload = function(){
    document.getElementById("btnLogin").addEventListener('click', function(){
        login();
    });
}