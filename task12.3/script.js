
// 1. Select HTML elements

const form = document.getElementById("post-form");

const titleInput = document.getElementById("title");

const bodyInput = document.getElementById("body");

const userIdInput = document.getElementById("userId");

const loading = document.getElementById("loading");

const errorDiv = document.getElementById("error");

const resultContainer = document.getElementById("post-result");

const submitBtn = document.getElementById("submit-btn");


// 2. Create a post using POST request

async function createPost(title, body, userId) {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: title,
                body: body,
                userId: userId
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return response.json();
}


// 3. Display the created post

function displayPost(post) {

    resultContainer.innerHTML = "";

    const card = document.createElement("div");

    card.className = "post-card";

    const heading = document.createElement("h3");

    heading.textContent = post.title;

    const content = document.createElement("p");

    content.textContent = post.body;

    const user = document.createElement("p");

    user.textContent = `User ID: ${post.userId}`;

    const postId = document.createElement("p");

    postId.textContent = `Post ID: ${post.id}`;

    card.append(heading, content, user, postId);

    resultContainer.appendChild(card);
}


// 4. Listen for form submission

form.addEventListener("submit", async function(event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get values from the form
    const title = titleInput.value.trim();

    const body = bodyInput.value.trim();

    const userId = Number(userIdInput.value);

    // Basic validation
    if (!title || !body || !Number.isInteger(userId) || userId < 1) {
        errorDiv.textContent = "Please enter valid post details and a positive user ID.";
        errorDiv.classList.remove("hidden");
        return;
    }

    try {

        // Show loading message
        loading.classList.remove("hidden");

        // Hide previous errors
        errorDiv.classList.add("hidden");

        // Disable button while submitting
        submitBtn.disabled = true;

        // Send data to the API
        const newPost = await createPost(title, body, userId);

        // Display the response
        displayPost(newPost);

        // Clear the form
        form.reset();

    } catch (error) {

        // Display error
        errorDiv.textContent = error.message;

        errorDiv.classList.remove("hidden");

    } finally {

        // Hide loading message
        loading.classList.add("hidden");

        // Enable button again
        submitBtn.disabled = false;

    }

});
