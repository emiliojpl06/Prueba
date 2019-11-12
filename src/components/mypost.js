import showMeprofile from './meprofile'
import saveComments from './comentarios'

var mypostTemplate = `
<div>
<div class="card cardpost mb-2" style="width: 100%;">
            <div class="card-body posts py-4">
            <h5 class="card-title text-truncate"><a class="post-title-a" href="javascript:void(0)"><b class="post-title">{{TITLE}}</b> </a><small class="text-tags text-truncate float-right"><em>{{TAGS}}</em></small></h5>

<hr class="mb-0 mt-1">
<div class="text-line-3 post-dimiss mb-2">
                                <p class="card-text text-justify post-body">
                                {{BODY}}
                                </p>
                            </div>
<h6>by por: <span style="color: grey"><a href="#" data-userid="{{USERID}}" class="btn_email" > {{NAME}} - {{EMAIL}}</a></span>, <span style='color: grey'> {{DATE}}</span></h6>
<button id="btnComentar" class="btn btn-success btn-sm btn-send" data-postid="{{ID}}"><i class="far fa-eye"></i> Ver más</button>
<hr class="mb-0 mt-1">
     
</div>
</div>
</div>`

export default function showMypost(){
    console.log('Show mis Posts');
    var mypostView = '';
    if(localStorage.getItem("blogapi")){
        var userdata = JSON.parse(localStorage.getItem("blogapi"));
        var url = `${API_PATH}/post?userId=${userdata.id}`;
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
        // console.log(res);
        res.forEach(p => {
             //console.log(p);
            mypostView = mypostView + mypostTemplate.replace('{{BODY}}', p.body)
            .replace('{{NAME}}', p.userName)
            .replace('{{EMAIL}}', p.userEmail)
            .replace('{{USERID}}', p.userId)
            .replace('{{TITLE}}', p.title)
            .replace('{{ID}}', p.id)
            .replace('{{VIEWS}}', p.views)
            .replace('{{COMMENTS}}', p.comments)
            .replace('{{TAGS}}', p.tags)
            .replace('{{LIKE}}', p.likes)
            .replace('{{LIKED}}', res.liked)
            .replace('{{DATE}}', moment(p.createdAt).format('DD/MM/YYYY h:mm:ss a'));
                        
           
        });
        document.getElementById('posts-container').innerHTML = mypostView;
        var bes = document.getElementsByClassName('btn_email');
        
        for (var i = 0; i < bes.length; i++){
            bes[i].addEventListener('click', function(){
                
                showMeprofile();
        });
        }

        var comentar = document.getElementsByClassName('btn-send');
        //var coment = document.getElementsByClassName('text-comment');
        
        for (var i = 0; i < comentar.length; i++){
            comentar[i].addEventListener('click', function(e){
                //console.log("pom");
            var ueObject = e.target;
        
            var postid = ueObject.getAttribute('data-postid');
            //console.log(postid);
            saveComments(postid);  
           
          // comentarios(postid);

        });
        
        }  

    })
    .catch( err => {
        console.log(err);
    }); }}

}

