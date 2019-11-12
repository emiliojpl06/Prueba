var allcommentTemplate = /**html*/`
    <div class="card border-light mb-3">
    <div class="card-header">
    {{NAME}} ({{EMAIL}}) <span class="float-right">{{DATE}}</span>
    </div>
    <div class="card-body">
    <p>{{BODY}}</p>
    </div>
    </div>`

        export default function showComments(postid){
            console.log('Show All comments');
            
            var commetView = '';
        
            if(localStorage.getItem("blogapi")){
                var userdata = JSON.parse(localStorage.getItem("blogapi"));
                var url = `${API_PATH}/post/${postid}/comment`;
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
                res.forEach(p => {
                 //console.log(p);
                 
                        // console.log(p);
                        commetView = commetView + 
                        allcommentTemplate.replace('{{NAME}}', p.userName)
                                .replace('{{EMAIL}}', p.userEmail)
                                .replace('{{DATE}}', moment(p.createdAt).format('DD/MM/YYYY h:mm:ss a'))
                                .replace('{{BODY}}', p.body);
                                
                            });                
                               //console.log(commetView);
                               document.getElementById('articulo-comments').innerHTML = commetView; 
            })
            .catch(err => {
                console.log(err);
            }); }}
 
        }

