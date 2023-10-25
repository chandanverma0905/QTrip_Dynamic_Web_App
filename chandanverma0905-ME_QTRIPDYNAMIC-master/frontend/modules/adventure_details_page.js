import config from "../conf/index.js";
  
//Implementation to extract adventure ID from query params


function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log(search);
  
  const paramAdventure = new URLSearchParams(search);
  const AdventureId = paramAdventure.get("adventure");
  
  console.log(AdventureId);
     
  // Place holder for functionality to work in the Stubs
  return AdventureId;
}
     
  
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) 
{
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  console.log("hello", adventureId);
  
  try{
    let resAdventure = await fetch(`${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`);
     
    let dataAdventure = await resAdventure.json();
    
    return dataAdventure;
  }
  
  catch(err){
     return null;
  }
   
  // Place holder for functionality to work in the Stubs
  
}
  
//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) 
{
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  
  console.log("Grapes", adventure);
  
  const nameAdv = document.getElementById("adventure-name");
  const subtitleAdv = document.getElementById("adventure-subtitle");
  const imageAdv = document.getElementById("photo-gallery");
  const contentAdv = document.getElementById("adventure-content");
  
  
  nameAdv.innerHTML = adventure.name;
  subtitleAdv.innerHTML = adventure.subtitle;
  contentAdv.innerHTML = adventure.content;
  
  adventure.images.map((element)=> {
    let divImg = document.createElement('div');
    divImg.innerHTML = `<img class="activity-card-image" src="${element}">`;
    imageAdv.append(divImg);
  })
  
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
   
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators" id="carousel-indicators">
       <!--remove the indicators code-->
    </div>

    <div class="carousel-inner" id="carousel-inner">  
       <!--remove the carousel-inner code--> 
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Prev</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`;
  
  images.map((element, idx) => {
    let ele = document.createElement("div"); // DOM node created, we can use .append() to append this node to its parent 
    ele.className = `carousel-item ${idx === 0 ? "active" : ""}`;  // because we have to keep 1st image as active which will be displayed.
    ele.innerHTML = `<img src=${element} class="activity-card-image" alt="">`;
    
    document.getElementById("carousel-inner").append(ele); // ele is a DOM Node
    
    
// what if we add more images to the image array, then we need to work on the indicators of
// carousel because it has to work accordingly to the number of elements inside the images 
//array. So we have written incators code below. 
    const indicator = `<button type= "button"
                        data-bs-target= "#carouselExampleIndicators"
                        data-bs-slide-to= "${idx}" 
                        ${idx === 0 ? 'class= "active"': ""}
                        aria-current= "true" 
                        aria-label= "Slide ${idx + 1}">
                        </button>`;
     
     console.log("indicator", indicator);
     document.getElementById("carousel-indicators").innerHTML += indicator; // indicator is a
    // string literal
// So, to summarize, you can use element.innerHTML to set the HTML content of an element using a string, and you can use element.append() to add child nodes or elements to an element.

// The += operator is used in the context of element.innerHTML += to concatenate or append new HTML content to the existing HTML content of an element.

// Does .append() inside forEach() or map() means += ? 
// Not Exactly . While element.append() and += have similarities in terms of adding content, they have different behaviors and use cases.

// The += operator is used to concatenate or append strings together, so element.innerHTML += is used to append HTML content as a string to the existing HTML content of an element.

// On the other hand, the append() method is used to add DOM nodes or DOMString objects as the last children of an element. It directly modifies the DOM structure by adding the specified content as actual child nodes.

// When using forEach() or map() with element.append(), it means you're iterating over a collection and adding multiple DOM nodes to an element. It is not equivalent to +=, as it directly appends the actual DOM nodes as children rather than concatenating strings.

     
  });
}   
    
//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  
  console.log("zoo", adventure);

  const soldOutPanel = document.getElementById("reservation-panel-sold-out");
  const panelAvailable = document.getElementById("reservation-panel-available");
  const costShow = document.getElementById("reservation-person-cost");
  
  if(adventure.available === true)
  {
     soldOutPanel.style.display = "none";
     panelAvailable.style.display = "block";
     costShow.innerHTML = adventure.costPerHead;
  }
  
  else
  {
    soldOutPanel.style.display = "block";
    panelAvailable.style.display = "none";    
  }
   
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  
  console.log("joker", adventure);
  console.log("little", persons);
  
  let totalCost = document.getElementById("reservation-cost");
  
  totalCost.innerHTML = persons * adventure.costPerHead;
  
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  
  let formDetails = document.getElementById("myForm");
  
  console.log("Formfilled", formDetails.elements);
  
//  console.log("HelloHi" , adventure);

  formDetails.addEventListener("submit", async function(event) {
    
    event.preventDefault();
    const nameForm = formDetails.elements['name'].value;
    const dateForm = formDetails.elements['date'].value;
    const personsForm = formDetails.elements['person'].value;
    
    const allDataForm = {name: nameForm , date: dateForm, person: personsForm, adventure: adventure.id };

    const options = {
                     method: 'POST',
                     headers: {
                      'Content-Type':'application/json'
                              },
                     body: JSON.stringify(allDataForm)
                    };
    
    try{
      let allDetails  = await fetch(`${config.backendEndpoint}/reservations/new`, options);
       
      let FinalDetails  = await allDetails.json();
      
      alert("Success");
      
    }
    
    catch(err){
      alert("Failed");
      
    }
    
  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
 
  let bannerShow = document.getElementById("reserved-banner");

  if(adventure.reserved === true)
  {
    bannerShow.style.display = "block";
  }
  
  else
  {
    bannerShow.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
