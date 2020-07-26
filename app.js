const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded=0;
let totalImages = 0;
let photosArray =[];
//UNplash APi
const count = 30;
const apiKey = '-GK21L0iv-HceSzmYRlhy0pKnKYQNp6KZ_L3l1JkFz0';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//Check if all images were loaded
function imageLoaded(){
    
    imagesLoaded++;
    
    if(imagesLoaded === totalImages){
        ready=true;
        loader.hidden=true;

        
    }
}
//Helper Function to set Attrib
function setAttributes(element,attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}
// CReate elemets for links & photos ,add to dom

function displayPhotos()

 {  
  totalImages = photosArray.length;
    console.log('total images',totalImages);
    photosArray.forEach((photo)=>{
        //Create <a> to link to unplash
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        });


        //Create <img> for photho
        const img = document.createElement('img');
        setAttributes(img,{
           src:  photo.urls.regular,
           alt: photo.alt_description,
           title: photo.alt_description,
        });
        //Event Listener, hceck when each is finished loading
        img.addEventListener('load',imageLoaded);
        //Put <img> inside <a> then put inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Get photos form Unplash API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
       //Catch Error 
    }
}
//Check to see if scrolling near bottom of page.
window.addEventListener('scroll',()=>{
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
      getPhotos();
      console.log('load more ');
  } 
});

//On Load
getPhotos();
