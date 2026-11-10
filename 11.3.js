
/* EXERCISE 1: PROMISE CHAINING */

// User data
function getUserData(userId) {

    const users = {
        1: { id: 1, name: "Joy", age: 25 },
        2: { id: 2, name: "June", age: 22 },
        3: { id: 3, name: "Stella", age: 30 }
    };

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (users[userId]) {
                resolve(users[userId]);
            } else {
                reject("Invalid user ID");
            }

        }, 1000);

    });
}


// Get user posts
function getUserPosts(userId) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (userId > 0) {
                resolve([
                    { id: 1, title: "Post 1" },
                    { id: 2, title: "Post 2" }
                ]);
            } else {
                reject("Invalid user ID");
            }

        }, 1000);

    });
}


// Get post comments
function getPostComments(postId) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (postId > 0) {
                resolve([
                    { id: 1, text: "Great post!" },
                    { id: 2, text: "Thanks for sharing" }
                ]);
            } else {
                reject("Invalid post ID");
            }

        }, 1000);

    });
}


// EXERCISE 1: PROMISE CHAINING

getUserData(1)
    .then(user => {
        console.log("User:", user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return getPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.error("Error:", error);
    });


// EXERCISE 2: PROMISE.ALL

const promise1 = getUserData(1);
const promise2 = getUserData(2);
const promise3 = getUserData(3);

Promise.all([promise1, promise2, promise3])
    .then(results => {

        console.log("All users:", results);

        results.forEach(user => {
            console.log("User:", user);
        });

    })
    .catch(error => {
        console.error("One failed:", error);
    });


// EXERCISE 3: PROMISE.RACE

const fast = new Promise(resolve =>
    setTimeout(() => resolve("Fast!"), 100)
);

const slow = new Promise(resolve =>
    setTimeout(() => resolve("Slow!"), 500)
);

Promise.race([fast, slow])
    .then(result => {
        console.log("Winner:", result);
    })
    .catch(error => {
        console.error("Race error:", error);
    });
