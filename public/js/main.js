 document.querySelector('#find').addEventListener(('click'), apiRequest)
 document.querySelector("#getRandom").addEventListener("click", apiRequestRandom )

 async function apiRequest(){
    const artistName = document.getElementById("artistName").value
     try{
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?artistDisplayName=${artistName}`)
         const data = await response.json()
         const artwork = data.results
         console.log(artwork)
         document.querySelector("p").innerText = artwork.title
         document.querySelector("img").src = artwork.primaryImage
     } catch(error){
        console.log(error)
     }
 }
 async function apiRequestRandom(){
     const randomArtworkID = Math.floor(Math.random() * 820)
     try{
         const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/[objectID]/?objectID=${randomArtworkID}`)
         const data = await response.json()
         const randomArtwork = data
         console.log(randomArtwork)
         document.querySelector("p").innerText = randomArtwork.title
         document.querySelector("img").src = randomArtwork.primaryImage
     } catch(error){
         console.log(error)
     }
 }