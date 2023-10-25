import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // we will use URLSearchParams to extract the city from city=yourcityname

  console.log(search);  // will give us the complete query of the URL like   ?city=bengaluru

  const param = new URLSearchParams(search);  //The URLSearchParams API provides a consistent interface to the bits and pieces of the URL and allows trivial manipulation of the query string (that stuff after ?)
  const cityValue = param.get("city");  // from ?city=bengaluru (key value pair), we will get the value of the key passed inside param.get("KEY").
  //here city is the key and value is bengaluru
  // check this link for more info:  https://developer.chrome.com/blog/urlsearchparams/
  console.log(cityValue); // so now we will get bengaluru

  return cityValue;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  
  try{
    let advResp = await fetch(`${config.backendEndpoint}/adventures/?city=${city}`);
  
    let advData = await advResp.json();
    
    return advData;
    }
  
    catch(err) {
      
      return null;
    }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log("newHi", adventures);
  
  adventures.map((element)=> {
    console.log(element.name);
    let cardEle = document.createElement("div");

    cardEle.className = "col-12 col-sm-6 col-lg-3 mb-4";
    
    cardEle.innerHTML = `
  <a href="detail/?adventure=${element.id}" id=${element.id}>  
     
    <div class="card adventure-card">
        
      <div class="imgContainer">
          <img src="${element.image}" class="img-responsive img-fluid card-img-top"  alt="Card image cap">
      </div> 
          <div class="category-banner">${element.category}</div>

          <div class="card-body tripinfo">

              <div class="placeandprice text-center d-md-flex justify-content-between">
                <p id="placename">${element.name}</p>
                <p id="price"> ${element.currency} ${element.costPerHead}</p>
              </div>

              <div class="durationhour text-center d-md-flex justify-content-between">
                <p id="">Duration</p>
                <p id="">${element.duration} Hours</p>
              </div>

          </div>
 
    </div>
    
  </a>
    `

    document.getElementById("data").appendChild(cardEle);
  })

}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  
  console.log("1st", list);
  console.log("2nd", low);
  console.log("3rd", high);

 
  
  const filteredListDuration =  list.filter((adventure)=> {
    
    if(adventure.duration > low && adventure.duration <= high)
    {
       return true;
    }

  });
  return filteredListDuration;
  
} 

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  
  console.log("bottle", categoryList);
 
  let newFilteredList = [];

   list.forEach((element)=>{
    categoryList.forEach((selectedElement) => {
     if (element.category === selectedElement)
     {
      newFilteredList.push(element);
     }
    });
  });

  console.log("mouse",newFilteredList);
  return newFilteredList;

//   const filteredListCategory = list.filter((adventure)=> {
//     categoryList.includes(adventure.category);
// });

//   console.log("mouse",filteredListCategory);
//   return filteredListCategory;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  // let categoryFilter = filterByCategory(list, filters.category);

  
  console.log("Vivo",filters.category);
  console.log("hello",filters);
  console.log("laptop",list);   
  // // Place holder for functionality to work in the Stubs

  // if(filters.category.length == 0)
  // {
  //   return list;
  // }
  
  // else
  // {
  // return categoryFilter;
  // }
  
  let filteredList = list; // first we will make a copy of list array in filteredList as a new array

   if(filters.duration != null && filters.duration !== "" ) //make sure that filters.duration is there because
                                // split can be done on value rather than null and empty. so make sure 
                                // inside filters.duration should not be a null value or an empty string.
   {
   const [low,high] = filters.duration.split("-"); // so split will give us array of two things 
                                               // that is array of low and array of high
   filteredList = filterByDuration(list, parseInt(low), parseInt(high));
   }


   if(filters.category != null && filters.category.length !== 0) // array length should not be zero
   {
    filteredList = filterByCategory(filteredList, filters.category); // if we pass only list then it will filter on the original list 
                                               // but by passing filteredList we are passing the filterd list by duration 
   }

   return filteredList;
   
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
   
  localStorage.setItem("filters", JSON.stringify(filters));
  
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  
   
  // Place holder for functionality to work in the Stubs
  const filtersString = JSON.parse(localStorage.getItem("filters"));
  
  return filtersString;
  
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {

  document.getElementById("category-list").textContent = "";
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

 let categorylistPills = document.getElementById("category-list");

  filters.category.forEach((element, i)=>{

  const pillEle = document.createElement("div");  
  pillEle.setAttribute("class", "category-filter");
  pillEle.setAttribute("id", `car-${i}`);
  pillEle.innerHTML = `
                     <div>
                       ${element} <button id="${element}-${i}" type="button" style="border:1px solid; border-radius:30px;padding:0px 5px 0px 5px" onclick="closepill(event)">   X </button>
                     </div>
                    `

  categorylistPills.append(pillEle);

});

//  return categorylistPills;
}


export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};


