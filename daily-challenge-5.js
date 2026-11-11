const BASE_URL = "https://jsonplaceholder.typicode.com";

const SIMULATE_FAILURE = false;

const endpoints = [
    {
        name: "User",
        url: `${BASE_URL}/users/1`,
        summarize: user => `${user.name} (${user.email})`
    },
    {
        name: "Post",
        url: `${BASE_URL}/posts/1`,
        summarize: post => post.title
    },
    {
        name: "Todo",
        url: SIMULATE_FAILURE ? `${BASE_URL}/todos/9999` : `${BASE_URL}/todos/1`,
        summarize: todo => `${todo.title} (completed: ${todo.completed})`
    }
];

async function fetchJSON(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

async function main() {
    const start = performance.now();
    const elapsed = () => Math.round(performance.now() - start);

    console.log("Starting 3 requests at the same time...\n");

    // Start all requests at once. Each one logs the moment IT finishes.
    const promises = endpoints.map(({ name, url, summarize }) =>
        fetchJSON(url)
            .then(data => {
                console.log(`[OK]     ${name} loaded after ${elapsed()}ms: ${summarize(data)}`);
                return data;
            })
            .catch(error => {
                console.log(`[FAILED] ${name} failed after ${elapsed()}ms: ${error.message}`);
                throw error; // re-throw so allSettled still records it as rejected
            })
    );

    // Wait for every request to finish, whether it succeeded or failed
    const results = await Promise.allSettled(promises);

    console.log("\n--- Final report ---");
    results.forEach((result, index) => {
        const { name } = endpoints[index];

        if (result.status === "fulfilled") {
            console.log(`${name}: fulfilled`);
        } else {
            console.log(`${name}: rejected (${result.reason.message})`);
        }
    });

    const succeeded = results.filter(r => r.status === "fulfilled").length;
    console.log(`\n${succeeded} of ${results.length} requests succeeded in ${elapsed()}ms total.`);
}

main();