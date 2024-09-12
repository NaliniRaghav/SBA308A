import {
  fetchRandomDog,
  fetchBreeds,
  fetchBreedDog,
  deleteFavoriteDog,
  dogApiUrl,
  apiKey,
} from "./api.js";

const getRandomDogButton = document.getElementById("getRandomDog");
const searchBreedButton = document.getElementById("searchBreed");
const breedSelector = document.getElementById("breedSelector");
const dogGallery = document.getElementById("dogGallery");
const addFavoriteButton = document.getElementById("addFavorite");
const favoriteDogsContainer = document.getElementById("favoriteDogsContainer");

// Function to display multiple dog images in the gallery (limits to 5)
function displayDogImages(imageUrls) {
  dogGallery.innerHTML = "";
  imageUrls.forEach((imageUrl) => {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Dog Image";
    dogGallery.appendChild(img); // Append each image to the gallery
  });
}

// Function to display a single dog image in the gallery
function displayDogImage(imageUrl) {
  dogGallery.innerHTML = "";
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = "Dog Image";
  dogGallery.appendChild(img);
}

// Function to populate the breed dropdown
function populateBreedDropdown(breeds) {
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id; // Use breed ID
    option.textContent = breed.name;
    breedSelector.appendChild(option);
  });
}

// Function to add the current image to favorites and send a POST request
async function addToFavorites() {
  const currentDogImage = dogGallery.querySelector("img");
  if (!currentDogImage) {
    alert("No dog image to add to favorites!");
    return;
  }

  try {
    const response = await fetch(`${dogApiUrl}/favourites`, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_id: currentDogImage.src, // Use the image URL for saving favorites
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to add favorite");
    }

    const favoriteImg = currentDogImage.cloneNode();
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete 🗑️";
    deleteBtn.classList.add("delete-btn");
    favoriteImg.setAttribute("data-id", data.id);

    deleteBtn.addEventListener("click", async () => {
      await deleteFavoriteDog(data.id);
      favoriteDogsContainer.removeChild(favoriteImg);
      favoriteDogsContainer.removeChild(deleteBtn);
    });

    favoriteDogsContainer.appendChild(favoriteImg);
    favoriteDogsContainer.appendChild(deleteBtn);
  } catch (error) {
    console.error("Error adding to favorites:", error);
  }
}

// Event listeners

getRandomDogButton.addEventListener("click", async () => {
  const imageUrl = await fetchRandomDog();
  displayDogImage(imageUrl);
});

searchBreedButton.addEventListener("click", async () => {
  const breedId = breedSelector.value;
  if (!breedId) {
    alert("Please select a breed");
    return;
  }
  const imageUrls = await fetchBreedDog(breedId, 5);
  displayDogImages(imageUrls);
});

addFavoriteButton.addEventListener("click", addToFavorites);

(async () => {
  const breeds = await fetchBreeds();
  populateBreedDropdown(breeds);
})();
