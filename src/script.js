//HTML elements
const countriesDiv = document.getElementById("countries");
const cardTemplate = document.getElementById("card-template");
const searchBarInput = document.getElementById("searchBar");
const filterInput = document.getElementById("filter");

document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,"
  );

  if (!res.ok) {
    throw new Error("Error fetching data");
  }

  const data = await res.json();
  console.log(data);
 
  data.forEach((country) => {
    console.log(cardTemplate);

    // Clone the card template
    const cardTemplateClone = cardTemplate.content.cloneNode(true);

    // add the page path to the href
    cardTemplateClone.querySelector("a").href =
      "./details.html?name=" + country.name.common;

    // add the source and alt text to the image
    cardTemplateClone.querySelector("img").src = country.flags.png;
    cardTemplateClone.querySelector("img").alt = country.name.common;

    // add country name to the h2
    cardTemplateClone.querySelector("h2").textContent = country.name.common;

    // add population
    cardTemplateClone.querySelector(
      "#population"
    ).innerHTML = `<strong>Population:</strong> ${country.population.toLocaleString()}`;

    // add region
    cardTemplateClone.querySelector(
      "#region"
    ).innerHTML = `<strong>Region:</strong> ${country.region}`;

    // add capital
    cardTemplateClone.querySelector(
      "#capital"
    ).innerHTML = `<strong>Capital:</strong> ${country.capital}`;

    countriesDiv.appendChild(cardTemplateClone);
  });
});


//filter section and filter

filterInput.addEventListener("change", async () => {
  const selectedRegion = filterInput.value.toLowerCase();

  // Prevent running if the placeholder option is selected
  if (!selectedRegion) return;

  try {
    // Fetch countries by region
    const res = await fetch(
      `https://restcountries.com/v3.1/region/${selectedRegion}?fields=name,flags,population,region,capital`
    );

    if (!res.ok) throw new Error("Error fetching region data");

    const regionData = await res.json();

    // Clear the current countries
    countriesDiv.innerHTML = "";

    // Loop through the region data and display it
    regionData.forEach((country) => {
      const cardTemplateClone = cardTemplate.content.cloneNode(true);

      cardTemplateClone.querySelector("a").href =
        "./details.html?name=" + country.name.common;
      cardTemplateClone.querySelector("img").src = country.flags.png;
      cardTemplateClone.querySelector("img").alt = country.name.common;
      cardTemplateClone.querySelector("h2").textContent = country.name.common;
      cardTemplateClone.querySelector("#population").textContent = `Population: ${country.population}`;
      cardTemplateClone.querySelector("#region").textContent = `Region: ${country.region}`;
      cardTemplateClone.querySelector("#capital").textContent = `Capital: ${country.capital}`;

      countriesDiv.appendChild(cardTemplateClone);
    });
  } catch (error) {
    console.error("Error fetching countries by region:", error);
  }
});


//  SEARCH SECTION
searchBarInput.addEventListener("keypress", async (e) => {
  // Run only when the user presses Enter
  if (e.key === "Enter") {
    const searchText = searchBarInput.value.trim();

    // If input is empty or contains invalid characters, clear the display and stop
    if (!searchText || !/^[a-zA-Z\s]+$/.test(searchText)) {
      countriesDiv.innerHTML = "";
      return;
    }

    try {
      // Fetch country data from API
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(searchText)}?fields=name,flags,population,region,capital`
      );

      // If no match or invalid response, clear results
      if (!res.ok) {
        countriesDiv.innerHTML = "";
        return;
      }

      const searchResults = await res.json();

      // Clear old results and show the search result(s)
      countriesDiv.innerHTML = "";
      searchResults.forEach((country) => {
        const cardClone = cardTemplate.content.cloneNode(true);

        cardClone.querySelector("a").href =
          "./details.html?name=" + country.name.common;
        cardClone.querySelector("img").src = country.flags.png;
        cardClone.querySelector("img").alt = country.name.common;
        cardClone.querySelector("h2").textContent = country.name.common;
        cardClone.querySelector("#population").textContent = `Population: ${country.population}`;
        cardClone.querySelector("#region").textContent = `Region: ${country.region}`;
        cardClone.querySelector("#capital").textContent = `Capital: ${country.capital}`;

        countriesDiv.appendChild(cardClone);
      });
    } catch (error) {
      console.error("Error fetching country:", error);
      countriesDiv.innerHTML = ""; // clear results on error
    }
  }
});

