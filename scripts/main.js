const topBar = document.querySelector("#top-bar");
const exteriorColorSelection = document.querySelector('#exterior-buttons');
const interiorColorSelection = document.querySelector('#interior-buttons');
const exteriorImage = document.querySelector('#exterior-image');
const interiorImage = document.querySelector('#interior-image');


//Handle top bar scroll
const handleScroll = () => {
  const aTop = window.scrollY === 0;
  topBar.classList.toggle('visible-bar',aTop);
  topBar.classList.toggle('hidden-bar',!aTop)  
}

//image mapping
const exteriorImages = {
  'Stealth Grey':'./images/model-y-stealth-grey.jpg',
  'Pearl White':'./images/model-y-pearl-white.jpg',
  'Deep Blue':'./images/model-y-deep-blue-metallic.jpg',
  'Solid Black':'./images/model-y-solid-black.jpg',
  'Ulta Red':'./images/model-y-ultra-red.jpg',
  'Quicksilver':'./images/model-y-quicksilver.jpg',
}

const interiorImages = {

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
  }
  
}
//Event listernors
window.addEventListener("scroll",()=> requestAnimationFrame(handleScroll));
exteriorColorSelection.addEventListener("click",handleColorButtonClick);
interiorColorSelection.addEventListener("click",handleColorButtonClick);