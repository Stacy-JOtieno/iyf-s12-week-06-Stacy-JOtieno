
// Function 1
function taskOne() {
    const delay = Math.floor(Math.random() * 3000) + 1000;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task One completed!");
        }, delay);
    });
}

// Function 2
function taskTwo() {
    const delay = Math.floor(Math.random() * 3000) + 1000;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task Two completed!");
        }, delay);
    });
}

// Function 3
function taskThree() {
    const delay = Math.floor(Math.random() * 3000) + 1000;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task Three completed!");
        }, delay);
    });
}

// Start measuring time
console.time("Total execution time");

// Chain the three promises
taskOne()
    .then((result) => {
        console.log(result);
        return taskTwo();
    })
    .then((result) => {
        console.log(result);
        return taskThree();
    })
    .then((result) => {
        console.log(result);
        console.timeEnd("Total execution time");
    })
    .catch((error) => {
        console.log("Error:", error);
    });
