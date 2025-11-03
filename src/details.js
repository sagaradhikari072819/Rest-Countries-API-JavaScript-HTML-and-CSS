//HTML elements
const detailCardTemplat = document.getElementById("detail-Card-template");
const detailCountries = document.getElementById("detail-countries");
// const nativeName = document.getElementById('native-name')

//back to home button
document.getElementById("backBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

//DOM work
document.addEventListener("DOMContentLoaded", async () => {
  const countryName = document.URL.split("name=")[1];
  console.log(countryName);

  const res = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
  );

  if (!res.ok) {
    throw new Error("Error Fetv=ching data");
  }
  const data = await res.json();
  console.log(data);

  data.forEach((country) => {
    console.log(detailCardTemplat);

    // Clone the card template
    const detailCrdTemplateClone = detailCardTemplat.content.cloneNode(true);

    // add the page path to the href
    // detailCrdTemplateClone.querySelector("#flag").href =
    //   "./src/pages/details.html?name=" + country.name.common;

    // add the source and alt text to the image
    detailCrdTemplateClone.querySelector("img").src = country.flags.png;
    detailCrdTemplateClone.querySelector("img").alt = country.name.common;

    // add country name to the h2
    detailCrdTemplateClone.querySelector("h2").textContent =
      country.name.common;

    //add netaveName
    const firstNativeName = Object.values(country.name.nativeName)[0].common;
    detailCrdTemplateClone.querySelector(
      "#native-name"
    ).innerHTML = `<strong> Native Name:</strong> ${firstNativeName}`;

    // add population
    detailCrdTemplateClone.querySelector(
      "#population"
    ).innerHTML = `<strong> Population:</strong> ${country.population}`;

    // add region
    detailCrdTemplateClone.querySelector(
      "#region"
    ).innerHTML = `<strong> Region:</strong> ${country.region}`;

    //Add sub-region
    detailCrdTemplateClone.querySelector(
      "#subRegion"
    ).innerHTML = `<strong> Sub Region:</strong> ${country.subregion}`;

    // add capital
    detailCrdTemplateClone.querySelector(
      "#capital"
    ).innerHTML = `<strong>Capital: </strong> ${country.capital}`;

    //add top-level-domain
    detailCrdTemplateClone.querySelector(
      "#topLevelDomain"
    ).innerHTML = `<strong>Top Level Domain: </strong> ${country.tld}`;

    //add Currencies
    const currenciesObject = Object.values(country.currencies)[0];
    if (currenciesObject && currenciesObject.name) {
      detailCrdTemplateClone.querySelector(
        "#currencies"
      ).innerHTML = `<strong>Currencies:</strong> ${currenciesObject.name}`;
    }

    //add language
    const languages = Object.values(country.languages);
    const languagesString = languages.join(", ");
    detailCrdTemplateClone.querySelector(
      "#languages"
    ).innerHTML = `<strong>Languages: </strong> ${languagesString}`;

    detailCountries.appendChild(detailCrdTemplateClone);

//adding border countries
    const borderCountries = document.querySelector("#border-countries");

    
if (country.borders && country.borders.length > 0) {
  country.borders.forEach((border) => {
    fetch(`https://restcountries.com/v3.1/alpha/${border}`)
      .then((res) => res.json())
      .then(([borderCountry]) => {
        const borderBtn = document.createElement("button");
        borderBtn.textContent = borderCountry.name.common;
        borderBtn.classList.add("border-btn");
        borderBtn.addEventListener("click", () => {
          window.location.href = `details.html?name=${borderCountry.name.common}`;
        });
        borderCountries.appendChild(borderBtn);
      })
      .catch((err) => console.error("Error fetching border country:", err));
  });
} else {
  borderCountries.innerHTML = "<p>No border countries.</p>";
}
  });
//back to home button
document.getElementById("homeBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});
});

