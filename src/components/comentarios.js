import showComments from './showcomments'
import like from './like'
import dislike from './dislike'

var commentsTemplate = `
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
                            
                            <div class="post-comment py-2">
                                <hr class="my-1">
                                <div class="comment-form  text-right">
                                    <div class="form-group mb-1">
                                        <textarea name="coment" id="comentar" class="form-control text-comment" placeholder="Comentar aqui..." rows="3"></textarea>
                                    </div>
                                    <button id="btnComentar" class="btn btn-success btn-sm btn-send" data-postid="{{ID}}"><i class="fa fa-paper-plane fa-lg"></i> Comentar</button>
                                    
                                </div>
                            </div>
<hr class="mb-0 mt-1">

<h6>by por: <span style="color: grey"><a href="#" data-userid="{{USERID}}" class="btn_email" > {{NAME}} - {{EMAIL}}</a></span>, <span style='color: grey'> {{DATE}}</span></h6>
<hr class="mb-0 mt-1">

<a class="btn btn-link text-info float-left views" href="javascript:void(0);" data-postid="{{ID}}"><span class="badge badge-pill badge-dark count-views" id="articulo-view-{{ID}}">{{VIEWS}}</span> Vistas</a> 

<a class="btn btn-link text-info float-left comments" href="javascript:void(0);" data-postid="{{ID}}"><span class="badge badge-pill badge-dark count-comments" id="articulo-comment-{{ID}}">{{COMMENTS}}</span> Comentarios</a> 

<a class="btn btn-link text-info float-left like" href="javascript:void(0);" data-postid="{{IDLIKE}}"><span class="badge badge-pill badge-dark count-like" id="articulo-like-{{ID}}">{{LIKE}}</span>  Good</a>  

<a class="btn btn-link text-info float-left dislike" href="javascript:void(0);" data-postid="{{DISLIKE}}">Bad</a>    
<br>
            <hr class="mb-0 mt-1"><br>
                                    <div class="comment-content" id="articulo-comments">
                                        <!-- Aqui van los comentarios cargados  -->
                                    </div> 
                                    <hr class="mb-0 mt-1">
</div>
</div>
</div>`

export default function saveComments(postid){
    console.log('Show comentarios');
    
    var commentView = '';
    
    if(localStorage.getItem("blogapi")){
        var userdata = JSON.parse(localStorage.getItem("blogapi"));
        var url = `${API_PATH}/post/${postid}`;
        //console.log(url);
        if(userdata.id > 0 && userdata.token.length == 36){
            var cabecera = new Headers();
            cabecera.append("Authorization",'Bearer '+ userdata.token);                    
            cabecera.append('Content-Type', 'application/json');
            var init = {
                method:'GET',
                headers:cabecera
            };
            
            var myrequest = new Request(url,init);
            console.log(myrequest);
            fetch(myrequest).then(function(response){
                if(response.ok){
                    return response.json();
                }
                throw new Error('La respuesta no es ok...');
            })
    .then(res => {
        //console.log(res);
        showComments(postid); 
            commentView = commentView + commentsTemplate.replace('{{BODY}}', res.body)
            .replace('{{NAME}}', res.userName)
            .replace('{{EMAIL}}', res.userEmail)
            .replace('{{USERID}}', res.userId)
            .replace('{{TITLE}}', res.title)
            .replace('{{ID}}', res.id)
            .replace('{{IDLIKE}}', res.id)
            .replace('{{VIEWS}}', res.views)
            .replace('{{COMMENTS}}', res.comments)
            .replace('{{TAGS}}', res.tags)
            .replace('{{LIKE}}', res.likes)
            .replace('{{DISLIKE}}', res.id)
            .replace('{{DATE}}', moment(res.createdAt).format('DD/MM/YYYY h:mm:ss a'));
            
            document.getElementById('posts-container').innerHTML = commentView;
            //Boton para guardar comentarios
            var comentar = document.getElementsByClassName('btn-send');
        
        for (var i = 0; i < comentar.length; i++){
            comentar[i].addEventListener('click', function(e){
                //console.log("pom");
            var ueObject = e.target;
        
            var postid = ueObject.getAttribute('data-postid');
            console.log(postid);
            if(postid > 0){
                var textComment = document.getElementById("comentar").value;
                var data = {
                    body: textComment
                };
                if(localStorage.getItem("blogapi")){
                    var userdata = JSON.parse(localStorage.getItem("blogapi"));
                    var url = `${API_PATH}/post/${postid}/comment`;
                    if(userdata.id > 0 && userdata.token.length == 36){
                        var cabecera = new Headers();
                        cabecera.append("Authorization",'Bearer '+ userdata.token);                    
                        cabecera.append('Content-Type', 'application/json');
                        var init = {
                            method:'POST',
                            headers:cabecera,
                            body:JSON.stringify(data)
                        };
                        var myrequest = new Request(url,init);
                        fetch(myrequest).then(function(response){
                            if(response.ok){
                                return response.json();
                            }
                            throw new Error('La respuesta no es ok...');
                        }).then(function(data){
                            
                            if(data.id > 0){
                                document.getElementById('comentar').value ="";
                              alert("Comentario publicado...","success");
                              
                            }else{                                
                                alert("Problemas al publicar comentario...","warning");
                            }

                        }).catch(function(error){
                            alert("Hubo problema con la peticion fetch"+error.message,"danger");
                        });
                    }else{
                        localStorage.removeItem("blogapi");
                        window.location.href = 'login.html';
                    }
                }
            }else{
                alert("Campos requeridos no completado","warning");
            }

                
        });
        
        }  
        //Boton Like
        var lik = document.getElementsByClassName('like');
        for (var i = 0; i < lik.length; i++){
            lik[i].addEventListener('click', function(e){
                //console.log("pom");
            var ueObject = e.target;
        
            var postid = ueObject.getAttribute('data-postid');
            like(postid);        
        });
        
        }  
        //Boton DisLike
        var dlik = document.getElementsByClassName('dislike');
        for (var i = 0; i < dlik.length; i++){
            dlik[i].addEventListener('click', function(e){
               // console.log("pom");
            var ueObject = e.target;
        
            var postid = ueObject.getAttribute('data-postid');
            dislike(postid);        
        });
        
        } 
    })
    .catch( err => {
        console.log(err);
    }); }}
    
}