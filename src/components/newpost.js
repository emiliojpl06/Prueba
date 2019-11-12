
export default function newPost(){

    document.getElementById('posts-container').innerHTML = `<div class="card cardpost mb-2" style="width: 100%;">
    <div class="card-body posts py-4">
    <form>
                                                
    <h2 class="text-left">
      <ion-icon name="reorder" role="img" class="hydrated" aria-label="reorder"></ion-icon> Nuevo Post
    </h2>
    <br>
                <div class="form-group">
                    <label for="titulo"><b>Titulo</b></label>
                    <input type="text" class="form-control" id="title" placeholder="Titulo del post">
                </div>
                <div class="form-group">
                    <label for="texto"><b>Contenido</b></label>
                    <textarea class="form-control" id="text" placeholder="Escriba aqui el contenido del post" rows="6"></textarea>
                </div>

                    <label><b>Tags:</b></label>
                    <input id="tags" type="text" class="form-control" placeholder="tags 1, tags 2..."> <br>

                <button type="reset" class="btn btn-danger font-weight-bold mb-2 btn-lg btn-primary btn-block  text-uppercase" id="btnnuevo"><ion-icon name="sunny" role="img" class="hydrated" aria-label="sunny"></ion-icon>Nuevo</button>

                <button type="submit" class="btn btn-success font-weight-bold mb-2 btn-lg btn-primary btn-block  text-uppercase" id="btnguardar"><ion-icon name="save" role="img" class="hydrated" aria-label="save" ></ion-icon> Guardar</button>
            </form>
            </div>
        </div>`;

            document.getElementById('btnguardar')
                      .addEventListener('click', function(){
                        savePost()}); 

 
}

 function savePost(){

    var title = document.getElementById("title").value;
    var tags = document.getElementById("tags").value;
    var text = document.getElementById("text").value;
    
    if(title != '' && text != ''){
        var postdata = {
            title:title,
            body:text,
            tags:tags
        };
        if(localStorage.getItem("blogapi")){
            var userdata = JSON.parse(localStorage.getItem("blogapi"));
            var url = `${API_PATH}/post`;
            if(userdata.id > 0 && userdata.token.length == 36){
                var cabecera = new Headers();
                cabecera.append("Authorization",'Bearer '+ userdata.token);                    
                cabecera.append('Content-Type', 'application/json');
                var init = {
                    method:'POST',
                    headers:cabecera,
                    body:JSON.stringify(postdata)
                };
                var myrequest = new Request(url,init);
                fetch(myrequest).then(function(response){
                    if(response.ok){
                        return response.json();
                    }
                    throw new Error('La respuesta no es ok...');
                }).then(function(data){
                    
                    if(data.id > 0){
                      alert("Post publicado...","success");
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
}

