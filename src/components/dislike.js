import saveComments from './comentarios'
export default function dislike(postId){
    //console.log("Prummmm");
    if(localStorage.getItem("blogapi")){
        var userdata = JSON.parse(localStorage.getItem("blogapi"));
        var url = `${API_PATH}/post/${postId}/like`;
        if(userdata.id > 0 && userdata.token.length == 36){
            var cabecera = new Headers();
            cabecera.append("Authorization",'Bearer '+ userdata.token);                    
            cabecera.append('Content-Type', 'application/json');
            var init = {
                method:'DELETE',
                headers:cabecera
            };
            var myrequest = new Request(url,init);
            fetch(myrequest).then(function(response){
                if(response.status == 200){
                    return response.status;
                }else{
                    throw new Error('La respuesta no es ok...');
                }
            }).then(function(data){
                if(data == 200){
                    alert("Dislike Exitoso");
                    saveComments(postId);
                }else{
                    alert("Error "+data+" al generar like..","warning");
                }
            }).catch(function(error){
                alert("Hubo problema con la peticion fetch"+error.message,"danger");
            });
        }else{
            localStorage.removeItem("blogapi");
            window.location.href = 'login.html';
        }
    }

}
