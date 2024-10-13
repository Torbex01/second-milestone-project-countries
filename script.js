let allCountries = []; 


window.onload = () => {
    fetchCountries();
};


function fetchCountries() {
    const url = 'https://restcountries.com/v3.1/all';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            allCountries = data;
            displayCountries(data); 
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
}

function displayCountries(countries) {
    const countriesGrid = document.getElementById('countries-grid');
    countriesGrid.innerHTML = ''; // Clear the grid before displaying

    countries.forEach(country => {
        const { name, flags, population, region } = country;

        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');

        countryCard.innerHTML = `
            <img src="${flags.svg}" alt="Flag of ${name.common}">
            <p><b>Country:</b> ${name.common}</p>
            <p><b>Population:</b> ${population.toLocaleString()}</p>
            <p><b>Region:</b> ${region}</p>
        `;

        countriesGrid.appendChild(countryCard);
    });
}

function filterCountries() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const selectedRegion = document.getElementById('region-select').value;

    let filteredCountries = allCountries;

 
    if (selectedRegion !== 'all') {
        filteredCountries = filteredCountries.filter(country => country.region === selectedRegion);
    }

  
    filteredCountries = filteredCountries.filter(country => country.name.common.toLowerCase().includes(searchInput));

    displayCountries(filteredCountries);
}
