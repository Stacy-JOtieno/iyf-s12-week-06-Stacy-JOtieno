function loadUser(userId, callback) {
    setTimeout(() => {
        if (!userId || userId < 1) {
            callback(new Error("Invalid user ID"));
            return;
        }
        callback(null, { id: userId, name: "John Doe" });
    }, 500);
}

function getUserPosts(userId, callback) {
    setTimeout(() => {
        if (!userId || userId < 1) {
            callback(new Error("Cannot fetch posts: invalid user ID"));
            return;
        }
        callback(null, [
            { id: 1, title: "Post 1" },
            { id: 2, title: "Post 2" }
        ]);
    }, 500);
}

function getPostComments(postId, callback) {
    setTimeout(() => {
        if (!postId || postId < 1) {
            callback(new Error("Cannot fetch comments: invalid post ID"));
            return;
        }
        callback(null, [
            { id: 1, text: "Great post!" },
            { id: 2, text: "Thanks for sharing" }
        ]);
    }, 500);
}

// ---------- BEFORE: callback hell ----------

function callbackVersion(userId, done) {
    loadUser(userId, (err, user) => {
        if (err) {
            console.error("Error:", err.message);
            return done();
        }
        console.log("User:", user);

        getUserPosts(user.id, (err, posts) => {
            if (err) {
                console.error("Error:", err.message);
                return done();
            }
            console.log("Posts:", posts);

            getPostComments(posts[0].id, (err, comments) => {
                if (err) {
                    console.error("Error:", err.message);
                    return done();
                }
                console.log("Comments:", comments);
                done();
            });
        });
    });
}

// ---------- BRIDGE: turn error-first callback functions into Promise functions ----------

function promisify(fn) {
    return (...args) =>
        new Promise((resolve, reject) => {
            fn(...args, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
}

const loadUserAsync = promisify(loadUser);
const getUserPostsAsync = promisify(getUserPosts);
const getPostCommentsAsync = promisify(getPostComments);

// ---------- AFTER: async/await ----------

async function asyncVersion(userId) {
    try {
        const user = await loadUserAsync(userId);
        console.log("User:", user);

        const posts = await getUserPostsAsync(user.id);
        console.log("Posts:", posts);

        const comments = await getPostCommentsAsync(posts[0].id);
        console.log("Comments:", comments);
    } catch (error) {
        console.error("Error:", error.message); // one catch for every step
    }
}

// ---------- Run both versions ----------

async function main() {
    console.log("=== BEFORE: callbacks ===");
    await new Promise(resolve => callbackVersion(1, resolve));

    console.log("\n=== AFTER: async/await ===");
    await asyncVersion(1);

    console.log("\n=== AFTER: async/await with an invalid user ===");
    await asyncVersion(-1);
}

main();