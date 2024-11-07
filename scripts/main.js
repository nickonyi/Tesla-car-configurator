const topBar = document.querySelector("#top-bar");
const exteriorColorSelection = document.querySelector('#exterior-buttons');
const interiorColorSelection = document.querySelector('#interior-buttons');
const exteriorImage = document.querySelector('#exterior-image');
const interiorImage = document.querySelector('#interior-image');
const wheelButtonSection = document.querySelector('#wheel-buttons');
const performanceBtn = document.querySelector('#performance-btn');
const totalPriceElement = document.querySelector('#total-price');
const fullSelfDrivingCheckBox = document.querySelector('#full-self-driving-checkbox');
const accessoryCheckBoxes = document.querySelectorAll('.accessory-form-checkbox');
const downPaymentElement = document.querySelector('#down-payment');
const monthlyPaymentElement = document.querySelector('#monthly-payment');



const basePrice = 52490;
let currentPrice = basePrice;



let selectedColor = 'Stealth grey';
const selectedOptions = {
  'Performance Wheels':false,
  'Performance Package':false,
  'Full Self-Driving':false

}

const pricing = {
  'Performance Wheels':2500,
  'Performance Package':5000,
  'Full Self-Driving':8500,
  'Accessories':{
    'Center Console Trays':35,
    'Sunshade':105,
    'All-weather Interior Liners':225
  }
}

//update the total price in the UI
const updateTotalPrice = () => {
  //reset the current price to base price
  currentPrice = basePrice;
  //performance wheel option
  if (selectedOptions['Performance Wheels']) {
       currentPrice += pricing['Performance Wheels'];
  }
  //performance package opt
  if (selectedOptions['Performance Package']) {
    currentPrice += pricing['Performance Package'];
}

if (selectedOptions['Full Self-Driving']) {
    currentPrice += pricing['Full Self-Driving']; 
}

//accessory checkboxes
accessoryCheckBoxes.forEach((checkBox) => {
   //Extract the accessory label
   const accessoryLabel = checkBox.closest('label').querySelector('span').textContent.trim();
   const accessoryPrice = pricing['Accessories'][accessoryLabel];
   //Add the price if accessory is checked
   if(checkBox.checked){
    currentPrice += accessoryPrice;
   }
   
})


  //update the total price in UI
  totalPriceElement.textContent =`$${currentPrice.toLocaleString()}`;
  updatePaymentBreakdown();
}

//update payment breakdown based on the current price
const updatePaymentBreakdown = () => {
  //Calculate the down payment
  const downPayment = currentPrice * 0.1;
  downPaymentElement.textContent = `$${downPayment.toLocaleString()}`;

  //Calculate loan details (assuming 60-month loan and 3% interest rate)
  const loanTermMonths = 60;
  const interestRate = 0.03;

  const loanAmount = currentPrice - downPayment;
  const monthlyInterestRate = interestRate / 12;

  const monthlyPayment = (loanAmount * (monthlyInterestRate * Math.pow(interestRate + 1,loanTermMonths))) /
    (Math.pow(1 + monthlyInterestRate,loanTermMonths) - 1);

    monthlyPaymentElement.textContent = `$${monthlyPayment.toLocaleString()}`;
}

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
      selectedColor = button.querySelector('img').alt; 
      updateExteriorImage();
    }
    //change interior image
    if(event.currentTarget === interiorColorSelection){
      const color = button.querySelector('img').alt; 
      interiorImage.src = interiorImages[color];

    }
  }
  
}

//Update exterior image based colors and wheels
const updateExteriorImage = ()=> {
  const performanceSuffix = selectedOptions['Performance Wheels']?'-performance':'';
  const colorKey = selectedColor in exteriorImages ? selectedColor:'Stealth grey' ;
  exteriorImage.src = exteriorImages[colorKey].replace('.jpg',`${performanceSuffix}.jpg`);
}

//handle wheel selection
const handleWheelButtonClick = (event) => {
   if (event.target.tagName === "BUTTON") {
        const buttons = document.querySelectorAll('#wheel-buttons button');
        buttons.forEach(btn => btn.classList.remove('bg-gray-700','text-white'));

        //Add selected styles to clicked button
        event.target.classList.add('bg-gray-700','text-white');

        selectedOptions['Performance Wheels'] = event.target.textContent.includes('Performance');
        updateExteriorImage();
        updateTotalPrice();
   }
}

//performance package selection
const handlePerformanceButtonClick = ()=> {
   const isSelected = performanceBtn.classList.toggle('bg-gray-700');
   performanceBtn.classList.toggle('text-white');

   //update selected options
   selectedOptions['Performance Package'] = isSelected;
   updateTotalPrice();
}
//full self driving selections 
const fullSelfDrivingChange = () => {
  const isSelected = fullSelfDrivingCheckBox.checked;
  selectedOptions['Full Self-Driving'] = isSelected;
  updateTotalPrice();
}

//Handle accessory checkboxeslisteners
accessoryCheckBoxes.forEach((checkBox) => {
  checkBox.addEventListener("change",()=> {
    updateTotalPrice();
  })
})

//Initial update total price
updateTotalPrice();

//Event listernors
window.addEventListener("scroll",()=> requestAnimationFrame(handleScroll));
exteriorColorSelection.addEventListener("click",handleColorButtonClick);
interiorColorSelection.addEventListener("click",handleColorButtonClick);
wheelButtonSection.addEventListener("click",handleWheelButtonClick)
performanceBtn.addEventListener("click",handlePerformanceButtonClick);
fullSelfDrivingCheckBox.addEventListener('change',fullSelfDrivingChange);