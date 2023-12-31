
import config from "../conf/index.js";

async function init() {
  
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  
   
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
     
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }

  console.log("From init()");

  console.log(config);

  console.log(fetchCities());
  
}

//Implementation of fetch call
async function fetchCities() 
{
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

  // Implement the fetchCities() method to make an API call to the “/cities” endpoint 
  //and return an array with the cities data
  try{
  let res = await fetch(`${config.backendEndpoint}/cities`);

  let data = await res.json();
  
  return data;
  }

  catch(err) {
    alert(err);
    return null;
  }
  
}


//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  
  let elem = document.createElement("div");
  elem.className = "col-6 col-lg-3 mb-4"; // elem.setaattribute("class", )
  elem.innerHTML = `
            <a href="pages/adventures/?city=${id}" id="${id}">
              <div class="tile">
                <div class="tile-text text-center">
                  <h5>${city}</h5>
                  <p>${description}</p>
                </div>
                <img class="img-responsive" src="${image}" />
                </div>
            </a>
          `;

  document.getElementById("data").appendChild(elem);

  console.log(elem);
}



export { init, fetchCities, addCityToDOM };

