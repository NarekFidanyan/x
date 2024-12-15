// script.js

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const generateBtn = document.getElementById("generateBtn");
const categorySelect = document.getElementById("categorySelect");

// Store preferences in localStorage
const userPreference = localStorage.getItem("category") || "motivational";
categorySelect.value = userPreference;

// Update user preference on selection
categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    localStorage.setItem("category", selectedCategory);
    fetchQuote(selectedCategory);
});

// Fetch random quote from Quotable API
async function fetchQuote(category = "motivational") {
    try {
        // Use a dynamic API endpoint based on user preference
        const response = await fetch(`http://api.quotable.io/random?tags=${category}`);
        const data = await response.json();

        // Display quote and author
        quoteText.innerText = `"${data.content}"`;
        quoteAuthor.innerText = `- ${data.author}`;
    } catch (error) {
        quoteText.innerText = "Oops! Something went wrong.";
        quoteAuthor.innerText = "";
        console.error("Error fetching quote:", error);
    }
}

// Initial fetch
fetchQuote(userPreference);

// Event listener for Generate Button
generateBtn.addEventListener("click", () => {
    const selectedCategory = categorySelect.value;
    fetchQuote(selectedCategory);
});
