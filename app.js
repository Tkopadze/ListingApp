// const token = "9d08d6e8-d22d-4b61-9fc8-c32284eaaa79";
// const cities = "http://127.0.0.1:8000/api/cities";
// let selectedRegions = []; // To hold selected regions
// let selectedItem = null; // For filter selection

// async function fetchRegions() {
//   try {
//     const response = await fetch(
//       "https://api.real-estate-manager.redberryinternship.ge/api/regions",
//       {
//         method: "GET",
//         headers: {
//           accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     renderDropdownContent(data, "რეგიონის მიხედვით");
//   } catch (error) {
//     console.error("Error fetching regions:", error);
//   }
// }

// function renderDropdownContent(data, headerText) {
//   const dropdownContent = document.querySelector(".dropdownContent");
//   dropdownContent.innerHTML = "";

//   if (!Array.isArray(data)) {
//     console.error("Data is not an array");
//     return;
//   }

//   const header = document.createElement("div");
//   header.textContent = headerText;
//   header.classList.add("dropdownHeader");
//   dropdownContent.appendChild(header);

//   data.forEach((item) => {
//     const div = document.createElement("div");
//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.id = `region-${item.id}`; // Ensure each checkbox has a unique id
//     checkbox.value = item.name; // Value for the checkbox

//     const label = document.createElement("label");
//     label.htmlFor = `region-${item.id}`;
//     label.textContent = item.name; // Adjust based on your data structure

//     // Event listener to handle selection
//     checkbox.addEventListener("change", () => {
//       const selectedRegions = Array.from(
//         document.querySelectorAll(".dropdownContent input:checked")
//       ).map((checkbox) => checkbox.value);
//       document.querySelector(
//         ".result"
//       ).textContent = `Selected: ${selectedRegions.join(", ")}`;
//     });

//     div.appendChild(checkbox);
//     div.appendChild(label);
//     dropdownContent.appendChild(div);
//   });
// }

// // Call the function to fetch regions
// fetchRegions();

// document.addEventListener("DOMContentLoaded", () => {
//   const filterItems = document.querySelectorAll(".filterItem");
//   const filterDropdown = document.getElementById("filterDropdown");
//   const dropdownContent = filterDropdown.querySelector(".dropdownContent");
//   const chooseContent = filterDropdown.querySelector(".chooseContent");
//   let selectedItem = null; // Initialize selectedItem

//   // Handle filter item clicks
//   filterItems.forEach((item) => {
//     item.addEventListener("click", async (e) => {
//       e.preventDefault();
//       const filterType =
//         e.target.getAttribute("data-filter") ||
//         e.target.parentElement.getAttribute("data-filter");

//       filterDropdown.classList.add("show");
//       await fetchFilterData(filterType);
//     });
//   });

//   // Handle clicking outside the dropdown
//   document.addEventListener("click", (e) => {
//     if (
//       !filterDropdown.contains(e.target) &&
//       !e.target.closest(".filterItem")
//     ) {
//       filterDropdown.classList.remove("show");
//     }
//   });

//   // Handle choosing content
//   chooseContent.addEventListener("click", () => {
//     if (selectedItem) {
//       console.log("Selected Item:", selectedItem);
//       document.querySelector(
//         ".result"
//       ).textContent = `Selected: ${selectedItem}`;
//       filterDropdown.classList.remove("show");
//     } else {
//       filterDropdown.classList.remove("show");
//     }
//   });

//   // Function to fetch filter data
//   async function fetchFilterData(filterType) {
//     try {
//       const response = await fetch(
//         `http://localhost:8000/api/filters/${filterType}`,
//         {
//           method: "GET",
//           headers: {
//             accept: "application/json",
//             Authorization: "Bearer 9d08baae-1af9-4220-a7aa-38d2ae423ca7",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       renderDropdownContent(data, "Filter Header"); // Add header text here
//     } catch (error) {
//       console.error("Error fetching filter data:", error);
//     }
//   }
// });
// const clearUpButton = document.querySelector(".clearUp");

// clearUpButton.addEventListener("click", () => {
//   // Clear the result text
//   document.querySelector(".result").textContent = "result x";

//   // Uncheck all checkboxes in the dropdown
//   const checkboxes = document.querySelectorAll(
//     ".dropdownContent input[type='checkbox']"
//   );
//   checkboxes.forEach((checkbox) => {
//     checkbox.checked = false;
//   });

//   // Optionally, you can also clear the selectedItem for filter selection
//   selectedItem = null;
//   document
//     .querySelectorAll(".dropdownItem")
//     .forEach((d) => d.classList.remove("selected"));
// });

const token = "9d08d6e8-d22d-4b61-9fc8-c32284eaaa79";
const regionsUrl =
  "https://api.real-estate-manager.redberryinternship.ge/api/regions";
let selectedRegions = []; // To hold selected regions
let selectedPrices = []; // To hold selected price ranges

document.addEventListener("DOMContentLoaded", () => {
  const filterItems = document.querySelectorAll(".filterItem");
  const filterDropdown = document.getElementById("filterDropdown");
  const dropdownContent = filterDropdown.querySelector(".dropdownContent");
  const dropdownHeader = filterDropdown.querySelector(".dropdownHeader");
  const chooseButton = filterDropdown.querySelector(".chooseButton");
  const clearButton = document.querySelector(".clearUp");
  const resultElement = document.querySelector(".result"); // Element to show the results
  let selectedItem = null;

  // Function to show the dropdown
  function showDropdown() {
    filterDropdown.style.display = "block";
  }

  // Function to hide the dropdown
  function hideDropdown() {
    filterDropdown.style.display = "none";
  }

  filterItems.forEach((item) => {
    item.addEventListener("click", async (e) => {
      e.preventDefault();
      const filterType = e.target.getAttribute("data-filter");
      showDropdown(); // Show dropdown when a filter item is clicked

      if (filterType === "region") {
        dropdownHeader.textContent = "რეგიონის მიხედვით";
        await fetchRegions();
      } else if (filterType === "price") {
        dropdownHeader.textContent = "საფასო კატეგორია";
        renderPriceFilter();
      }
    });
  });

  // Fetch regions data and render the dropdown
  async function fetchRegions() {
    try {
      const response = await fetch(regionsUrl, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      renderRegionFilter(data);
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  }

  // Render regions in the dropdown
  function renderRegionFilter(data) {
    dropdownContent.innerHTML = ""; // Clear previous content

    data.forEach((item) => {
      const div = document.createElement("div");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `region-${item.id}`;
      checkbox.value = item.name;

      const label = document.createElement("label");
      label.htmlFor = `region-${item.id}`;
      label.textContent = item.name;

      checkbox.addEventListener("change", () => {
        selectedRegions = Array.from(
          document.querySelectorAll(".dropdownContent input:checked")
        ).map((checkbox) => checkbox.value);
        updateResults();
      });

      div.appendChild(checkbox);
      div.appendChild(label);
      dropdownContent.appendChild(div);
    });
  }

  // Render price filter in the dropdown
  function renderPriceFilter() {
    dropdownContent.innerHTML = ""; // Clear previous content

    const row1 = document.createElement("div");
    row1.className = "inputRow";

    const minInput = document.createElement("input");
    minInput.type = "number";
    minInput.placeholder = "Min ₾";

    const maxInput = document.createElement("input");
    maxInput.type = "number";
    maxInput.placeholder = "Max ₾";

    row1.appendChild(minInput);
    row1.appendChild(maxInput);
    dropdownContent.appendChild(row1);

    // Price range options
    const prices = [50000, 100000, 150000, 200000, 250000];
    prices.forEach((price) => {
      const row = document.createElement("div");
      row.className = "priceRow";

      const priceInput1 = document.createElement("input");
      priceInput1.type = "checkbox";
      priceInput1.value = price;
      const label1 = document.createElement("label");
      label1.textContent = `${price} ₾`;

      row.appendChild(priceInput1);
      row.appendChild(label1);

      dropdownContent.appendChild(row);

      // Handle price selection
      priceInput1.addEventListener("change", updateSelectedPrices);
    });
  }

  // Update selected prices
  function updateSelectedPrices() {
    selectedPrices = Array.from(
      document.querySelectorAll(
        ".dropdownContent input[type='checkbox']:checked"
      )
    ).map((checkbox) => checkbox.value);
    updateResults();
  }

  // Update the displayed results
  function updateResults() {
    let regionText =
      selectedRegions.length > 0
        ? `რეგიონის მიხედვით: ${selectedRegions.join(", ")}`
        : "";
    let priceText =
      selectedPrices.length > 0
        ? `ფასის მიხედვით: ${selectedPrices.join(", ")} ₾`
        : "";

    resultElement.textContent = `${regionText}${
      regionText && priceText ? " | " : ""
    }${priceText}`;
  }

  // Handle "Choose" button click
  chooseButton.addEventListener("click", () => {
    if (selectedRegions.length > 0 || selectedPrices.length > 0) {
      console.log("Selected Regions:", selectedRegions);
      console.log("Selected Prices:", selectedPrices);
    }

    hideDropdown(); // Hide dropdown when "Choose" is clicked
  });

  // Handle clicking outside the dropdown to close it
  document.addEventListener("click", (e) => {
    if (
      !filterDropdown.contains(e.target) &&
      !e.target.closest(".filterItem")
    ) {
      hideDropdown(); // Hide dropdown if clicked outside
    }
  });

  // Handle clear selections
  clearButton.addEventListener("click", () => {
    selectedRegions = [];
    selectedPrices = [];
    resultElement.textContent = "Selected: ";
    const checkboxes = document.querySelectorAll(
      ".dropdownContent input[type='checkbox']"
    );
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("agentModal");
  const openModalButton = document.querySelector(".addAgent");
  const closeModalButton = document.getElementById("closeModal");

  // Open the modal
  openModalButton.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Close the modal
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close the modal when clicking outside the modal content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
const submitButton = document.getElementById("submitAgent");

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submitAgent");
  const agentForm = document.getElementById("agentForm");

  agentForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById("agentName").value;
    const surname = document.getElementById("agentSurname").value;
    const email = document.getElementById("agentEmail").value;
    const phone = document.getElementById("agentPhone").value;
    const avatarInput = document.getElementById("agentAvatar");
    const avatarFile = avatarInput.files[0];

    if (!avatarFile) {
      alert("Avatar is required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("avatar", avatarFile);

    try {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/agents",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer 9d08baae-1af9-4220-a7aa-38d2ae423ca7",
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Agent created:", result);
        alert("Agent successfully added!");
        // Close the modal or reset the form as needed
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(
          errorData.message || "An error occurred while creating the agent."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while connecting to the server.");
    }
  });
});
