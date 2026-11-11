
// 1. Select HTML elements

const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");


// 2. Fetch users from the API

async function loadUsers() {

    try {

        // Show loading message
        showLoading();

        // Send request to API
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        // Check if request was successful
        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        // Convert response into JavaScript data
        const users = await response.json();

        // Display users on webpage
        displayUsers(users);

    } catch (error) {

        // Display error if something goes wrong
        showError(error.message);

    } finally {

        // Hide loading message
        hideLoading();

    }
}


// 3. Show loading message

function showLoading() {

    loading.classList.remove("hidden");

    container.innerHTML = "";

}


// 4. Hide loading message

function hideLoading() {

    loading.classList.add("hidden");

}


// 5. Display error message

function showError(message) {

    errorDiv.textContent = `Error: ${message}`;

    errorDiv.classList.remove("hidden");

}


// 6. Display users

function displayUsers(users) {

    container.innerHTML = users.map(user => `

        <div class="user-card">

            <h2>${user.name}</h2>

            <p>📧 ${user.email}</p>

            <p>🏢 ${user.company.name}</p>

            <p>📍 ${user.address.city}</p>

        </div>

    `).join("");

}


// 7. Initialize the application

loadUsers();
