const btnSearch = document.getElementById("btnSearch");
const clearBtn = document.getElementById("btnReset");

function searchCondition() {
  const input = document.getElementById("conditionInput").value.toLowerCase();
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = ""; // Clear previous results

  //   const options = {
  //     timeZone: "America/New_York",
  //     hour12: true,
  //     hour: "numeric",
  //     minute: "numeric",
  //     second: "numeric",
  //   };
  //   const newYorkTime = new Date().toLocaleTimeString("en-US", options);
  //   const timeDiv = document.createElement("div");
  //   timeDiv.innerHTML = `<p>Current Local Time (America/New_York): ${newYorkTime} </p>`;
  //   timeDiv.classList.add("time");
  //   resultDiv.append(timeDiv);

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const matchedPlaces = [];

      // Helper function to match input with name or description
      function matches(keyword, item) {
        if (
          item &&
          typeof item.name === "string" &&
          typeof item.description === "string"
        ) {
          return (
            item.name.toLowerCase().includes(keyword) ||
            item.description.toLowerCase().includes(keyword)
          );
        }
        return false;
      }

      if (input === "temple" || input === "temples") {
        // Show all temples
        data.temples.forEach((temple) => {
          matchedPlaces.push(temple);
        });
      } else if (input === "beach" || input === "beaches") {
        // Show all beaches
        data.beaches.forEach((beach) => {
          matchedPlaces.push(beach);
        });
      } else {
        // Search through countries and their cities
        data.countries.forEach((country) => {
          if (matches(input, country)) {
            matchedPlaces.push(country);
          }

          country.cities.forEach((city) => {
            if (matches(input, city)) {
              matchedPlaces.push(city);
            }
          });
        });

        // Search through temples
        data.temples.forEach((temple) => {
          if (matches(input, temple)) {
            matchedPlaces.push(temple);
          }
        });

        // Search through beaches
        data.beaches.forEach((beach) => {
          if (matches(input, beach)) {
            matchedPlaces.push(beach);
          }
        });
      }

      // Display results
      if (matchedPlaces.length > 0) {
        matchedPlaces.forEach((place) => {
          const placeDiv = document.createElement("div");
          placeDiv.classList.add("place");

          placeDiv.innerHTML = `
            <img src="${place.imageUrl}" alt="${place.name}">
            <h4>${place.name}</h4>
            <p>${place.description}</p>
          `;

          resultDiv.appendChild(placeDiv);
        });
      } else {
        resultDiv.innerHTML = "Result not found.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.innerHTML = "An error occurred while fetching data.";
    });
}

function clearSearchResults() {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
}

btnSearch.addEventListener("click", searchCondition);
clearBtn.addEventListener("click", clearSearchResults);
