// Task 12.1: Fetch API Basics
// Run with: node task-12-1.js   (needs Node.js 18 or newer, where fetch is built in)

const BASE_URL = "https://jsonplaceholder.typicode.com";

// ---------- Exercise 1: Your first fetch (.then version) ----------

function exercise1() {
    console.log("\n=== Exercise 1: fetch with .then() ===");

    return fetch(`${BASE_URL}/users/1`)
        .then(response => {
            console.log("Status:", response.status);
            console.log("OK:", response.ok);
            return response.json(); // parse JSON
        })
        .then(data => {
            console.log("User data:", data);
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
}

// ---------- Exercise 2: Fetch with async/await ----------

async function getUser(id) {
    try {
        const response = await fetch(`${BASE_URL}/users/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

async function exercise2() {
    console.log("\n=== Exercise 2: fetch with async/await ===");
    const user = await getUser(1);
    console.log(user);
}

// ---------- Practice ----------

// Reusable helper: fetch a URL, check the response, return parsed JSON
async function fetchJSON(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

// 1. A single user
async function displaySingleUser() {
    console.log("\n=== Practice 1: A single user ===");
    try {
        const user = await fetchJSON(`${BASE_URL}/users/1`);
        console.log(`Name:    ${user.name}`);
        console.log(`Email:   ${user.email}`);
        console.log(`City:    ${user.address.city}`);
        console.log(`Company: ${user.company.name}`);
    } catch (error) {
        console.error("Could not load user:", error.message);
    }
}

// 2. All users
async function displayAllUsers() {
    console.log("\n=== Practice 2: All users ===");
    try {
        const users = await fetchJSON(`${BASE_URL}/users`);
        console.log(`Loaded ${users.length} users:`);
        users.forEach(user => {
            console.log(`- #${user.id}: ${user.name} (${user.email})`);
        });
    } catch (error) {
        console.error("Could not load users:", error.message);
    }
}

// 3. Posts for user 1
async function displayUserPosts() {
    console.log("\n=== Practice 3: Posts for user 1 ===");
    try {
        const posts = await fetchJSON(`${BASE_URL}/users/1/posts`);
        console.log(`User 1 has ${posts.length} posts:`);
        posts.forEach(post => {
            console.log(`- #${post.id}: ${post.title}`);
        });
    } catch (error) {
        console.error("Could not load posts:", error.message);
    }
}

// ---------- Run everything in order ----------

async function main() {
    await exercise1();
    await exercise2();
    await displaySingleUser();
    await displayAllUsers();
    await displayUserPosts();
    console.log("\nAll exercises finished.");
}

main();