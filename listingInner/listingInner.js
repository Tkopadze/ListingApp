document.addEventListener("DOMContentLoaded", () => {
  // Delete button and modal handling
  const deleteButton = document.querySelector(".deleteButton");
  const deleteModal = document.querySelector("#deleteModal");
  const confirmDelete = document.querySelector("#confirmDelete");
  const cancelDelete = document.querySelector("#cancelDelete");

  deleteButton.addEventListener("click", () => {
    deleteModal.style.display = "flex";
  });

  confirmDelete.addEventListener("click", () => {
    // Perform delete action (send API request)
    alert("Listing deleted");
    deleteModal.style.display = "none";
    // Redirect to listing page
    window.location.href = "index.html";
  });

  cancelDelete.addEventListener("click", () => {
    deleteModal.style.display = "none";
  });

  // Close modal if clicked outside
  window.addEventListener("click", (event) => {
    if (event.target === deleteModal) {
      deleteModal.style.display = "none";
    }
  });

  // Slider functionality (can be expanded with dynamic data)
  const sliderItems = document.querySelectorAll(".sliderItem");
  sliderItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Redirect to the clicked listing's detail page
      alert("Navigating to listing details");
      // window.location.href = 'listing-detail.html'; // Replace with actual path
    });
  });
});
