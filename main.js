const imagen = [...document.querySelectorAll('.imagen')];
const recargar = document.querySelector('.recargar');
const ErrorSpan = document.getElementById('error');
const secionFav = document.querySelector('.favorites_cats');
const btn1_save = document.querySelector('.btn1_save');
const btn2_save = document.querySelector('.btn2_save');
const btn3_save = document.querySelector('.btn3_save');
const upload = document.getElementById('upload');

// uso de axios
const api = axios.create({
    baseURL:'https://api.thecatapi.com/v1'
}); 
api.defaults.headers.common['X-API-KEY'] ='live_KwNCM9185uyusskAiFbA6Eyl3LzdVyEEvFFDp7DFLCxpDJoLHP3Jfjp7E93Om64g';

const API_URL_RAMDOM = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_KwNCM9185uyusskAiFbA6Eyl3LzdVyEEvFFDp7DFLCxpDJoLHP3Jfjp7E93Om64g';

const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload'

const API_URL_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_KwNCM9185uyusskAiFbA6Eyl3LzdVyEEvFFDp7DFLCxpDJoLHP3Jfjp7E93Om64g`;

recargar.addEventListener('click',cargarMichisRamdom);
 upload.addEventListener('click', uploadMichi)


async function cargarMichisRamdom(){
    try{
        console.log('ramdon')
        const res = await fetch(API_URL_RAMDOM);
        const data = await res.json();
        console.log(data);
      
     
        for (let index in imagen){
             imagen[index].src = data[index].url;
        }

        // boton guardar favoritos
        btn1_save.onclick = () => saveFavoritesMichi(data[0].id);
        btn2_save.onclick = () => saveFavoritesMichi(data[1].id);
        btn3_save.onclick = () => saveFavoritesMichi(data[2].id);
       
    } catch(error){
        console.log('se produjo un erro',
        ErrorSpan.innerHTML = error) 
    }
    
}

async function cargarMichisfavourites(){
    try{
        console.log('favoritos')
        const res = await fetch(API_URL_FAVORITES,{
            method:'GET',
            headers:{
                'X-API-KEY':'live_KwNCM9185uyusskAiFbA6Eyl3LzdVyEEvFFDp7DFLCxpDJoLHP3Jfjp7E93Om64g'
            }
        });
        const data = await res.json();
     

        secionFav.innerHTML=" ";
        data.forEach((gato,index) => {
            const containerFav = document.createElement('div');
            const containerImg = document.createElement('div');
            const imagen = document.createElement('img');
            const btn1_delete = document.createElement('button');
            const text = document.createTextNode('Eliminar de favoritos');

            imagen.src = gato.image.url;
            btn1_delete.append(text);
            containerImg.append(imagen,btn1_delete);
            containerFav.append(containerImg);
            secionFav.append(containerFav);
            
            containerFav.classList.add('container_favorites','container');
            containerImg.classList.add('like');
            btn1_delete.addEventListener('click',() =>
            deleteFavouriteMichi(gato.id));

        })

        
        
    } catch(error){
        console.log('se produjo un erro',
        ErrorSpan.innerHTML = error) 
    }
}

async function saveFavoritesMichi(id){
    try{
        // const res = await fetch (API_URL_FAVORITES,{
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',

        //         'X-API-KEY':'live_KwNCM9185uyusskAiFbA6Eyl3LzdVyEEvFFDp7DFLCxpDJoLHP3Jfjp7E93Om64g',
        //     },
        //     body:JSON.stringify({
        //         image_id: id
        //     }),
    
        // });
        // const data = await res.json();

        // usando AXIOS solicitud postÑ

        const data = await api.post('/favourites',{
           image_id:id, 
        });
    
       
        console.log(data);
        cargarMichisfavourites();
            
    } catch(error){
        console.log('se produjo un erro',
        ErrorSpan.innerHTML = error) 
    }

   
}

async function deleteFavouriteMichi(id){
    
    try{
        const res = await fetch (API_URL_DELETE(id),{
            method: 'DELETE'
        });
        const data = await res.json();
    

        console.log('save');
        console.log(data);
        cargarMichisfavourites();
    }catch(error){
        console.log('se produjo un erro',
        ErrorSpan.innerHTML = error) 
    }
 

}

async function uploadMichi(){

    const form = document.getElementById('formulario');
   
    const formData = new FormData(form);
    try{
        const res = await fetch(API_URL_UPLOAD,{
            method:'POST',
            headers:{   'X-API-KEY':'live_KwNCM9185uyusskAiFbA6Eyl3LzdVyEEvFFDp7DFLCxpDJoLHP3Jfjp7E93Om64g'},
            body: formData
         
        })
        const data = await res.json();
        console.log('foto subida');
       saveFavoritesMichi(data.id)

    }catch(error){
         console.log('se produjo un erro',
        ErrorSpan.innerHTML = error) 
    }
   
}
cargarMichisRamdom();
cargarMichisfavourites();

