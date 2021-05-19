const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

//Unsplash API
let count = 5;
const API_KEY = 'eBacMH7b3-HzYXHe8F40gEkuippTVx0EqTGcjt9RSX8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;
//chec if all the images were loaded successfully
function imageLoaded(){
    console.log(imagesLoaded);
    imagesLoaded++;
    if(imagesLoaded === totalImages)
    {
        ready = true;
        loader.hidden = true;
        count = 30
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
    }
}
//helper function for setAttribute
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}    

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log("totalImages", totalImages);
    //run function for each object in photosArray
    photosArray.forEach((photo) => {
        //create <a> to link to unsplash
        const item = document.createElement("a");
           setAttributes(item,{
            href: photo.links.html, 
            target: "_blank"
        });
        //create <img> for photo
        const img = document.createElement("img");
        setAttributes(img, {
            src:photo.urls.regular,
            alt: photo.alt_description,
            title:photo.alt_description
        });
        // Event Listener, check when each is finished loading.
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

//Get photos from Unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        
    } catch (error) {
        console.log(error);
    }
}
//check to see if the scroll hits bottom of the page and load photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready ){
        ready = false;
        getPhotos();
        
    }
})

//On load
getPhotos();