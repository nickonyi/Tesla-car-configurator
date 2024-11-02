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

//Handle color selection
const handleColorButtonClick = (event)=> {
  let button;
  console.log(event.target);
  
}
//Event listernors
window.addEventListener("scroll",()=> requestAnimationFrame(handleScroll));
exteriorColorSelection.addEventListener("click",handleColorButtonClick);
interiorColorSelection.addEventListener("click",handleColorButtonClick);