
// 1. Store all users

let allUsers = [];


// 2. Select HTML elements

const searchInput = document.getElementById("search");

const sortSelect = document.getElementById("sort");

const cityFilter = document.getElementById("city-filter");

const container = document.getElementById("users-container");

const loading = document.getElementById("loading");

const errorDiv = document.getElementById("error");

const resultsCount = document.getElementById("results-count");


// 3. Fetch users from the API

async function fetchUsers() {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return response.json();

}


// 4. Initialize the application

async function init() {

    try {

        loading.classList.remove("hidden");

        allUsers = await fetchUsers();

        // Populate city dropdown
        populateCities();

        // Display all users
        displayUsers(allUsers);

        // Set up event listeners
        setupEventListeners();

    } catch (error) {

        errorDiv.textContent = error.message;

        errorDiv.classList.remove("hidden");

    } finally {

        loading.classList.add("hidden");

    }

}


// 5. Populate city dropdown

function populateCities() {

    const cities = [...new Set(
        allUsers.map(user => user.address.city)
    )];

    cities.sort((a, b) => a.localeCompare(b));

    cities.forEach(city => {

        const option = document.createElement("option");

        option.value = city;

        option.textContent = city;

        cityFilter.appendChild(option);

    });

}


// 6. Set up event listeners

function setupEventListeners() {

    // Search event

    searchInput.addEventListener("input", applyFilters);


    // Sorting event

    sortSelect.addEventListener("change", applyFilters);


    // City filter event

    cityFilter.addEventListener("change", applyFilters);

}


// 7. Apply search, sorting and city filtering

function applyFilters() {

    const query = searchInput.value.toLowerCase().trim();

    const selectedCity = cityFilter.value;

    const sortOrder = sortSelect.value;


    // Search by name or email

    let filteredUsers = allUsers.filter(user => {

        const matchesSearch =
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query);

        const matchesCity =
            selectedCity === "all" ||
            user.address.city === selectedCity;

        return matchesSearch && matchesCity;

    });


    // Sort users by name

    filteredUsers.sort((a, b) => {

        if (sortOrder === "az") {

            return a.name.localeCompare(b.name);

        } else {

            return b.name.localeCompare(a.name);

        }

    });


    // Display filtered and sorted users

    displayUsers(filteredUsers);

}


// 8. Display users

function displayUsers(users) {

    container.innerHTML = "";

    resultsCount.textContent =
        `Showing ${users.length} user(s)`;


    if (users.length === 0) {

        container.textContent = "No users found.";

        return;

    }


    users.forEach(user => {

        const card = document.createElement("div");

        card.className = "user-card";


        const name = document.createElement("h2");

        name.textContent = user.name;


        const email = document.createElement("p");

        email.textContent = `📧 ${user.email}`;


        const company = document.createElement("p");

        company.textContent = `🏢 ${user.company.name}`;


        const city = document.createElement("p");

        city.textContent = `📍 ${user.address.city}`;


        card.append(name, email, company, city);

        container.appendChild(card);

    });

}


// 9. Start the application

init();
