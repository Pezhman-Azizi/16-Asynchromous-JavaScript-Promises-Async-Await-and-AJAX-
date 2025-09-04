'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function(msg){
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity =1
}

const renderCountry = function(data, className = ''){

    const html = `
          <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
              <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
              <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
          </article>`

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;

  };
// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

// this is for AJAX call
/*
const getCountryData = function (country){

  const request = new XMLHttpRequest();
  // And second, we need a string containing the URL to which the Ajax call should actually be made.
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
          <article class="country">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
              <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
              <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
          </article>`

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  })

}

getCountryData('usa')
getCountryData('portugal')

*/
// ------------------------------------ how the web works: request ans responses
//  see the screen shot

// ------------------------------------ welcome to cal back hell


/*
const getCountryAndNeighbor = function (country){

  // AJAX call country 1
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // render country 1:
    renderCountry(data);

    // get neighbor country 2:
    const [neighbor] = data.borders;

    if(!neighbor) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();

    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function(){
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    })
  })

}

// getCountryAndNeighbor('portugal');
getCountryAndNeighbor('usa');
*/

// -------------------------------------------------- promises and fetch api:
/*
//  const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

const request = fetch(`https://restcountries.com/v2/name/portugal`)
console.log(request);
*/

// -------------------------------------------------- consuming promises:
/*
// const getCountryData = function(country){
//   // note: calling a fetch immidiately returns a promise. And in the beginning this promise (as being an asynchoronous) is pending
//   // and there are methods on the promise. one of them is called then 👇🏻
//   fetch(`https://restcountries.com/v2/name/${country}`)
//   .then(function(response){
//     console.log(response);
//     return response.json();
//   }).then (function(data){
//     console.log(data);
//     renderCountry(data[0])
//   })
// }


const getCountryData = function(country){
  // note: calling a fetch immidiately returns a promise. And in the beginning this promise (as being an asynchoronous) is pending
  // and there are methods on the promise. one of them is called then 👇🏻
  fetch(`https://restcountries.com/v2/name/${country}`)
  .then(response => response.json())
  .then (data => renderCountry(data[0])
  )
}
getCountryData('portugal');
*/

// -------------------------------------------------- chaining promises:
/*
const getCountryData = function(country){
  // country 1:

  // note: calling a fetch immidiately returns a promise. And in the beginning this promise (as being an asynchoronous) is pending
  // and there are methods on the promise. one of them is called then 👇🏻
  fetch(`https://restcountries.com/v2/name/${country}`)
  .then(response => response.json())
  .then (data => {
    renderCountry(data[0]);
    console.log(data[0]);
    const neighbor = data[0].borders?.[0];

    if(!neighbor) return;

    // country 2:
    return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
  })
  .then(response => response.json())
  .then(data => renderCountry(data, 'neighbour'))
}
getCountryData('portugal')

*/

// -------------------------------------------------- handling rejected promises:
/*
const getCountryData = function(country){
  // country 1:

  // note: calling a fetch immidiately returns a promise. And in the beginning this promise (as being an asynchoronous) is pending
  // and there are methods on the promise. one of them is called then 👇🏻
  fetch(`https://restcountries.com/v2/name/${country}`)
  .then(response => response.json())
  .then (data => {
    renderCountry(data[0]);
    console.log(data[0]);
    const neighbor = data[0].borders?.[0];

    if(!neighbor) return;

    // country 2:
    return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
  })
  .then(response => response.json())
  .then(data => renderCountry(data, 'neighbour'))
  .catch(err => {
    console.error(`${err} 💣 💣 💣`);
    renderError(` something went wrong 💣 💣 💣 ${err.message}. Try again. `)
  })
  .finally(() => {
    countriesContainer.style.opacity = 1;
  })
};

btn.addEventListener('click', function(){
  getCountryData('portugal')
});

getCountryData('jlhgdviuy')
*/
// ---------------------------------------------------- throwing errors manually:
/*
const getJSON = function (url, errorMsg ='something went wrong') {
  return fetch(url).then( response => {
    if(!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// const getCountryData = function(country){
//   // country 1:

//   // note: calling a fetch immidiately returns a promise. And in the beginning this promise (as being an asynchoronous) is pending
//   // and there are methods on the promise. one of them is called then 👇🏻
//   fetch(`https://restcountries.com/v2/name/${country}`)
//   .then(response => {
//     console.log(response);

//     if(!response.ok)
//       throw new Error(`country not found ${response.status}`)

//     return response.json()
//   })
//   .then (data => {
//     renderCountry(data[0]);
//     console.log(data[0]);

//     // const neighbor = data[0].borders?.[0];
//     const neighbor = 'hjsdfgyasdgfjyadhsgfadsyfg';

//     if(!neighbor) return;

//     // country 2:
//     return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
//   })
//   .then(response => {

//       if(!response.ok)
//         throw new Error(`country not found ${response.status}`);

//     return response.json()
//   })
//   .then(data => renderCountry(data, 'neighbour'))
//   .catch(err => {
//     console.error(`${err} 💣 💣 💣`);
//     renderError(` something went wrong 💣 💣 💣 ${err.message}. Try again. `)
//   })
//   .finally(() => {
//     countriesContainer.style.opacity = 1;
//   })
// };

const getCountryData = function(country){
  // country 1:

  // note: calling a fetch immidiately returns a promise. And in the beginning this promise (as being an asynchoronous) is pending
  // and there are methods on the promise. one of them is called then 👇🏻

  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
  .then (data => {
    renderCountry(data[0]);
    console.log(data[0]);

    const neighbor = data[0].borders?.[0];

    if(!neighbor) throw new Error("no neighbor found");

    // country 2:
    return getJSON(`https://restcountries.com/v2/alpha/${neighbor}`, 'country not found');
  })
  .then(data => renderCountry(data, 'neighbour'))
  .catch(err => {
    console.error(`${err} 💣 💣 💣`);
    renderError(` something went wrong 💣 💣 💣 ${err.message}. Try again. `)
  })
  .finally(() => {
    countriesContainer.style.opacity = 1;
  })
};


btn.addEventListener('click', function(){
  getCountryData('australia')
});
*/
// -------------------------------------------------------------------------------------------------challenge-1

// Coding Challenge #1
// In this challenge you will build a function 'whereAmI' which renders a country
// only based on GPS coordinates. For that, you will use a second API to geocode
// coordinates. So in this challenge, you’ll use an API on your own for the first time 😁
// Your tasks:
// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
// and a longitude value ('lng') (these are GPS coordinates, examples are in test
// data below).
// 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
// to convert coordinates to a meaningful location, like a city and country name.
// Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
// will be done to a URL with this format:
// https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
// promises to get the data. Do not use the 'getJSON' is cheating 😉
// 3. Once you have the data, take a look at it in the console to see all the attributes
// that you received about the provided location. Then, using this data, log a
// message like this to the console: “You are in Berlin, Germany”
// 4. Chain a .catch method to the end of the promise chain and log errors to the
// console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you
// will get this error with code 403. This is an error with the request. Remember,
// fetch() does not reject the promise in this case. So create an error to reject
// the promise yourself, with a meaningful error message
// function we created, that
// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant
// attribute from the geocoding API result, and plug it into the countries API that
// we have been using.
// 7. Render the country and catch any errors, just like we have done in the last
// lecture (you can even copy this code, no need to type the same code)
// Test data:
// § Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474
// GOOD LUCK 😀

// const url = https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

const renderError2 = function(msg){
  countriesContainer.insertAdjacentText('beforeend', msg)
  countriesContainer.style.opacity = 1;
}

const getJSON = function(url, errorMsg ='something went wrong'){

  return fetch(url)
  .then(response => {
    if(!response.ok)
      throw new Error(`problem with geocoding ${response.status}`)
    return response.json()

  });

};
/*
const whereAmI = function(lat, lng){
  getJSON(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`, 'country NOT found')
  .then(data => {
    console.log(data);
    console.log(`you are in ${data.city}, ${data.countryName}`)

    const country = data.countryName;
    // const country = 'kjdbngiofudh;k';
    if(!country) throw new Error ('country NOT found')

    //countryName extraction
    return getJSON(`https://restcountries.com/v2/name/${country}`)
  })
  .then(data2 => {
    // console.log(data2);
    renderCountry(data2[0])
  })
  .catch(err => {
    console.error(err),
    renderError2(`${err.message} `)
  }
  )
  .finally(()=>{
    countriesContainer.style.opacity = 1;
  })
}

whereAmI(19.037, 72.873)
whereAmI(52.508, 13.381)
whereAmI(-33.933, 18.474)
*/


// ------------------------------------------------------------------------------------------------ 269-Async-behind-the-scenes-the-event-loop
// see the screenshot on PR


// ------------------------------------------------------------------------------------------------ 270-the event loop in practice
/*
console.log('test start');
setTimeout(() => {
  console.log('0 sec timer');
}, 0);
// this one is the promise that immediately resolves with a success value!
Promise.resolve('Resolved promise 1').then(res => console.log(res)
)

Promise.resolve('resolved promise 2').then(res => {
  for (let i =0; i<10000000000; i++){}
  console.log(res);
})

console.log('test end');
*/
// ------------------------------------------------------------------------------------------------ 271. building a simple promise
/*
const lotteryPromise = new Promise(function(resolve, reject){

  console.log('lottery draw is happening...');

  setTimeout(() =>{

    if(Math.random() >= 0.5){
      resolve('You win 💰')
    }
    else{
      reject( new Error('you lost your money'))
    }
  }, 2000);

})

lotteryPromise
.then(res => console.log(res))
.catch(err => console.error(err))

// Promisifying set time out:

const wait = function(seconds){
  return new Promise(function(resolve){j
    setTimeout(resolve, seconds * 1000);
  })
}

wait(1)
.then(() => {
  console.log('i waited for 1 seconds')
  return wait(1)
})
.then(() => {
  console.log('i waited for 2 second')
  return wait(2)
})
.then(() => {
  console.log('i waited for 3 seconds')
  return wait(3)
})
.then(() => {
  console.log('i waited for 4 seconds')
  return wait(4)
})

//  we have resolve and reject static methods that will return a promise immidiately:
Promise.resolve('abc').then( x => console.log(x));
Promise.reject(new Error('there is a problem you see')).catch( x => console.error(x));
*/

// ---------------------------------------------------------------- 272. Promisifying the Geolocation API

/*
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => reject(err)
// );
// console.log('getting position');

const getPosition = function(){
    return new Promise(function(resolve, reject){
    //   navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}
getPosition().then( pos => console.log(pos))


const whereAmI = function(){

  getPosition().then(pos => {
    const {latitude: lat, longitude: lng} = pos.coords;
    return getJSON(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`, 'country NOT found')
  })
  .then(data => {
    const {city, countryName, countryCode} = data;
    console.log(`you are in ${city}, ${countryName}`)

    const country = data.countryName;
    if(!countryCode) throw new Error ('country NOT found')

    //countryName extraction
    return getJSON(`https://restcountries.com/v2/name/${countryCode}`)
  })

  .then(data2 => {
    // console.log(data2);
    renderCountry(data2[0])
  })

  .catch(err => {
    console.error(err),
    renderError2(`${err.message} `)
  }
  )
  .finally(()=>{
    countriesContainer.style.opacity = 1;
  })
}
btn.addEventListener('click', whereAmI)
*/

// ---------------------------------------------------------------  274-consuming promises with Async/Await
/*
const getPosition = function(){
    return new Promise(function(resolve, reject){
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

const whereAmI = async function(){

    // Geolocation:
    const pos = await getPosition();
    console.log(pos);
    const {latitude: lat, longitude: lng} = pos.coords

    // Reverse GeoCoding:
    const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);

    const dataGeo = await resGeo.json()
    console.log(dataGeo);

    // country data:
    const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.countryCode}`);
    const data = await res.json();
    console.log(data);
    renderCountry(data[0])

}
whereAmI()
*/

// ---------------------------------------------------------------  275-Error handling with try and catch

const getPosition = function(){
    return new Promise(function(resolve, reject){
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

const whereAmI = async function(){

    try{  // Geolocation:
      const pos = await getPosition();
      console.log(pos);
      const {latitude: lat, longitude: lng} = pos.coords

      // Reverse GeoCoding:
      const resGeo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);

      if(!resGeo.ok) throw new Error('problem getting location data');

      const dataGeo = await resGeo.json()
      console.log(dataGeo);

      // country data:
      const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.countryCode}`);

      if(!res.ok) throw new Error('problem getting country');

      const data = await res.json();
      console.log(data);
      renderCountry(data[0])

    }
    catch(err){
      console.error(`${err} 💣`);
      renderError(`💣 ${err.message}`)
    }
}
whereAmI()
whereAmI()
whereAmI()
whereAmI()
whereAmI()
