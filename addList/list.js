const token = "9d08baae-1af9-4220-a7aa-38d2ae423ca7";
let regionSelect; // Declare regionSelect here
let citySelect; // Declare citySelect here

document.addEventListener("DOMContentLoaded", async () => {
  const regionsUrl =
    "https://api.real-estate-manager.redberryinternship.ge/api/regions";
  const citiesUrl =
    "https://api.real-estate-manager.redberryinternship.ge/api/cities";

  regionSelect = document.getElementById("region"); // Assign it inside the event listener
  citySelect = document.getElementById("city"); // Assign it inside the event listener

  try {
    // Fetch and populate regions
    const regionsResponse = await fetch(regionsUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const regions = await regionsResponse.json();

    // Populate regions in dropdown
    regions.forEach((region) => {
      const option = document.createElement("option");
      option.value = region.id;
      option.textContent = region.name;
      regionSelect.appendChild(option);
    });

    // Enable city selection only after region is chosen
    regionSelect.addEventListener("change", async () => {
      const selectedRegionId = regionSelect.value;
      if (selectedRegionId) {
        citySelect.disabled = false;

        // Fetch cities for the selected region
        const citiesResponse = await fetch(
          `${citiesUrl}?region_id=${selectedRegionId}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const cities = await citiesResponse.json();

        // Populate cities based on the selected region
        citySelect.innerHTML = ""; // Clear previous options
        cities.forEach((city) => {
          const option = document.createElement("option");
          option.value = city.id;
          option.textContent = city.name;
          citySelect.appendChild(option);
        });
      } else {
        citySelect.disabled = true;
      }
    });
  } catch (error) {
    console.error("Error fetching regions or cities:", error);
  }
});

// Handle form submission
document
  .getElementById("listingForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Get the rental status from radio buttons
    const rentalStatus = document.querySelector('input[name="status"]:checked');
    const isRental = rentalStatus && rentalStatus.value === "rent" ? 1 : 0;

    // Get selected values from the form
    const regionId = regionSelect.value; // Now accessible
    const cityId = citySelect.value; // Now accessible
    const price = document.getElementById("price").value;
    const zipCode = document.getElementById("zip").value;
    const area = document.getElementById("area").value;
    const address = document.getElementById("address").value;
    const agentId = document.getElementById("agent").value;
    const bedrooms = document.getElementById("bedrooms").value;
    const description = document.getElementById("description").value;
    const imageFile = document.getElementById("imageInput").files[0]; // Get the file input
    if (!cityId) {
      alert("Please select a valid city.");
      return;
    }
    // Append the necessary fields explicitly
    formData.append("region_id", regionId);
    formData.append("city_id", cityId);
    formData.append("price", price);
    formData.append("zip_code", zipCode);
    formData.append("area", area);
    formData.append("address", address);
    formData.append("agent_id", agentId);
    formData.append("bedrooms", bedrooms);
    formData.append("is_rental", isRental);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("description", description);

    try {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert("Listing added successfully!");
        event.target.reset(); // Reset the form after successful submission
      } else {
        const errorResponse = await response.json();
        alert(`Error adding listing: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });

// Function to fetch agents and populate the dropdown
async function loadAgents() {
  const agentSelect = document.getElementById("agent");

  try {
    const response = await fetch(
      "https://api.real-estate-manager.redberryinternship.ge/api/agents",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      alert(`Error: ${errorResponse.message}`);
      return;
    }

    const agents = await response.json();

    // Clear existing options
    agentSelect.innerHTML = '<option value="">--აირჩიეთ აგენტი--</option>';

    // Populate the dropdown with agents
    agents.forEach((agent) => {
      const option = document.createElement("option");
      option.value = agent.id; // Use agent id as the value
      option.textContent = `${agent.name} ${agent.surname}`; // Display name and surname
      agentSelect.appendChild(option);
    });
  } catch (error) {
    alert("An error occurred while connecting to the server.");
  }
}

// Call the function to load agents when the page loads
window.onload = loadAgents;
