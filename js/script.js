"use strict";

const elForm = document.querySelector(".js-form");
const elInput = elForm.querySelector("#country");
const elList = document.querySelector(".country-list");

const loader = document.querySelector(".js-loader")

function loaderControl () {
    loader.classList.add("hidden")
}

function errorText(text) {
    elList.innerHTML = text
}

const fettchingAllCountry = () => {
    fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => rendringCountries(data))
    .catch(e => errorText(e.message))
    .finally(loaderControl)
}

fettchingAllCountry()

function rendringCountries (countries) {

   countries.forEach (country => {
        elList.innerHTML += `
            <li class="group relative bg-purple-100 pb-2">
                <div
                    class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img src="${country.flags.png}"
                        alt="${country.name.official}"
                        class="h-full w-full object-cover lg:h-full lg:w-full">
                </div>
                <div class="mt-4 text-center">
                    <div>
                        <h3 class="text-lg text-gray-700">
                            Name: ${country.name.official}
                        </h3> 
                        <p class=" text-lg text-gray-500">Capital: ${country.capital}</p>
                    </div>
                    <p class="text-md font-medium text-gray-900">Popilation: ${country.population}</p>
                </div>
            </li>
        `
   })
}

const fetchingCountry = async (countryName) => {
    elList.innerHTML = ""

    try{
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

        const data = await response.json()
        rendringCountries(data);
    }catch(e) {
        errorText("Bu yerda hatolik bor");
    }finally{ 
        loader.classList.add("hidden")
    }
}

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    loader.classList.remove("hidden")
    let countryName = elInput.value.trim();

    fetchingCountry(countryName)
}) 



