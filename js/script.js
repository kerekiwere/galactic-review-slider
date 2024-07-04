let slideIndex = 0;
let reviews;

// Function to generate HTML for ratings
function loadRating(rating) {
  const output = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      output.push(`<i class="fa-solid fa-rocket active"></i>`);
    } else {
      output.push(`<i class="fa-solid fa-rocket"></i>`);
    }
  }

  return output.map((item) => item).join("");
}

// Function to generate HTML for review
function loadReviews(review) {
  return `
    <div class="review">
      <div class="review__rating">
        ${loadRating(review.rating)}
      </div>
      <p class="review__text">${review.text}</p>
      <div class="review__author">
        <picture class="review__author-picture">
          <img src="${review.picture}" alt="Portrait of ${review.name}">
        </picture>
        <div class="review__author-details">
          <p class="review__author-name">${review.name},</p>
          <p class="review__author-location">${review.location}</p>
        </div>
      </div>
    </div>
  `;
}

// Function to fetch data from JSON file
async function fetchData() {
  const url = "reviews.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    reviews = await response.json();
    document.getElementById("reviews").innerHTML = reviews
      .map(loadReviews) // Generate HTML for each review in reviews array
      .join(""); // Join all HTML strings into a single string
  } catch (error) {
    console.error(error.message);
  }
}
fetchData();

// Function to slide reviews left or right
function slideReviews(e) {
  if (e.currentTarget.id === "arrow-right") {
    // Move index to next review or loop back to start
    slideIndex === reviews.length - 1 ? (slideIndex = 0) : slideIndex++;
  } else if (e.currentTarget.id === "arrow-left") {
    // Move index to previous review or loop back to end
    slideIndex === 0 ? (slideIndex = reviews.length - 1) : slideIndex--;
  }

  document.getElementById("reviews").style.transform = `translate(${
    -100 * slideIndex
  }%)`;
}

document.getElementById("arrow-right").addEventListener("click", slideReviews);
document.getElementById("arrow-left").addEventListener("click", slideReviews);
