
async function fetchUser(userId) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}`
        );

        // Check if the user does not exist
        if (response.status === 404) {
            console.log("User not found. Returning default user.");

            return {
                id: userId,
                name: "Guest User",
                email: "guest@example.com",
                website: "Not available"
            };
        }

        // Handle other HTTP errors
        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        // Convert response into JavaScript object
        const user = await response.json();

        return user;

    } catch (error) {
        console.error("Something went wrong:", error.message);
        throw error;
    }
}

// Test the function
async function main() {
    const user1 = await fetchUser(1);
    console.log("User 1:", user1);

    const user2 = await fetchUser(999);
    console.log("User 2:", user2);
}

main();
