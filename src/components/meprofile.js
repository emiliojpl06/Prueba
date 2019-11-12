import logout from '../index'

var meprofileTemplate = /**html*/`
<div class="card cardpost mb-2" style="width: 100%;">
            <div class="card-body posts py-4">
        <div>Profile</div>
        <h1><i class="fas fa-user"></i> {{NAME}}</h1>
        <h4><i class="far fa-envelope"></i> {{EMAIL}}</h4>
        <h4><i class="fas fa-mail-bulk"></i> Post Count: {{POSTS}}</h4>
        
        <button id="btnLogout" class="btn btn-danger btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="button">Log out</button>
        </div>
        </div>`

       

export default function showMeprofile(){
    console.log('Show me PROFILE');

    var profileView = '';

    if(localStorage.getItem("blogapi")){
        var userdata = JSON.parse(localStorage.getItem("blogapi"));
        var url = `${API_PATH}/users/me`;
        if(userdata.id > 0 && userdata.token.length == 36){
            var cabecera = new Headers();
            cabecera.append("Authorization",'Bearer '+ userdata.token);                    
            cabecera.append('Content-Type', 'application/json');
            var init = {
                method:'GET',
                headers:cabecera
            };
            var myrequest = new Request(url,init);
            fetch(myrequest).then(function(response){
                if(response.ok){
                    return response.json();
                }
                throw new Error('La respuesta no es ok...');
            })
    .then(res => {
         //console.log(res);
         
                // console.log(p);
                profileView = profileView + 
            meprofileTemplate.replace('{{NAME}}', res.name)
                        .replace('{{EMAIL}}', res.email)
                        .replace('{{POSTS}}', res.posts);
                        document.getElementById('posts-container').innerHTML = profileView;
                        document.getElementById('btnLogout')
                        .addEventListener('click', function(){
                            logout()});
            
    })
    .catch(err => {
        console.log(err);
    }); }}
   
}



