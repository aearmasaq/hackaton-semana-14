document.addEventListener("DOMContentLoaded", function(){
    const videoContainer =  document.querySelector('#grid-container');
    const videoUrl = `http://localhost:3000/videos`
    const videosForm =  document.querySelector('#video-form')
    let allVideos = []

    /*LISTAR */
    fetch(`${videoUrl}`)
    .then(response => response.json())
    .then(videoData => videoData.forEach(function(video){
        allVideos = allVideos
        videoContainer.innerHTML +=`
        <div id=video-${video.id} class="card">
            <div class="dog__crud">
              <div class="dog__crud__edit" >
                <img src="./iconos/editar.png" alt="">
                <button  data-id=${video.id} id="edit-${video.id}" data-action="edit">Editar</button>
              </div>
              <div class="dog__crud_delete">
                <img src="./iconos/eliminar.png" alt="">
                <button data-id=${video.id} id="delete-${video.id}" data-action="delete">Borrar</button>
              </div>
            </div>
            <div class="bg-img">
                <video controls>     
                    <source src="${video.coverVideo}" type=video/mp4>        
                </video>
            </div>
            <div class="content">
              <h4>${video.title}</h4>              
              <p>${video.description}</p>
              <button>Ver Detalle</button>
            </div>         
          </div> `
    }))

    /*INSERTAR REGISTRO */

     videosForm.addEventListener('submit', (e) => {
        event.preventDefault();

        const titleInput =   videosForm.querySelector('#title').value
        const coverVideoInput =  videosForm.querySelector('#coverVideo').value
        const descripcionInput =  videosForm.querySelector('#descripcion').value

        fetch(`${videoUrl}`, {
            method:'POST',
            body: JSON.stringify({
                title: titleInput,
                coverVideo: coverVideoInput,
                description: descripcionInput,
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then (response => response.json())
        .then(video => {
            allVideos.push(video)
            videoContainer.innerHTML+=`
            <div id=video-${video.id} class="card">
            <div class="dog__crud">
              <div class="dog__crud__edit" >
                <img src="./iconos/editar.png" alt="">
                <button  data-id=${video.id} id="edit-${video.id}" data-action="edit">Editar</button>
              </div>
              <div class="dog__crud_delete">
                <img src="./iconos/eliminar.png" alt="">
                <button data-id=${video.id} id="delete-${video.id}" data-action="delete">Borrar</button>
              </div>
            </div>
            <div class="bg-img">
                <video controls>     
                    <source src="${video.coverVideo}" type=video/mp4>        
                </video>
            </div>
            <div class="content">
              <h4>${video.title}</h4>              
              <p>${video.description}</p>
              <button>Ver Detalle</button>
            </div>         
          </div> `
          editForm.innerHTML = ""
        })
     })

     /*EDITAR REGISTRO */

     videoContainer.addEventListener('click', (e) => {
         if(e.target.dataset.action === 'edit'){
             const editButton = document.querySelector(`#edit-${e.target.dataset.id}`)
             editButton.disabled = true

             const videoData = allVideos.find((video) => {
                return video.id == e.target.dataset.id
              })

              const editForm = videoContainer.querySelector(`#edit-video-${e.target.dataset.id}`)
              editForm.innerHTML = `

              <form class='form' id='edit-video' action='reto-2.html' method='post'>
                        <div class="modal">
                        <div class="modal-content">
                            <span class="close-button">×</span>                    
                            <form id="video-form">
                                <div>
                                <H2 class="modal__title">Agregar Video</H2>
                                </div>
                                <br>
                            <div>
                                <input required type="text" placeholder="${videoData.title}" id="title">
                                <input required type="text" placeholder="${videoData.coverVideo}" id="coverVideo">
                            </div>
                            <div>
                                <textarea required class="areatext" id="descripcion" placeholder="${videoData.description}"></textarea>
                            </div>
                            <div  class="form-action-buttons">
                                <input type="submit" value="EDITAR VIDEO">                            
                            </div>
                            </form>
                        </div> 
                    </div>
              </form>`

              editForm.addEventListener("submit", (e) => {
                const titleInput =   videosForm.querySelector('#edit-title').value
                const coverVideoInput =  videosForm.querySelector('#edit-coverVideo').value
                const descripcionInput =  videosForm.querySelector('#edit-descripcion').value
                const editedVideo = document.querySelector(`#video-${videoData.id}`)

                fetch(`${videoUrl}/${videoData.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        title: titleInput,
                        coverVideo: coverVideoInput,
                        description: descripcionInput,
                    }),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then(response => response.json())
                .then(video => {
                    editedVideo.innerHTML = `
                    <div id=video-${video.id} class="card">
                        <div class="dog__crud">
                        <div class="dog__crud__edit" >
                            <img src="./iconos/editar.png" alt="">
                            <button  data-id=${video.id} id="edit-${video.id}" data-action="edit">Editar</button>
                        </div>
                        <div class="dog__crud_delete">
                            <img src="./iconos/eliminar.png" alt="">
                            <button data-id=${video.id} id="delete-${video.id}" data-action="delete">Borrar</button>
                        </div>
                        </div>
                        <div class="bg-img">
                            <video controls>     
                                <source src="${video.coverVideo}" type=video/mp4>        
                            </video>
                        </div>
                        <div class="content">
                        <h4>${video.title}</h4>              
                        <p>${video.description}</p>
                        <button>Ver Detalle</button>
                        </div>         
                  </div>
                  <div id=edit-book-${video.id}>
                   </div>`
                    editForm.innerHTML = ""
                })

              })
              /*BORRAR REGISTRO*/
              else if (e.target.dataset.action === 'delete')

         }
     })
})