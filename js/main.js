import conditions from '../conditions.js'

console.log(conditions)

const APIKEY = "a0435eb8ae85427cb7c83105230106";

const form = document.querySelector(".form");

const header = document.querySelector(".header");

async function getWeather(APIKEY, cityValue) {
  let weather = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${cityValue}`
  );
  let result = await weather.json();

  return result;
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let cityValue = form.querySelector('[name="city"]').value.trim();

  const result = await getWeather(APIKEY, cityValue);
  if (result.error) {
    clearCard();
    showError();
  } else {
    clearCard();

      
      let info = conditions.find((el) => el.code === result.current.condition.code)
  
      let fileName =  (result.current.is_day ? info.day : info.night) + '.png';
      let filePath = result.current.is_day ? 'day/'+fileName : 'night/'+fileName;

      console.log('fileName', fileName)
   

    showTheWeather(result,info,filePath);
  }
});

function showTheWeather(result,info,filePath) {
  const html = `
    <main class="card">
         <h2 class="card-city">${result.location.name}<span>${result.location.country}</span></h2>
         <div class="card-weather">
             <div class="card-value">${result.current.temp_c}<sup>°C</sup> </div>
             <img class="card-image" src="./image/${filePath}"  alt="">
         </div>
        <div class="card-desc">${result.current.is_day ? info.languages[23]['day_text'] : info.languages[23]['night_text']}</div>
    </main>
    `;

  header.insertAdjacentHTML("afterend", html);
}
function showError(result) {
  const html = `
    <main class="card">
         <h2 class="card-city">NOT FOUND</h2>
    </main>
    `;

  header.insertAdjacentHTML("afterend", html);
}
function clearCard() {
  const prevCard = document.querySelector(".card");
  if (prevCard) {
    prevCard.remove();
  }
}
