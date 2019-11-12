import showPost from './components/posts'
import showMypost from './components/mypost'
import newPost from './components/newpost'
import showMeprofile from './components/meprofile'

export default function logout() {
    if (localStorage.getItem('blogapi') == null) {
      //cerrado forzoso
      localStorage.removeItem('blogapi');
      window.location = "login.html";
    } else {
      let token = JSON.parse(localStorage.getItem('blogapi')).token;
      fetch(`${API_PATH}/logout`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }).then(function (response) {
          localStorage.removeItem('blogapi');
          window.location = "login.html";
        })
        .catch(error => window.location = "login.html");
  
    }
  }

window.onload = function(){
    console.log("Working.....");

    document.getElementById("post_view").addEventListener('click', function(){
      showPost()});
    
    document.getElementById("mypost_view").addEventListener('click', function(){
      showMypost()});

    document.getElementById("new_post").addEventListener('click', function(){
      newPost()});
    document.getElementById("profile").addEventListener('click', function(){
      showMeprofile()});
    document.getElementById("logout").addEventListener('click', function(){
        logout()});
        
}
/*
var ws = new WebSocket('ws://itla.hectorvent.com/api/?token=fb153fc9-4a02-49aa-aa16-6d63e51fc792');
 ws.onmessage = function (e) {
 console.log(e.data);
 
 }*/
 
 function mostrar_notificacion(tipo, texto) {
  var hora = new Date();
  hora = hora.toLocaleTimeString();
  var mensaje = '';
  if (tipo == 'success') {
    mensaje = `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>` + hora + `</strong> ` + texto + `<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`;

  } else if (tipo == 'danger') {
    mensaje = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>` + hora + `</strong> ` + texto + `<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`;

  } else if (tipo == 'info') {
    mensaje = `<div class="alert alert-info alert-dismissible fade show" role="alert">
        <strong>` + hora + `</strong> ` + texto + `<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`;

  }
  return mensaje;
}


  let token = JSON.parse(localStorage.getItem('blogapi')).token;
var ws = new WebSocket(`${WS_PATH}?token=${token}`);
ws.onopen = function (e) {
  // console.log(e)
};
ws.onclose = function (e) {
  // console.log(e)
};
ws.onerror = function (e) {
  console.log(e)
};

ws.onmessage = function (e) {
  
//console.log("Mensage del servidor", e.data);
var data = JSON.parse(e.data);
    console.log(data);
    switch (data.type) {
      
      case "user-connected":
        document.getElementById('table_noti').innerHTML = `<tr><td>` + mostrar_notificacion('success', data.userEmail + ` está conectad@.`) + `</td></tr>`;

        break;

      case "logged":
        document.getElementById('table_noti').innerHTML = `<tr><td>` + mostrar_notificacion('info', data.userEmail + ` está loguead@. `) + `</td></tr>`;

        break;

      case "disconnected":
        document.getElementById('table_noti').innerHTML = `<tr><td>` + mostrar_notificacion('danger', data.userEmail + ` está desconectad@.`) + `</td></tr>`;

        break;

        case "new-post":
          document.getElementById('table_noti').innerHTML = `<tr><td>` + mostrar_notificacion('info', data.userEmail + ` ha creado un nuevo post. `) + `</td></tr>`;

        break;


    }
 
} 


