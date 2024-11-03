const topBar = document.querySelector("#top-bar");
const exteriorColorSelection = document.querySelector('#exterior-buttons');
const interiorColorSelection = document.querySelector('#interior-buttons');
const exteriorImage = document.querySelector('#exterior-image');
const interiorImage = document.querySelector('#interior-image');
const wheelButtonSection = document.querySelector('#wheel-buttons');


//Handle top bar scroll
const handleScroll = () => {
  const aTop = window.scrollY === 0;
  topBar.classList.toggle('visible-bar',aTop);
  topBar.classList.toggle('hidden-bar',!aTop)  
}

//image mapping
const exteriorImages = {
  'Stealth grey':'./images/model-y-stealth-grey.jpg',
  'Pearl white':'./images/model-y-pearl-white.jpg',
  'Deep blue':'./images/model-y-deep-blue-metallic.jpg',
  'Solid black':'./images/model-y-solid-black.jpg',
  'Ultra red':'./images/model-y-ultra-red.jpg',
  'Quicksilver':'./images/model-y-quicksilver.jpg',
}

const interiorImages = {
 dark:'./images/model-y-interior-dark.jpg',
 light:'./images/model-y-interior-light.jpg',
}

//Handle color selection
const handleColorButtonClick = (event)=> {
  let button;
  if(event.target.tagName === "IMG"){
    button = event.target.closest('button');
  } else if(event.target.tagName === "BUTTON"){
    button = event.target;
  }

  if(button){
    const buttons = event.currentTarget.querySelectorAll('button');
    buttons.forEach((btn) => btn.classList.remove('btn-selected'));
    button.classList.add('btn-selected');

    //change exterior image
    if(event.currentTarget === exteriorColorSelection){
      const color = button.querySelector('img').alt; 
      exteriorImage.src = exteriorImages[color];

    }
    //change interior image
    if(event.currentTarget === interiorColorSelection){
      const color = button.querySelector('img').alt; 
      interiorImage.src = interiorImages[color];

    }
  }
  
}


//handle wheel selection
const handleWheelButtonClick = (event) => {
   if (event.target.tagName === "BUTTON") {
        const buttons = document.querySelectorAll('#wheel-buttons button');
        buttons.forEach(btn => btn.classList.remove('bg-gray-700','text-white'));

        //Add selected styles to clicked button
        event.target.classList.add('bg-gray-700','text-white');

        const selectedWheel = event.target.textContent.includes('Performance');
        exteriorImage.src = selectedWheel ? "./images/model-y-stealth-grey-performance.jpg":"./images/model-y-stealth-grey.jpg";
   }
}

//Event listernors
window.addEventListener("scroll",()=> requestAnimationFrame(handleScroll));
exteriorColorSelection.addEventListener("click",handleColorButtonClick);
interiorColorSelection.addEventListener("click",handleColorButtonClick);
wheelButtonSection.addEventListener("click",handleWheelButtonClick)