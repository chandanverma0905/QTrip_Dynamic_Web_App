import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  
  try{
    let getData = await fetch(`${config.backendEndpoint}/reservations/`);
     
    let finalData = await getData.json();
    
    return finalData;
  }

  catch(err)
  {
     return null;
  }
    
  // Place holder for functionality to work in the Stubs
  
}
 
//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
         
  // Conditionally render the no-reservation-banner and reservation-table-parent
  
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
   
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  
     
  let noResDone = document.getElementById("no-reservation-banner");

  let resDone = document.getElementById("reservation-table-parent");

  if(reservations.length > 0)
  {
     noResDone.style.display = "none";
     resDone.style.display = "block";
  }

  else
  {
     noResDone.style.display = "block";
     resDone.style.display = "none";
  }
  
  let showRes = document.getElementById("reservation-table");

   for(let i=0; i< reservations.length; i++)
   { 
      let tRow = document.createElement("tr");

      let date = new Date(reservations[i].date);
      
      let BookingTime = new Date(reservations[i].time);
      
       //refer to:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString


      //refer to:     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
      
      
       
       
      const options = {year:"numeric" , month:"long", day:"numeric"};
      // refer to:    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
      
      
      
      
      tRow.innerHTML = `
                         <td>${reservations[i].id}</td>
                         <td>${reservations[i].name}</td>
                         <td>${reservations[i].adventureName}</td>
                         <td>${reservations[i].person}</td>
                         <td>${date.toLocaleDateString("en-IN")}</td>
                         <td>${reservations[i].price}</td>
                         <td>${BookingTime.toLocaleTimeString("en-IN", options).split(" at").join(",")}</td> 
                         <td id ="${reservations[i].id}"><a href="../detail/?adventure=${reservations[i].adventure}" class="reservation-visit-button">Visit Adventure </a> </td>
                          `;
      showRes.append(tRow); 
      
   }
    
}

export { fetchReservations, addReservationToTable };
