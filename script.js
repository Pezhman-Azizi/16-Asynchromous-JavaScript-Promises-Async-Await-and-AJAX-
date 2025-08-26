'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderError = function(message){
  countriesContainer.insertAdjacentText('beforeend', message);
  // countriesContainer.style.opacity =1
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
    // countriesContainer.style.opacity = 1;

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
    renderError(`something went wrong 💣 💣 💣 ${err.message}. Try again!`)
  })
  .finally(() => {
    countriesContainer.style.opacity =1
  })
};

btn.addEventListener('click', function(){
  getCountryData('portugal')
})

getCountryData('kudghrybiu')
