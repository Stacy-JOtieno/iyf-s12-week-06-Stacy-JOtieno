function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// Using the function
async function main() {
    console.log("Starting...");

    await delay(2000);

    console.log("This prints after 2 seconds");
}

main();